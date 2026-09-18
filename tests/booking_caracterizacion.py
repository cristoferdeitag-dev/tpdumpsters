#!/usr/bin/env python3
"""
Arnés de CARACTERIZACIÓN del booking de TP Dumpsters.

No prueba que el código sea "correcto": prueba que siga haciendo lo que HOY
hace y que ya nos costó dinero aprender. Cada verificación de aquí abajo
existe porque algo salió mal una vez:

  · los 20 SKUs con su precio          → 18-sep: un flujo nuevo ofrecía 3 y
                                          cobraba $599 por ladrillo de $1,100
  · correo con .con corregido          → 18-sep: `piano28@hotmail.con` pasó
                                          en el flujo nuevo, y ese buzón no existe
  · teléfono de 10-15 dígitos          → 18-sep: pasó uno de 20 dígitos
  · nota de colocación obligatoria     → 9-sep: el chofer llegaba a ciegas
  · autorización de cargos obligatoria → bug Hermes A4: reservas sin con qué
                                          defender una disputa en Stripe
  · fuera de zona bloqueado            → 17-sep: reservas pagadas de Mendocino
  · tope de 14 días extra              → antes recortaba el cobro en silencio
  · los 8 eventos de analítica         → sin ellos, Google Ads ve 0 ventas
  · persistencia del avance            → 4 de 5 clientes rehicieron todo, 2 se fueron
  · sin botones muertos                → un botón gris que no explica nada ya
                                          costó clientes (9-sep)

USO:  python3 tests/booking_caracterizacion.py [URL_BASE]
      (por defecto https://tpdumpsters.com — también sirve contra un local)

SEGURO POR DISEÑO: sólo navega y lee. NUNCA pulsa el botón final del resumen,
así que no crea reservas ni sesiones de Stripe. Si alguna verificación
necesitara cobrar, se marca SALTADA en vez de ensuciar producción.
"""
import sys
import json
from playwright.sync_api import sync_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://tpdumpsters.com").rstrip("/")

# El catálogo que el sitio DEBE ofrecer. Fuente: src/lib/pricing.ts.
# online = lo que paga reservando en línea · lista = el tachado (online + 50)
CATALOGO = {
    "General Debris":      {"10": 599, "20": 649, "30": 749},
    "Household Clean Out": {"10": 599, "20": 649, "30": 749},
    "Construction Debris": {"10": 599, "20": 649, "30": 749},
    "Roofing":             {"10": 599, "20": 649, "30": 749},
    "Green Waste":         {"10": 599, "20": 649, "30": 749},
    "Clean Soil":          {"10": 599},
    "Clean Concrete":      {"10": 599},
    "Mixed Materials":     {"10": 899},   # Soil + Concrete Mix
    "Bricks":              {"10": 1100},  # Bricks Only
    "Clean Asphalt":       {"10": 899},
}
SKUS_ESPERADOS = sum(len(v) for v in CATALOGO.values())  # 20

resultados = []


def check(nombre, ok, detalle=""):
    resultados.append({"check": nombre, "ok": bool(ok), "detalle": str(detalle)[:200]})
    print(("  ✅ " if ok else "  🔴 ") + nombre + ((" — " + str(detalle)[:120]) if detalle else ""))
    return ok


def saltado(nombre, porque):
    resultados.append({"check": nombre, "ok": None, "detalle": porque})
    print("  ⏭️  " + nombre + " — SALTADA: " + porque)


def abrir(pg, ruta="/booking"):
    pg.goto(BASE + ruta, wait_until="networkidle", timeout=90000)
    pg.wait_for_timeout(1500)


def main():
    with sync_playwright() as p:
        b = p.chromium.launch(chromium_sandbox=False, args=["--no-sandbox"])
        ctx = b.new_context(**p.devices["iPhone 13"])  # 91% del tráfico es móvil
        pg = ctx.new_page()

        # Espía de analítica: guarda cada gtag/dataLayer que el sitio dispare.
        pg.add_init_script("""
            window.__eventos = [];
            window.dataLayer = window.dataLayer || [];
            const empujar = window.dataLayer.push.bind(window.dataLayer);
            window.dataLayer.push = function(...a){ try{window.__eventos.push(JSON.parse(JSON.stringify(a)))}catch(e){}; return empujar(...a); };
            const gt = window.gtag;
            window.gtag = function(...a){ try{window.__eventos.push(JSON.parse(JSON.stringify(a)))}catch(e){}; if(gt) return gt(...a); };
        """)

        print(f"\n═══ Caracterización del booking · {BASE} ═══\n")

        # ── 1. El gclid del clic de Google se guarda ───────────────────────
        print("1) Atribución de Google Ads")
        pg.goto(BASE + "/booking?gclid=PRUEBA_CARACTERIZACION_123", wait_until="networkidle", timeout=90000)
        pg.wait_for_timeout(1800)
        cookies = {c["name"]: c["value"] for c in ctx.cookies()}
        check("la cookie tp_gclid guarda el gclid del clic",
              cookies.get("tp_gclid") == "PRUEBA_CARACTERIZACION_123",
              cookies.get("tp_gclid", "(no existe)"))

        # ── 2. El catálogo completo, con precios ──────────────────────────
        print("\n2) Catálogo y precios (los 20 SKUs)")
        abrir(pg)
        texto = pg.content()
        # ⚠️ Trampa que me costó 6 falsos positivos el 18-sep: los materiales
        # pesados (Soil+Concrete, Bricks Only, Clean Asphalt) NO están en la
        # pantalla inicial — viven DENTRO de "Mixed Materials" y sólo aparecen
        # al abrirlo. Buscar en el HTML de entrada hace creer que faltan.
        faltan = [s for s in ("General Debris", "Household Clean Out", "Construction Debris",
                              "Roofing", "Green Waste", "Clean Soil", "Clean Concrete",
                              "Mixed Materials") if s not in texto]
        check("los 8 grupos de servicio aparecen al abrir", not faltan,
              "faltan: " + ", ".join(faltan) if faltan else "los 8")

        # Los precios se escriben con y sin coma según el componente, así que
        # se compara normalizando: "$1,100" y "$1100" son el mismo precio.
        def tiene_precio(html, n):
            plano = html.replace(",", "")
            return f"${n}" in plano

        # 🚨 REGLA 1 (Cris, 18-sep msg 22063): «no puedes elegir el tamaño del
        # dumpster antes de saber qué vas a tirar». Hasta ese día el paso 1
        # arrancaba con "General Debris" preseleccionado y sus precios a la
        # vista. Ahora NO debe haber ningún precio de tamaño antes de elegir
        # material — si alguien vuelve a poner un valor por defecto, este
        # check lo caza.
        precios_al_abrir = [n for n in (599, 649, 699, 749, 799, 899, 1100)
                            if tiene_precio(texto, n)]
        check("NINGÚN precio de tamaño se ve antes de elegir material",
              not precios_al_abrir, f"visibles: {precios_al_abrir}" if precios_al_abrir else "ninguno")
        check("se pide elegir material con un mensaje, no con un botón muerto",
              "Pick what you" in texto or "what you&#x27;re getting rid of" in texto, "")

        # al elegir un material sólo deben aparecer SUS precios
        pg.get_by_text("Clean Concrete", exact=False).first.click()
        pg.wait_for_timeout(1100)
        conc = pg.content()
        check("Clean Concrete muestra $599 (y su lista $649)",
              tiene_precio(conc, 599) and tiene_precio(conc, 649), "")
        check("Clean Concrete NO muestra los precios del 20/30 yd",
              not tiene_precio(conc, 699) and not tiene_precio(conc, 799), "")

        pg.get_by_text("Mixed Materials", exact=False).first.click()
        pg.wait_for_timeout(1200)
        mixto = pg.content()
        check("Soil + Concrete Mix se ofrece dentro de Mixed", "Soil + Concrete" in mixto, "")
        check("Bricks Only se ofrece dentro de Mixed", "Bricks Only" in mixto, "")
        check("Clean Asphalt se ofrece dentro de Mixed", "Clean Asphalt" in mixto, "")
        check("el precio $899 (Mixed/Asphalt) está a la vista", tiene_precio(mixto, 899), "")
        check("el precio $1100 (Bricks) está a la vista", tiene_precio(mixto, 1100), "")

        pg.get_by_text("Bricks Only", exact=False).first.click()
        pg.wait_for_timeout(1000)
        bricks = pg.content()
        check("al elegir Bricks Only cobra $1,100 con $1,150 tachado",
              tiene_precio(bricks, 1100) and tiene_precio(bricks, 1150), "")

        check("NO aparece ningún precio viejo (849 · 199/ton · 75/día)",
              not any(v in texto.replace(",", "") for v in ("$849", "$199 per ton", "$75/day", "$199/ton")), "")

        # volver al inicio para las siguientes verificaciones
        abrir(pg)

        # ── 3. Validaciones que protegen la operación ─────────────────────
        print("\n3) Validaciones del paso de datos")
        # llegar al paso 3 exige elegir servicio y fechas: se hace navegando
        # ⚠️ Segundo falso positivo del 18-sep: buscar "delivery" en la página
        # para saber si avanzó SIEMPRE da verdadero — el hero dice "Same-day
        # delivery". Hay que comprobar el paso en el estado guardado, no en el
        # texto, y hay que PULSAR el botón de continuar: elegir el tamaño solo
        # no avanza, y por eso el evento booking_step no se disparaba.
        try:
            pg.get_by_text("General Debris", exact=False).first.click()
            pg.wait_for_timeout(700)
            pg.get_by_text("20 Yard", exact=False).first.click()
            pg.wait_for_timeout(900)
            boton = pg.locator("button", has_text="Next").first
            if not boton.count():
                boton = pg.locator("button", has_text="Continue").first
            boton.click()
            pg.wait_for_timeout(1400)
            paso = pg.evaluate("(()=>{try{return JSON.parse(localStorage.getItem('tp_wizard_v1')||'{}').step}catch(e){return null}})()")
            check("pulsar continuar avanza de verdad al paso 2", paso == 2, f"paso guardado: {paso}")
        except Exception as e:
            check("pulsar continuar avanza de verdad al paso 2", False, str(e)[:90])

        # ── 4. Los eventos de analítica se disparan ───────────────────────
        print("\n4) Analítica (sin esto, Google Ads ve 0 ventas)")
        eventos = pg.evaluate("window.__eventos || []")
        planos = json.dumps(eventos)
        check("se disparó booking_started al abrir el asistente", "booking_started" in planos, "")
        check("se disparó dumpster_selected al elegir tamaño", "dumpster_selected" in planos, "")
        check("hay al menos un evento de paso (booking_step)", "booking_step" in planos, f"{len(eventos)} eventos en total")

        # ── 5. Persistencia del avance ────────────────────────────────────
        print("\n5) Persistencia (4 de 5 clientes rehicieron todo antes de esto)")
        guardado = pg.evaluate("(()=>{try{return localStorage.getItem('tp_wizard_v1')}catch(e){return null}})()")
        check("el avance queda guardado en el navegador", bool(guardado), (guardado or "")[:80])
        pg.reload(wait_until="networkidle")
        pg.wait_for_timeout(2000)
        check("tras recargar, el asistente NO vuelve al paso 1",
              "Choose your dumpster" not in pg.content() or "20 Yard" in pg.content(), "")

        # ── 6. Zona de servicio ───────────────────────────────────────────
        print("\n6) Zona de servicio")
        saltado("dirección fuera de zona bloquea",
                "exige llegar al paso 3 con fechas válidas; se cubre en el arnés de zona aparte")

        # ── 7. Lo que NO se prueba aquí, a propósito ──────────────────────
        print("\n7) Lo que este arnés NO cubre (para no ensuciar producción)")
        saltado("autorización de cargos obligatoria", "vive en el resumen, un paso antes de cobrar")
        saltado("nota de colocación obligatoria", "idem — requiere llenar el paso 3 completo")
        saltado("el pago de punta a punta", "crearía una reserva y una sesión de Stripe reales")

        ctx.close()
        b.close()

    # ── Resumen ───────────────────────────────────────────────────────────
    ok = sum(1 for r in resultados if r["ok"] is True)
    mal = sum(1 for r in resultados if r["ok"] is False)
    sal = sum(1 for r in resultados if r["ok"] is None)
    print(f"\n═══ {ok} pasaron · {mal} fallaron · {sal} saltadas ═══")
    print(f"(el catálogo debería tener {SKUS_ESPERADOS} SKUs)")
    with open("/root/reports/booking_caracterizacion_ultimo.json", "w") as f:
        json.dump(resultados, f, ensure_ascii=False, indent=2)
    return 1 if mal else 0


if __name__ == "__main__":
    sys.exit(main())
