// src/app/page.tsx
"use client";

import Legend from "@/components/Legend/Legend";
import LocationIndicator from "@/components/LocationIndicator/LocationIndicator";
import MapContainer from "@/components/MapContainer/MapContainer";

export default function Home() {
  return (
    <main className="flex-1 w-full relative overflow-hidden">
      <MapContainer />
      <LocationIndicator />
      <Legend />
    </main>
  );
}
