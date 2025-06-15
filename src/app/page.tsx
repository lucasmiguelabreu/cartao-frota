"use client";

import MapContainer from "@/components/MapContainer/MapContainer";
import LocationIndicator from "@/components/LocationIndicator/LocationIndicator";
import Legend from "@/components/Legend/Legend";

export default function Home() {
  return (
    <div className="w-full h-full relative">
      <MapContainer />
      <LocationIndicator />
      {/*<Legend /> // Componente de legenda*/}
    </div>
  );
}
