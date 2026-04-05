"use client";

import dynamic from "next/dynamic";

const DriverApp = dynamic(() => import("./DriverApp"), { ssr: false });

export default function DriverWrapper() {
  return <DriverApp />;
}
