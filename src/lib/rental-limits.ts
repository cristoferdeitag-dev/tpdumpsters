// Límites de la renta que el navegador y el servidor TIENEN que compartir.
//
// 17-sep-2026 (Asaí, Telegram msgs 3316-3318): "no los puedes dejar bookear por
// más de 2 semanas… los extra days me refiero. 2 semanas de extra days es lo
// máximo que se puede".
//
// Antes no había tope en la pantalla: el campo de fecha de recolección sólo
// tenía `min`, así que se podía elegir cualquier día del futuro. El servidor
// sí topaba, pero en 60 días y SIN avisar — recortaba el cobro en silencio, de
// modo que alguien podía reservar 30 días extra y pagar 14.
//
// Vive aquí y lo importan los dos lados a propósito: si el número se duplica,
// tarde o temprano la pantalla ofrece algo que el servidor rechaza.
export const MAX_EXTRA_DAYS = 14;
