"use client";

import { useLoadScript } from "@react-google-maps/api";

export function useGoogleMapsScript() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  return { isLoaded, loadError };
}