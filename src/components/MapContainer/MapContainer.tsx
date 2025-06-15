// src/components/MapContainer/MapContainer.tsx
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

  // Índice da InfoWindow aberta
  const [openInfoWindowIdx, setOpenInfoWindowIdx] = useState<number | null>(
    null
  );
  // Geolocalização do usuário
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(
    null
  );

  // Calcular altura do mapa descontando Navbar
  const isMobileViewport = useMediaQuery("(max-width:1024px)");
  const navbarHeight = isMobileViewport ? 72 : 80;
  const containerStyle = {
    width: "100%",
    height: `calc(100vh - ${navbarHeight}px)`,
  };

  // Pega localização
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
        () => { },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Carrega script Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // Ícone dos postos
  const postoIcon = useMemo(() => {
    if (!isLoaded || !window.google?.maps) return undefined;
    return {
      url: "/icons/posto.png",
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 40),
    };
  }, [isLoaded]);

  // Ícone da localização do usuário
  const userIcon = useMemo(() => {
    if (!isLoaded || !window.google?.maps) return undefined;
    return {
      url: "/icons/my-location.png",
      scaledSize: new window.google.maps.Size(36, 36),
      anchor: new window.google.maps.Point(18, 36),
    };
  }, [isLoaded]);

  // Sincroniza seleção com InfoWindow
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

  // Estados de erro/carregamento
  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <span className="text-red-500 font-medium">Erro ao carregar o mapa</span>
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <span className="text-slate-500 font-medium">Carregando mapa…</span>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <span className="text-slate-500 font-medium">Carregando postos…</span>
      </div>
    );
  }

  // Opções do mapa: removendo todos os controles
  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,       // desabilita zoom, street view, etc.
    zoomControl: false,           // garante que o zoom também está desligado
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    rotateControl: false,
    scaleControl: false,
    clickableIcons: false,
    gestureHandling: "greedy",
    styles: [
      { featureType: "all", elementType: "geometry.fill", stylers: [{ saturation: -5 }, { lightness: 5 }] },
      { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#e3f2fd" }] },
      { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#f8f9fa" }] },
      { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
      { featureType: "landscape.natural", elementType: "geometry.fill", stylers: [{ color: "#f1f8e9" }] },
      { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    ],
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        selectedMarker
          ? { lat: selectedMarker.lat, lng: selectedMarker.lng }
          : userLocation || { lat: -20.813153, lng: -49.393445 }
      }
      zoom={14}
      options={mapOptions}
    >
      {/* Marcador do usuário */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={userIcon}
          zIndex={999}
          title="Sua localização"
        />
      )}

      {/* Marcadores de postos */}
      {markers.map((m, i) => (
        <Marker
          key={i}
          position={{ lat: m.lat, lng: m.lng }}
          icon={m.tipo === "posto" ? postoIcon : undefined}
          onClick={() => setSelectedMarker(m)}
          title={m.nome}
        >
          {openInfoWindowIdx === i && (
            <InfoWindow
              onCloseClick={() => setSelectedMarker(null)}
              options={{
                pixelOffset: new window.google.maps.Size(0, -10),
                maxWidth: 420,
              }}
            >
              <div className="bg-white rounded-lg shadow-lg w-80 overflow-visible">
                <div className="px-4 py-2">
                  <h3 className="text-slate-800 text-base font-semibold">
                    {m.nome}
                  </h3>
                </div>
                <div className="px-4 pb-3 text-sm text-slate-700">
                  <p className="whitespace-normal break-words leading-relaxed mb-3">
                    {m.endereco}
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center text-sm font-medium py-2 rounded"
                  >
                    Ir até o local
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
