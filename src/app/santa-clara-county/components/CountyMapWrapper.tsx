'use client';

import dynamic from 'next/dynamic';

const CountyMap = dynamic(() => import('./CountyMap'), { ssr: false });

export default function CountyMapWrapper() {
  return <CountyMap />;
}
