"use client";

import { useState, useEffect } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number; } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => console.error("Erro ao obter localização:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  return location;
}