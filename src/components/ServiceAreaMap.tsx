'use client';

import { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CityInfo {
  name: string;
  lat: number;
  lng: number;
  slug: string;
  description: string;
  tag: string;
}

const cities: CityInfo[] = [
  // ── Original 4 ──
  { name: 'Oakland', lat: 37.8044, lng: -122.2712, slug: '/oakland',
    description: 'Same-day delivery to all Oakland neighborhoods. Downtown, Fruitvale, Temescal & more.', tag: 'Same-Day' },
  { name: 'Richmond', lat: 37.9358, lng: -122.3478, slug: '/richmond',
    description: 'Our fastest delivery zone. Point Richmond, Hilltop, Marina Bay & West Contra Costa.', tag: 'Fastest Zone' },
  { name: 'Concord', lat: 37.9780, lng: -122.0311, slug: '/concord',
    description: 'Serving all of Central Contra Costa. Downtown, Todos Santos, Clayton & Pleasant Hill.', tag: 'Popular' },
  { name: 'Pinole', lat: 38.0044, lng: -122.2989, slug: '/pinole',
    description: 'Our home base! Old Town, Pinole Valley, Tara Hills. Fastest response time guaranteed.', tag: 'Home Base' },
  // ── Batch 2 ──
  { name: 'Berkeley', lat: 37.8716, lng: -122.2727, slug: '/berkeley',
    description: 'Serving UC Berkeley area, North Berkeley, South Berkeley, Elmwood & all neighborhoods.', tag: '70/mo' },
  { name: 'Hayward', lat: 37.6688, lng: -122.0808, slug: '/hayward',
    description: 'Covering Hayward, Castro Valley, San Lorenzo & southern Alameda County.', tag: '90/mo' },
  { name: 'Fremont', lat: 37.5485, lng: -121.9886, slug: '/fremont',
    description: 'Dumpster delivery to Fremont, Newark, Union City & southern East Bay.', tag: '140/mo' },
  { name: 'Walnut Creek', lat: 37.9101, lng: -122.0652, slug: '/walnut-creek',
    description: 'Premium service for Walnut Creek, Lafayette, Orinda & Lamorinda area.', tag: '90/mo' },
  // ── Batch 3: High volume ──
  { name: 'Alameda', lat: 37.7652, lng: -122.2416, slug: '/alameda',
    description: 'Island city service. Downtown, Bay Farm, Harbor Bay & all Alameda neighborhoods.', tag: '140/mo' },
  { name: 'Antioch', lat: 38.0049, lng: -121.8058, slug: '/antioch',
    description: 'East County leader. Downtown, Deer Valley, Sand Creek, Dallas Ranch & Oakley.', tag: '140/mo' },
  { name: 'San Leandro', lat: 37.7249, lng: -122.1561, slug: '/san-leandro',
    description: 'Central location between Oakland & Hayward. Marina, Estudillo Estates & more.', tag: '70/mo' },
  { name: 'Vallejo', lat: 38.1041, lng: -122.2566, slug: '/vallejo',
    description: 'Waterfront city service. Glen Cove, Mare Island, Hiddenbrooke & Benicia.', tag: '70/mo' },
  { name: 'Livermore', lat: 37.6819, lng: -121.7680, slug: '/livermore',
    description: 'Tri-Valley wine country. Downtown, Springtown, Ruby Hill & South Livermore.', tag: '70/mo' },
  // ── Batch 3: Medium volume ──
  { name: 'Lafayette', lat: 37.8858, lng: -122.1180, slug: '/lafayette',
    description: 'Upscale Lamorinda service. Happy Valley, Burton Valley, Orinda & Moraga.', tag: '70/mo' },
  { name: 'Pleasanton', lat: 37.6604, lng: -121.8758, slug: '/pleasanton',
    description: 'Premium Tri-Valley. Birdland, Vintage Hills, Ruby Hill & Stoneridge.', tag: '50/mo' },
  { name: 'San Ramon', lat: 37.7799, lng: -121.9780, slug: '/san-ramon',
    description: 'Dougherty Valley, Gale Ranch, Canyon Lakes & all San Ramon communities.', tag: '50/mo' },
  { name: 'Dublin', lat: 37.7022, lng: -121.9358, slug: '/dublin',
    description: 'Fastest-growing Tri-Valley city. Dublin Ranch, Fallon, Emerald Glen & more.', tag: '50/mo' },
  { name: 'Brentwood', lat: 37.9317, lng: -121.6961, slug: '/brentwood',
    description: 'East County boom town. Deer Ridge, Summerset, Shadow Lakes & Oakley.', tag: '50/mo' },
  // ── Batch 4 ──
  { name: 'Union City', lat: 37.5934, lng: -122.0439, slug: '/union-city',
    description: 'Serving Union City, Alvarado, Decoto & the southern East Bay corridor.', tag: '50/mo' },
  { name: 'Newark', lat: 37.5316, lng: -122.0402, slug: '/newark',
    description: 'Old Town, NewPark, Lakeshore & all Newark neighborhoods near Fremont.', tag: '50/mo' },
  { name: 'Pleasant Hill', lat: 37.9481, lng: -122.0608, slug: '/pleasant-hill',
    description: 'Central Contra Costa. Gregory Gardens, Poets Corner & Contra Costa Centre.', tag: '40/mo' },
  { name: 'Martinez', lat: 38.0194, lng: -122.1341, slug: '/martinez',
    description: 'County seat. Downtown, Alhambra Valley, waterfront & North Contra Costa.', tag: '40/mo' },
  { name: 'Pittsburg', lat: 38.0280, lng: -121.8847, slug: '/pittsburg',
    description: 'East County growth. Downtown, Old Town, Bay Point & waterfront area.', tag: '40/mo' },
  // ── Batch 5 ──
  { name: 'Castro Valley', lat: 37.6941, lng: -122.0864, slug: '/castro-valley',
    description: 'East Bay hills. Cull Canyon, Five Canyons, Proctor & all Castro Valley.', tag: '40/mo' },
  { name: 'Hercules', lat: 37.9958, lng: -122.2886, slug: '/hercules',
    description: 'West County waterfront. Refugio Valley, Victoria by the Bay & Rodeo.', tag: '40/mo' },
  { name: 'El Cerrito', lat: 37.9161, lng: -122.3106, slug: '/el-cerrito',
    description: 'Hillside community. Mira Vista, Sunset View, Kensington & Albany.', tag: '40/mo' },
  { name: 'Danville', lat: 37.8216, lng: -121.9999, slug: '/danville',
    description: 'Premium Diablo foothills. Blackhawk, Alamo, Sycamore Valley & Tassajara.', tag: '30/mo' },
  { name: 'Benicia', lat: 38.0494, lng: -122.1586, slug: '/benicia',
    description: 'Historic waterfront city. Downtown, Southampton & Carquinez Strait.', tag: '40/mo' },
  // ── Batch 6 ──
  { name: 'Oakley', lat: 37.9974, lng: -121.7125, slug: '/oakley',
    description: 'East County growth. Cypress Grove, Emerson Ranch & Delta waterfront.', tag: '40/mo' },
  { name: 'San Pablo', lat: 37.9622, lng: -122.3456, slug: '/san-pablo',
    description: 'Central West County. Rollingwood, El Portal & West Contra Costa.', tag: '30/mo' },
  { name: 'Orinda', lat: 37.8771, lng: -122.1797, slug: '/orinda',
    description: 'Exclusive Lamorinda. Sleepy Hollow, Country Club & hillside estates.', tag: '30/mo' },
  { name: 'Moraga', lat: 37.8349, lng: -122.1297, slug: '/moraga',
    description: 'Quiet Lamorinda town. Campolindo, Sanders Ranch & Rheem Valley.', tag: '20/mo' },
  { name: 'Bay Point', lat: 38.0288, lng: -121.9614, slug: '/bay-point',
    description: 'Affordable East County. Shore Acres, Bella Vista & Port Chicago.', tag: '20/mo' },
  { name: 'American Canyon', lat: 38.1749, lng: -122.2583, slug: '/american-canyon',
    description: 'Gateway to Napa. Napa Junction, Canyon Estates & Watson Ranch.', tag: '20/mo' },
  { name: 'El Sobrante', lat: 37.9772, lng: -122.2953, slug: '/el-sobrante',
    description: 'Hidden West County gem. Appian Way, Sobrante Ridge & Carriage Hills.', tag: '20/mo' },
  // ── San Francisco ──
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, slug: '/san-francisco',
    description: 'The City by the Bay. SoMa, Mission, Sunset, Richmond & all SF neighborhoods.', tag: 'Major City' },
  // ── Contra Costa extras ──
  { name: 'Clayton', lat: 37.9410, lng: -121.9358, slug: '/clayton',
    description: 'Charming foothill town. Clayton Valley, Oakhurst & Mt. Diablo gateway.', tag: '20/mo' },
  { name: 'Crockett', lat: 38.0527, lng: -122.2264, slug: '/crockett',
    description: 'Historic waterfront town. Carquinez Strait views & small-town charm.', tag: '10/mo' },
  { name: 'Bethel Island', lat: 38.0133, lng: -121.6408, slug: '/bethel-island',
    description: 'Delta island community. Waterfront homes & recreational boating.', tag: '10/mo' },
  { name: 'Discovery Bay', lat: 37.9085, lng: -121.6016, slug: '/discovery-bay',
    description: 'Delta waterfront living. Lakeside homes, marinas & East County.', tag: '10/mo' },
  { name: 'Rodeo', lat: 38.0322, lng: -122.2669, slug: '/rodeo',
    description: 'West County waterfront. Pacific Avenue corridor & Rodeo Hills.', tag: '10/mo' },
  // ── Alameda County extras ──
  { name: 'Emeryville', lat: 37.8313, lng: -122.2852, slug: '/emeryville',
    description: 'Urban hub between Oakland & Berkeley. Mixed-use lofts & Bay Street.', tag: '30/mo' },
  { name: 'Piedmont', lat: 37.8244, lng: -122.2318, slug: '/piedmont',
    description: 'Exclusive enclave within Oakland. Grand homes & tree-lined streets.', tag: '20/mo' },
  { name: 'San Lorenzo', lat: 37.6810, lng: -122.1244, slug: '/san-lorenzo',
    description: 'Central East Bay community between San Leandro & Hayward.', tag: '20/mo' },
  { name: 'Milpitas', lat: 37.4323, lng: -121.8996, slug: '/milpitas',
    description: 'South Bay gateway. Great Mall area, Calaveras Hills & tech corridor.', tag: '30/mo' },
  // ── Solano County extras ──
  { name: 'Fairfield', lat: 38.2494, lng: -122.0400, slug: '/fairfield',
    description: 'Solano County seat. Travis AFB, Anheuser-Busch & Green Valley.', tag: '20/mo' },
  { name: 'Vacaville', lat: 38.3566, lng: -121.9877, slug: '/vacaville',
    description: 'North Solano. Premium Outlets, Nut Tree & Lagoon Valley.', tag: '20/mo' },
  { name: 'Suisun City', lat: 38.2382, lng: -122.0400, slug: '/suisun-city',
    description: 'Historic waterfront. Suisun Harbor, Old Town & train depot.', tag: '10/mo' },
  { name: 'Dixon', lat: 38.4452, lng: -121.8233, slug: '/dixon',
    description: 'Agricultural town. May Fair, downtown & rural Solano County.', tag: '10/mo' },
  // ── Marin County ──
  { name: 'San Rafael', lat: 37.9735, lng: -122.5311, slug: '/san-rafael',
    description: 'Marin County seat. Downtown, Canal District, Terra Linda & Dominican.', tag: '30/mo' },
  { name: 'Novato', lat: 38.1074, lng: -122.5697, slug: '/novato',
    description: 'North Marin. Hamilton Field, Old Town, Indian Valley & Ignacio.', tag: '20/mo' },
  { name: 'Mill Valley', lat: 37.9060, lng: -122.5450, slug: '/mill-valley',
    description: 'Mt. Tam gateway. Downtown, Tamalpais Valley, Homestead & Sycamore Park.', tag: '20/mo' },
  { name: 'Sausalito', lat: 37.8591, lng: -122.4853, slug: '/sausalito',
    description: 'Waterfront artist town. Houseboats, Bridgeway & Fort Baker views.', tag: '10/mo' },
  { name: 'Tiburon', lat: 37.8735, lng: -122.4567, slug: '/tiburon',
    description: 'Upscale peninsula. Downtown, Belvedere Island & Angel Island ferry.', tag: '10/mo' },
  { name: 'Corte Madera', lat: 37.9254, lng: -122.5275, slug: '/corte-madera',
    description: 'Central Marin. Town Center, Christmas Tree Hill & Madera Gardens.', tag: '10/mo' },
  { name: 'Larkspur', lat: 37.9341, lng: -122.5353, slug: '/larkspur',
    description: 'Ferry commuter hub. Larkspur Landing, Old World Village & Bon Air.', tag: '10/mo' },
  { name: 'Fairfax', lat: 37.9871, lng: -122.5889, slug: '/fairfax',
    description: 'Bohemian Marin town. Fairfax Theater, Parkade & Manor Hill.', tag: '10/mo' },
  { name: 'San Anselmo', lat: 37.9746, lng: -122.5614, slug: '/san-anselmo',
    description: 'Antique Row charm. Downtown, Sleepy Hollow & Seminary neighborhoods.', tag: '10/mo' },
  // ── San Mateo County ──
  { name: 'Daly City', lat: 37.6879, lng: -122.4702, slug: '/daly-city',
    description: 'Gateway to the Peninsula. Westlake, Serramonte & Broadmoor Village.', tag: '30/mo' },
  { name: 'South San Francisco', lat: 37.6547, lng: -122.4077, slug: '/south-san-francisco',
    description: 'The Industrial City. Biotech hub, Downtown, Sign Hill & Westborough.', tag: '30/mo' },
  { name: 'San Mateo', lat: 37.5630, lng: -122.3255, slug: '/san-mateo',
    description: 'Heart of the Peninsula. Downtown, Hillsdale, Bay Meadows & Beresford.', tag: '40/mo' },
  { name: 'Redwood City', lat: 37.4852, lng: -122.2364, slug: '/redwood-city',
    description: 'San Mateo County seat. Downtown, Stambaugh-Heller & Emerald Hills.', tag: '30/mo' },
  { name: 'Pacifica', lat: 37.6138, lng: -122.4869, slug: '/pacifica',
    description: 'Coastal town. Linda Mar, Rockaway Beach, Pedro Point & Sharp Park.', tag: '20/mo' },
  { name: 'San Bruno', lat: 37.6305, lng: -122.4111, slug: '/san-bruno',
    description: 'Near SFO airport. San Bruno Mountain, Crestmoor & Bayhill.', tag: '20/mo' },
  { name: 'Burlingame', lat: 37.5785, lng: -122.3442, slug: '/burlingame',
    description: 'Charming downtown. Broadway Avenue, Burlingame Hills & Easton Addition.', tag: '20/mo' },
  { name: 'Menlo Park', lat: 37.4530, lng: -122.1817, slug: '/menlo-park',
    description: 'Tech capital. Downtown, Belle Haven, Sharon Heights & Stanford Park.', tag: '20/mo' },
  { name: 'Foster City', lat: 37.5585, lng: -122.2711, slug: '/foster-city',
    description: 'Planned lagoon city. Foster City Lagoon, Marlin Park & Metro Center.', tag: '20/mo' },
  { name: 'Belmont', lat: 37.5202, lng: -122.2758, slug: '/belmont',
    description: 'Hillside Peninsula town. Carlmont Village, Harbor Industrial & Homeview.', tag: '10/mo' },
  { name: 'San Carlos', lat: 37.5072, lng: -122.2603, slug: '/san-carlos',
    description: 'The City of Good Living. Laureola Park, White Oaks & Devonshire.', tag: '10/mo' },
  { name: 'Half Moon Bay', lat: 37.4636, lng: -122.4286, slug: '/half-moon-bay',
    description: 'Coastal gem. Miramar Beach, Pumpkin Festival & Pillar Point Harbor.', tag: '10/mo' },
  { name: 'Millbrae', lat: 37.5985, lng: -122.3872, slug: '/millbrae',
    description: 'BART/Caltrain hub. Meadows, Mills Estate & Green Hills Country Club.', tag: '10/mo' },
  // ── Santa Clara County ──
  { name: 'San Jose', lat: 37.3382, lng: -121.8863, slug: '/san-jose',
    description: 'Capital of Silicon Valley. Downtown, Willow Glen, Almaden & Evergreen.', tag: 'Major City' },
  { name: 'Santa Clara', lat: 37.3541, lng: -121.9552, slug: '/santa-clara',
    description: 'Home of Levi\'s Stadium. Mission, El Camino & Great America.', tag: '30/mo' },
  { name: 'Sunnyvale', lat: 37.3688, lng: -122.0363, slug: '/sunnyvale',
    description: 'South Bay tech hub. Downtown, Lakewood & Raynor Park.', tag: '30/mo' },
  { name: 'Mountain View', lat: 37.3861, lng: -122.0839, slug: '/mountain-view',
    description: 'Home of Google. Castro Street, Cuesta Park & Old Mountain View.', tag: '30/mo' },
  { name: 'Palo Alto', lat: 37.4419, lng: -122.1430, slug: '/palo-alto',
    description: 'Stanford University town. Downtown, University Avenue & Professorville.', tag: '30/mo' },
  { name: 'Cupertino', lat: 37.3230, lng: -122.0322, slug: '/cupertino',
    description: 'Home of Apple. De Anza, Rancho Rinconada & Monta Vista.', tag: '20/mo' },
  { name: 'Campbell', lat: 37.2872, lng: -121.9500, slug: '/campbell',
    description: 'Downtown charm. Pruneyard, Hacienda & West Campbell Avenue.', tag: '20/mo' },
  { name: 'Los Gatos', lat: 37.2358, lng: -121.9624, slug: '/los-gatos',
    description: 'Luxury foothills. Downtown, Blossom Hill & Monte Sereno.', tag: '20/mo' },
  { name: 'Saratoga', lat: 37.2638, lng: -122.0230, slug: '/saratoga',
    description: 'Upscale village. Big Basin Way, Hakone Gardens & Congress Springs.', tag: '10/mo' },
  { name: 'Morgan Hill', lat: 37.1305, lng: -121.6544, slug: '/morgan-hill',
    description: 'South Valley wine country. Downtown, Madrone & El Toro.', tag: '10/mo' },
  { name: 'Gilroy', lat: 37.0058, lng: -121.5683, slug: '/gilroy',
    description: 'Garlic Capital. Downtown, Hecker Pass & Glen Loma Ranch.', tag: '10/mo' },
];

const activeCities = cities.filter((c) => c.slug !== '#');

export default function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);

  useEffect(() => {
    if ((window as any).google?.maps) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&callback=initDumpsterMap`;
    script.async = true;
    script.defer = true;

    (window as any).initDumpsterMap = () => {
      setMapLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      delete (window as any).initDumpsterMap;
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !(window as any).google?.maps) return;

    const map = new (window as any).google.maps.Map(mapRef.current, {
      center: { lat: 37.75, lng: -122.10 },
      zoom: 9,
      styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        { featureType: 'water', stylers: [{ color: '#c9e7f5' }] },
        { featureType: 'landscape', stylers: [{ color: '#f0f4e8' }] },
        { featureType: 'road.highway', stylers: [{ color: '#fcd4a4' }] },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    cities.forEach((city) => {
      const isActive = city.slug !== '#';
      const marker = new (window as any).google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map,
        title: city.name,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: isActive ? '#E02B20' : '#999999',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
        },
      });

      const linkHtml = isActive
        ? `<a href="${city.slug}" style="display:inline-block;margin-top:8px;background:#E02B20;color:white;padding:6px 16px;border-radius:6px;font-size:13px;font-weight:bold;text-decoration:none;">View ${city.name} Page →</a>`
        : `<span style="display:inline-block;margin-top:8px;background:#eee;color:#888;padding:4px 12px;border-radius:6px;font-size:12px;">Page coming soon</span>`;

      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div style="padding:10px;max-width:240px;font-family:sans-serif;">
            <h3 style="margin:0 0 4px 0;font-size:16px;color:#1a1a1a;">${city.name}</h3>
            <span style="display:inline-block;background:${isActive ? '#E02B20' : '#ccc'};color:white;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;margin-bottom:6px;">${city.tag}</span>
            <p style="margin:6px 0;font-size:13px;color:#555;line-height:1.4;">${city.description}</p>
            ${linkHtml}
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        setSelectedCity(city);
      });
    });
  }, [mapLoaded]);

  return (
    <section id="service-area" className="py-20" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          SERVICE AREA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-10 text-center">
          Dumpster Delivery Across the Bay Area
        </h2>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Map Header */}
          <div className="bg-gradient-to-r from-tp-red to-[#c0221b] text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl md:text-2xl font-bold mb-1 font-[var(--font-poppins)]">
                Click a City for Local Info
              </h3>
              <p className="opacity-90 text-sm">
                Red markers have dedicated pages — click to visit
              </p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/30">
              <div className="flex gap-8 text-white justify-center">
                <div className="text-center">
                  <span className="block text-2xl font-bold">{activeCities.length}</span>
                  <span className="text-sm">Active Pages</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold">{cities.length}</span>
                  <span className="text-sm">Cities Served</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="relative">
            <div ref={mapRef} className="h-[350px] md:h-[500px] w-full" />
            {!mapLoaded && (
              <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-4 text-gray-500">
                <FaMapMarkerAlt className="text-tp-red text-5xl animate-pulse" />
                <p className="text-base font-semibold text-gray-800">Loading map...</p>
              </div>
            )}
          </div>

          {/* City Pills */}
          <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {cities.map((city) => {
                const isActive = city.slug !== '#';
                const pill = (
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                      selectedCity?.name === city.name
                        ? 'bg-tp-red text-white'
                        : isActive
                        ? 'bg-white text-gray-800 border border-gray-200 hover:border-tp-red hover:text-tp-red'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    <FaMapMarkerAlt className="text-xs" /> {city.name}
                    {!isActive && <span className="text-[10px] ml-1 opacity-60">soon</span>}
                  </span>
                );

                return isActive ? (
                  <Link key={city.name} href={city.slug}>
                    {pill}
                  </Link>
                ) : (
                  <span key={city.name}>{pill}</span>
                );
              })}
            </div>
            <p className="text-center text-gray-500 text-sm font-[var(--font-poppins)]">
              Serving the entire Bay Area with fast, reliable dumpster rental service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
