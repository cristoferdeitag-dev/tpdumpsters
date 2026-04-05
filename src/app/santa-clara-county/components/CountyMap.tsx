'use client';

import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CityMarker {
  name: string;
  slug: string;
  lat: number;
  lng: number;
}

const SANTA_CLARA_CITIES: CityMarker[] = [
  { name: "San Jose", slug: "san-jose", lat: 37.3382, lng: -121.8863 },
  { name: "Sunnyvale", slug: "sunnyvale", lat: 37.3688, lng: -122.0363 },
  { name: "Santa Clara", slug: "santa-clara", lat: 37.3541, lng: -121.9552 },
  { name: "Mountain View", slug: "mountain-view", lat: 37.3861, lng: -122.0839 },
  { name: "Milpitas", slug: "milpitas", lat: 37.4323, lng: -121.8996 },
  { name: "Palo Alto", slug: "palo-alto", lat: 37.4419, lng: -122.1430 },
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
      center: { lat: 37.38, lng: -121.98 },
      zoom: 11,
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

    SANTA_CLARA_CITIES.forEach((city) => {
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
