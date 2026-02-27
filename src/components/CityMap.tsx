import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CITY_CENTER: [number, number] = [12.9716, 77.5946]; // Bangalore

const floodZones: { coords: [number, number][]; label: string; severity: "high" | "medium" }[] = [
  {
    coords: [
      [12.980, 77.570], [12.985, 77.585], [12.975, 77.590], [12.968, 77.578],
    ],
    label: "Zone A-3 — Riverside",
    severity: "high",
  },
  {
    coords: [
      [12.955, 77.610], [12.962, 77.625], [12.950, 77.630], [12.945, 77.618],
    ],
    label: "Zone E-2 — Harbor",
    severity: "high",
  },
  {
    coords: [
      [12.990, 77.600], [12.998, 77.612], [12.992, 77.620], [12.985, 77.608],
    ],
    label: "Zone B-7 — Industrial",
    severity: "medium",
  },
];

const shelters: { pos: [number, number]; name: string; capacity: number; occupied: number; status: string }[] = [
  { pos: [12.978, 77.595], name: "Central Stadium", capacity: 15000, occupied: 12400, status: "Open" },
  { pos: [12.965, 77.605], name: "Convention Center", capacity: 8000, occupied: 7800, status: "Open" },
  { pos: [12.993, 77.580], name: "North School Complex", capacity: 3000, occupied: 2950, status: "Full" },
  { pos: [12.950, 77.590], name: "Tech Park Hall", capacity: 5000, occupied: 1200, status: "Open" },
  { pos: [12.960, 77.575], name: "South Community Center", capacity: 2000, occupied: 800, status: "Open" },
  { pos: [12.985, 77.620], name: "Airport Terminal B", capacity: 10000, occupied: 0, status: "Closed" },
];

const evacuationRoutes: { path: [number, number][]; label: string }[] = [
  {
    path: [[12.980, 77.572], [12.978, 77.580], [12.978, 77.590], [12.978, 77.595]],
    label: "Route A → Central Stadium",
  },
  {
    path: [[12.956, 77.615], [12.960, 77.610], [12.963, 77.607], [12.965, 77.605]],
    label: "Route E → Convention Center",
  },
  {
    path: [[12.992, 77.605], [12.990, 77.598], [12.988, 77.592], [12.985, 77.585], [12.978, 77.595]],
    label: "Route B → Central Stadium",
  },
  {
    path: [[12.968, 77.578], [12.963, 77.580], [12.958, 77.583], [12.955, 77.588], [12.950, 77.590]],
    label: "Route D → Tech Park Hall",
  },
];

function createShelterIcon(status: string) {
  const color = status === "Open" ? "#2dd4a0" : status === "Full" ? "#f5a623" : "#e54545";
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 28px; height: 28px; border-radius: 50%; 
      background: ${color}; border: 3px solid hsl(220, 25%, 6%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 12px ${color}88;
      font-size: 13px; color: hsl(220, 25%, 6%); font-weight: 700;
    ">⛺</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function CityMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: CITY_CENTER,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    // Dark tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Flood zone polygons
    floodZones.forEach((zone) => {
      const color = zone.severity === "high" ? "hsl(0, 75%, 55%)" : "hsl(40, 95%, 55%)";
      const polygon = L.polygon(zone.coords, {
        color,
        fillColor: color,
        fillOpacity: 0.25,
        weight: 2,
        dashArray: zone.severity === "high" ? undefined : "6 4",
      }).addTo(map);

      polygon.bindPopup(
        `<div style="font-family: 'Rajdhani', sans-serif; color: #333;">
          <strong style="font-size: 14px;">${zone.label}</strong><br/>
          <span style="color: ${zone.severity === "high" ? "#e54545" : "#f5a623"}; font-weight: 600;">
            ${zone.severity === "high" ? "⚠ High Flood Risk" : "⚡ Medium Flood Risk"}
          </span><br/>
          <span style="font-size: 12px; color: #666;">Source: Sentinel-1 SAR</span>
        </div>`
      );
    });

    // Evacuation routes
    evacuationRoutes.forEach((route) => {
      const polyline = L.polyline(route.path, {
        color: "hsl(185, 80%, 50%)",
        weight: 3,
        opacity: 0.8,
        dashArray: "8 6",
      }).addTo(map);

      polyline.bindPopup(
        `<div style="font-family: 'Rajdhani', sans-serif; color: #333;">
          <strong style="font-size: 13px;">🚶 ${route.label}</strong><br/>
          <span style="font-size: 12px; color: #0ea5e9;">Active Evacuation Route</span>
        </div>`
      );
    });

    // Shelter markers
    shelters.forEach((shelter) => {
      const pct = Math.round((shelter.occupied / shelter.capacity) * 100);
      const marker = L.marker(shelter.pos, { icon: createShelterIcon(shelter.status) }).addTo(map);

      marker.bindPopup(
        `<div style="font-family: 'Rajdhani', sans-serif; min-width: 180px; color: #333;">
          <strong style="font-size: 15px;">${shelter.name}</strong><br/>
          <div style="margin: 6px 0;">
            <span style="font-size: 12px; color: #666;">Occupancy:</span>
            <div style="background: #e5e7eb; border-radius: 4px; height: 8px; margin-top: 3px; overflow: hidden;">
              <div style="background: ${pct > 90 ? "#e54545" : pct > 70 ? "#f5a623" : "#2dd4a0"}; height: 100%; width: ${pct}%; border-radius: 4px;"></div>
            </div>
            <span style="font-size: 12px; font-weight: 600;">${shelter.occupied.toLocaleString()} / ${shelter.capacity.toLocaleString()} (${pct}%)</span>
          </div>
          <span style="font-size: 12px; font-weight: 600; color: ${shelter.status === "Open" ? "#2dd4a0" : shelter.status === "Full" ? "#f5a623" : "#e54545"};">
            Status: ${shelter.status}
          </span>
        </div>`
      );
    });

    // Attribution
    L.control.attribution({ position: "bottomleft", prefix: "Leaflet | CartoDB" }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ height: 400 }}>
      <div ref={mapRef} className="w-full h-full" />
      {/* Legend */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-card/90 backdrop-blur border border-border rounded-md px-3 py-2 space-y-1.5">
        <p className="text-xs font-heading font-semibold text-foreground">Legend</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-sm bg-destructive/60" />
          High Flood Risk
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-sm bg-accent/60" />
          Medium Flood Risk
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-0.5 bg-primary" />
          Evacuation Route
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-full bg-success" />
          Shelter (Open)
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-full bg-accent" />
          Shelter (Full)
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-full bg-destructive" />
          Shelter (Closed)
        </div>
      </div>
    </div>
  );
}
