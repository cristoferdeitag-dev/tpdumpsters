'use client';

import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CityMarker {
  name: string;
  slug: string;
  lat: number;
  lng: number;
}

const MARIN_CITIES: CityMarker[] = [
  { name: "San Rafael", slug: "san-rafael", lat: 37.9735, lng: -122.5311 },
  { name: "Novato", slug: "novato", lat: 38.1074, lng: -122.5697 },
  { name: "Mill Valley", slug: "mill-valley", lat: 37.9060, lng: -122.5450 },
  { name: "Sausalito", slug: "sausalito", lat: 37.8591, lng: -122.4853 },
  { name: "Tiburon", slug: "tiburon", lat: 37.8735, lng: -122.4567 },
  { name: "Corte Madera", slug: "corte-madera", lat: 37.9257, lng: -122.5272 },
  { name: "Larkspur", slug: "larkspur", lat: 37.9341, lng: -122.5353 },
  { name: "San Anselmo", slug: "san-anselmo", lat: 37.9746, lng: -122.5617 },
  { name: "Fairfax", slug: "fairfax", lat: 37.9871, lng: -122.5889 },
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
      center: { lat: 37.95, lng: -122.53 },
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

    MARIN_CITIES.forEach((city) => {
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
