"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMediaQuery } from "usehooks-ts";
import { useEstabelecimentos } from "@/context/EstabelecimentosContext";

export default function MapContainer() {
  const { markers, selectedMarker, setSelectedMarker, loading } =
    useEstabelecimentos();
  const [openInfoWindowIdx, setOpenInfoWindowIdx] = useState<number | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(
    null
  );

  // Ajusta altura descontando a navbar
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const navbarHeight = isMobile ? 72 : 80;
  const containerStyle = {
    width: "100%",
    height: `calc(100vh - ${navbarHeight}px)`,
  };

  // Geolocalização
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => undefined,
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Carrega Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // Ícone posto
  const postoIcon = useMemo(() => {
    if (
      typeof window === "undefined" ||
      !isLoaded ||
      !window.google?.maps
    ) {
      return undefined;
    }
    return {
      url: "/icons/posto.png",
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 40),
    };
  }, [isLoaded]);

  // Ícone usuário
  const userIcon = useMemo(() => {
    if (
      typeof window === "undefined" ||
      !isLoaded ||
      !window.google?.maps
    ) {
      return undefined;
    }
    return {
      url: "/icons/my-location.png",
      scaledSize: new window.google.maps.Size(36, 36),
      anchor: new window.google.maps.Point(18, 36),
    };
  }, [isLoaded]);

  // Sincroniza InfoWindow
  useEffect(() => {
    if (!selectedMarker) {
      setOpenInfoWindowIdx(null);
      return;
    }
    const idx = markers.findIndex(
      (m) =>
        m.lat === selectedMarker.lat &&
        m.lng === selectedMarker.lng &&
        m.nome === selectedMarker.nome
    );
    setOpenInfoWindowIdx(idx >= 0 ? idx : null);
  }, [selectedMarker, markers]);

  // Estados de carregamento / erro
  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-red-500">Erro ao carregar o mapa</span>
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-slate-500">Carregando mapa…</span>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-slate-500">Carregando postos…</span>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        selectedMarker
          ? { lat: selectedMarker.lat, lng: selectedMarker.lng }
          : userLocation || { lat: -20.813153, lng: -49.393445 }
      }
      zoom={14}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        scaleControl: true,
        clickableIcons: false,
        gestureHandling: "greedy",
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ saturation: -5 }, { lightness: 5 }],
          },
          { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#e3f2fd" }] },
          { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#f8f9fa" }] },
          { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
          { featureType: "landscape.natural", elementType: "geometry.fill", stylers: [{ color: "#f1f8e9" }] },
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        ],
      }}
    >
      {/* Marcador usuário */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={userIcon}
          zIndex={999}
          title="Sua localização"
        />
      )}

      {/* Marcadores postos */}
      {markers.map((m, i) => (
        <Marker
          key={i}
          position={{ lat: m.lat, lng: m.lng }}
          icon={m.tipo === "posto" ? postoIcon : undefined}
          onClick={() => {
            setSelectedMarker(m);
            setOpenInfoWindowIdx(i);
          }}
          zIndex={i === openInfoWindowIdx ? 1000 : 1}
          title={m.nome}
        >
          {i === openInfoWindowIdx && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedMarker(null);
                setOpenInfoWindowIdx(null);
              }}
              options={{ pixelOffset: new window.google.maps.Size(0, -10) }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white">
                  <h3 className="font-bold text-lg">{m.nome}</h3>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-slate-700">{m.endereco}</p>
                  {/* Botão "Ir ATÉ O LOCAL" */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-center px-4 py-2 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition"
                  >
                    Ir ATÉ O LOCAL
                  </a>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}
