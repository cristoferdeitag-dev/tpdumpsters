'use client';

import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CityMarker {
  name: string;
  slug: string;
  lat: number;
  lng: number;
}

const CONTRA_COSTA_CITIES: CityMarker[] = [
  { name: "Concord", slug: "concord", lat: 37.9779, lng: -122.0311 },
  { name: "Walnut Creek", slug: "walnut-creek", lat: 37.9101, lng: -122.0652 },
  { name: "Richmond", slug: "richmond", lat: 37.9358, lng: -122.3477 },
  { name: "Antioch", slug: "antioch", lat: 38.0049, lng: -121.8058 },
  { name: "Pittsburg", slug: "pittsburg", lat: 38.0280, lng: -121.8847 },
  { name: "Brentwood", slug: "brentwood", lat: 37.9317, lng: -121.6958 },
  { name: "San Ramon", slug: "san-ramon", lat: 37.7799, lng: -121.9780 },
  { name: "Danville", slug: "danville", lat: 37.8216, lng: -121.9999 },
  { name: "Martinez", slug: "martinez", lat: 38.0194, lng: -122.1341 },
  { name: "Pleasant Hill", slug: "pleasant-hill", lat: 37.9481, lng: -122.0758 },
  { name: "Pinole", slug: "pinole", lat: 37.9929, lng: -122.2994 },
  { name: "Hercules", slug: "hercules", lat: 38.0172, lng: -122.2886 },
  { name: "Lafayette", slug: "lafayette", lat: 37.8858, lng: -122.1180 },
  { name: "El Cerrito", slug: "el-cerrito", lat: 37.9161, lng: -122.3103 },
  { name: "Oakley", slug: "oakley", lat: 37.9974, lng: -121.7125 },
  { name: "Orinda", slug: "orinda", lat: 37.8771, lng: -122.1797 },
  { name: "Moraga", slug: "moraga", lat: 37.8349, lng: -122.1297 },
  { name: "San Pablo", slug: "san-pablo", lat: 37.9622, lng: -122.3456 },
  { name: "El Sobrante", slug: "el-sobrante", lat: 37.9771, lng: -122.2953 },
  { name: "Bay Point", slug: "bay-point", lat: 38.0288, lng: -121.9614 },
  { name: "Clayton", slug: "clayton", lat: 37.9410, lng: -121.9358 },
  { name: "Rodeo", slug: "rodeo", lat: 38.0332, lng: -122.2669 },
  { name: "Crockett", slug: "crockett", lat: 38.0524, lng: -122.2136 },
  { name: "Discovery Bay", slug: "discovery-bay", lat: 37.9085, lng: -121.6022 },
  { name: "Bethel Island", slug: "bethel-island", lat: 38.0135, lng: -121.6411 },
  { name: "Castro Valley", slug: "castro-valley", lat: 37.6941, lng: -122.0864 },
];

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';

export default function CountyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if ((window as any).google?.maps) {
      setMapLoaded(true);
      return;
    }

    const existing = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existing) {
      existing.addEventListener('load', () => setMapLoaded(true));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const google = (window as any).google;
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 37.95, lng: -122.0 },
      zoom: 10,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#1d2329' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1d2329' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#8a9199' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2c3440' }] },
        { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1d2329' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1a2b' }] },
        { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4a6a8a' }] },
        { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1d2329' }] },
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    let activeInfoWindow: any = null;

    CONTRA_COSTA_CITIES.forEach((city) => {
      const marker = new google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map,
        title: city.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#E02B20',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: 'Poppins', sans-serif; padding: 8px 4px; min-width: 160px;">
            <h3 style="margin: 0 0 6px; font-size: 15px; font-weight: 700; color: #1a1a1a;">${city.name}</h3>
            <a href="/${city.slug}" style="color: #E02B20; font-weight: 600; font-size: 13px; text-decoration: none;">
              View ${city.name} Page →
            </a>
          </div>
        `,
      });

      marker.addListener('click', () => {
        if (activeInfoWindow) activeInfoWindow.close();
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;
      });
    });
  }, [mapLoaded]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
}
