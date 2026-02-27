import { useState } from "react";
import { motion } from "framer-motion";
import ZoneCard from "@/components/ZoneCard";
import ShelterCard from "@/components/ShelterCard";
import ShelterModal from "@/components/ShelterModal";
import EventLog from "@/components/EventLog";
import DataSourceOverlay from "@/components/DataSourceOverlay";
import type { ZoneStatus } from "@/components/ZoneCard";

interface Shelter {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  status: "Open" | "Full" | "Closed";
}

const initialZones = [
  { name: "Zone A-3 — Riverside", status: "Active" as ZoneStatus, population: 45200, clearanceEta: "47 min", bottleneck: "Bridge capacity limited" },
  { name: "Zone B-7 — Industrial", status: "Alert" as ZoneStatus, population: 12800, clearanceEta: "23 min" },
  { name: "Zone C-1 — Downtown", status: "Active" as ZoneStatus, population: 89400, clearanceEta: "1h 12min", bottleneck: "NH-48 blocked" },
  { name: "Zone D-4 — Suburbs", status: "Normal" as ZoneStatus, population: 3200, clearanceEta: "8 min" },
  { name: "Zone E-2 — Harbor", status: "Alert" as ZoneStatus, population: 28600, clearanceEta: "35 min", bottleneck: "Coastal road flooding" },
  { name: "Zone F-9 — University", status: "Normal" as ZoneStatus, population: 1500, clearanceEta: "5 min" },
];

const initialShelters: Shelter[] = [
  { id: "s1", name: "Central Stadium", capacity: 15000, occupied: 12400, status: "Open" },
  { id: "s2", name: "Convention Center", capacity: 8000, occupied: 7800, status: "Open" },
  { id: "s3", name: "North School Complex", capacity: 3000, occupied: 2950, status: "Full" },
  { id: "s4", name: "Tech Park Hall", capacity: 5000, occupied: 1200, status: "Open" },
  { id: "s5", name: "South Community Center", capacity: 2000, occupied: 800, status: "Open" },
  { id: "s6", name: "Airport Terminal B", capacity: 10000, occupied: 0, status: "Closed" },
];

export default function Dashboard() {
  const [shelters, setShelters] = useState(initialShelters);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

  const handleShelterSave = (data: { occupied: number; status: "Open" | "Full" | "Closed" }) => {
    if (!selectedShelter) return;
    setShelters(prev =>
      prev.map(s => (s.id === selectedShelter.id ? { ...s, ...data } : s))
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6 scramble-grid min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-wide">Command Dashboard</h1>
          <p className="text-sm text-muted-foreground font-mono">Real-time evacuation operations</p>
        </div>
        <DataSourceOverlay />
      </div>

      {/* Zones */}
      <section>
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Active Zones
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {initialZones.map(zone => (
            <ZoneCard key={zone.name} {...zone} />
          ))}
        </div>
      </section>

      {/* Shelters + Events */}
      <div className="grid lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2">
          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Shelters
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {shelters.map(shelter => (
              <ShelterCard
                key={shelter.id}
                {...shelter}
                onClick={() => setSelectedShelter(shelter)}
              />
            ))}
          </div>
        </section>

        <section className="lg:col-span-1">
          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Events
          </h2>
          <EventLog />
        </section>
      </div>

      {/* City Map Placeholder */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="data-panel border border-border relative overflow-hidden"
        style={{ minHeight: 300 }}
      >
        <div className="absolute top-3 left-3 z-10">
          <DataSourceOverlay latency="87ms" lastUpdate="14:33:12 UTC" />
        </div>
        <div className="flex items-center justify-center h-72 text-muted-foreground">
          <div className="text-center">
            <div className="font-heading text-lg mb-1">Live City Map</div>
            <p className="text-xs font-mono text-muted-foreground">
              OpenStreetMap + Flood Overlay + Route Visualization
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Connect Lovable Cloud to enable real map integration
            </p>
          </div>
        </div>
      </motion.section>

      {/* Shelter Modal */}
      {selectedShelter && (
        <ShelterModal
          open={!!selectedShelter}
          onOpenChange={open => !open && setSelectedShelter(null)}
          shelter={selectedShelter}
          onSave={handleShelterSave}
        />
      )}
    </div>
  );
}
