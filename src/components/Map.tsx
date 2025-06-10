"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 200px)",
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  scaleControl: true,
  clickableIcons: false,
  gestureHandling: "greedy",
  compass: false,
};

type MarkerType = {
  lat: number;
  lng: number;
  nome?: string;
  [key: string]: any;
};

type Props = {
  markers: MarkerType[];
  userLocation: { lat: number; lng: number; } | null;
};

export default function Map({ markers, userLocation }: Props) {
  const center = userLocation || { lat: -20.813153, lng: -49.393445 };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
      >
        {userLocation && <Marker position={userLocation} label="Você" />}
        {markers.map((m, i) => (
          <Marker key={i} position={{ lat: m.lat, lng: m.lng }} label={m.nome || undefined} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}