import { motion } from "framer-motion";
import { Satellite, CloudRain, Waves, ThermometerSun, AlertTriangle, Activity } from "lucide-react";
import DataSourceOverlay from "@/components/DataSourceOverlay";

const hazardData = [
  {
    id: 1,
    type: "Flood",
    icon: Waves,
    severity: "Critical",
    location: "Riverside District — Zone A-3",
    detected: "14:12:00 UTC",
    details: "SAR backscatter anomaly detected. Water depth estimated 1.2m. Rising at 8cm/hr.",
    affected: 45200,
  },
  {
    id: 2,
    type: "Flash Flood",
    icon: CloudRain,
    severity: "High",
    location: "Harbor Area — Zone E-2",
    detected: "14:18:30 UTC",
    details: "Rapid water accumulation from storm surge. Coastal roads submerged.",
    affected: 28600,
  },
  {
    id: 3,
    type: "Structural Risk",
    icon: AlertTriangle,
    severity: "Medium",
    location: "Industrial Corridor — Zone B-7",
    detected: "14:22:15 UTC",
    details: "Waterlogging causing soil instability near warehouse district. Monitoring active.",
    affected: 12800,
  },
];

const severityConfig: Record<string, { color: string; bg: string }> = {
  Critical: { color: "text-destructive", bg: "bg-destructive/10" },
  High: { color: "text-accent", bg: "bg-accent/10" },
  Medium: { color: "text-primary", bg: "bg-primary/10" },
  Low: { color: "text-success", bg: "bg-success/10" },
};

const satPasses = [
  { satellite: "Sentinel-1A", orbit: "Ascending", time: "14:08 UTC", status: "Complete", coverage: "Full swath" },
  { satellite: "Sentinel-1B", orbit: "Descending", time: "15:42 UTC", status: "Scheduled", coverage: "Partial" },
  { satellite: "Sentinel-1A", orbit: "Ascending", time: "17:15 UTC", status: "Scheduled", coverage: "Full swath" },
];

export default function Hazards() {
  return (
    <div className="p-4 md:p-6 space-y-6 scramble-grid min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-wide">Hazard Detection</h1>
          <p className="text-sm text-muted-foreground font-mono">SAR-based real-time hazard monitoring</p>
        </div>
        <DataSourceOverlay source="SAR Satellite: Sentinel-1" latency="142ms" />
      </div>

      {/* Satellite Passes */}
      <section>
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Satellite Passes
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          {satPasses.map((pass, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="data-panel border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <Satellite className="h-4 w-4 text-primary" />
                <span className="font-heading font-semibold">{pass.satellite}</span>
              </div>
              <div className="space-y-1 text-xs font-mono text-muted-foreground">
                <div>Orbit: {pass.orbit}</div>
                <div>Time: {pass.time}</div>
                <div>Coverage: {pass.coverage}</div>
                <div className="flex items-center gap-1">
                  Status:{" "}
                  <span className={pass.status === "Complete" ? "text-success" : "text-accent"}>
                    {pass.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detection Pipeline */}
      <section>
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Detection Pipeline
        </h2>
        <div className="data-panel border border-border">
          <div className="flex items-center gap-4 flex-wrap text-xs font-mono">
            {[
              { label: "SAR Ingest", time: "0.8s", status: "done" },
              { label: "Preprocessing", time: "1.2s", status: "done" },
              { label: "ML Inference", time: "0.4s", status: "done" },
              { label: "Flood Map Gen", time: "0.6s", status: "done" },
              { label: "Graph Update", time: "0.3s", status: "done" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-primary">→</span>}
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-success" />
                  <span className="text-foreground">{step.label}</span>
                  <span className="text-muted-foreground">({step.time})</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <ThermometerSun className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-muted-foreground">Total pipeline: 3.3s — GPU: AMD ROCm MI250X</span>
          </div>
        </div>
      </section>

      {/* Active Hazards */}
      <section>
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Active Hazards
        </h2>
        <div className="space-y-3">
          {hazardData.map((hazard, i) => {
            const sev = severityConfig[hazard.severity];
            const Icon = hazard.icon;
            return (
              <motion.div
                key={hazard.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`data-panel border ${
                  hazard.severity === "Critical" ? "border-destructive/40 status-pulse-active" :
                  hazard.severity === "High" ? "border-accent/40 status-pulse-alert" :
                  "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${sev.color}`} />
                    <h3 className="font-heading text-lg font-semibold">{hazard.type}</h3>
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${sev.color} ${sev.bg}`}>
                    {hazard.severity}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="font-mono text-xs">📍 {hazard.location}</div>
                  <div className="font-mono text-xs">🕐 Detected: {hazard.detected}</div>
                  <div className="mt-2">{hazard.details}</div>
                  <div className="font-mono text-xs text-accent mt-1">
                    ⚠ {hazard.affected.toLocaleString()} civilians affected
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
