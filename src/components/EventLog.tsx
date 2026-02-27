import { useState } from "react";
import { AlertTriangle, Info, Radio, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type EventType = "alert" | "system" | "info";

interface LogEvent {
  id: string;
  type: EventType;
  message: string;
  time: string;
}

const mockEvents: LogEvent[] = [
  { id: "1", type: "alert", message: "Zone B-7 flood level rising — rerouting 12,000 civilians", time: "14:32:07" },
  { id: "2", type: "system", message: "Shelter S3 capacity updated to 94%", time: "14:31:45" },
  { id: "3", type: "info", message: "SAR satellite pass completed — new flood map generated", time: "14:30:12" },
  { id: "4", type: "alert", message: "Road NH-48 marked impassable — alternate routes activated", time: "14:29:55" },
  { id: "5", type: "system", message: "Evacuation routing optimizer ran in 1.2s", time: "14:28:30" },
  { id: "6", type: "info", message: "SMS batch delivered to 45,000 recipients in Zone C", time: "14:27:10" },
  { id: "7", type: "alert", message: "Shelter S7 approaching capacity — rebalancing initiated", time: "14:26:45" },
  { id: "8", type: "system", message: "GPU cluster health check passed", time: "14:25:00" },
];

const typeConfig: Record<EventType, { icon: typeof AlertTriangle; color: string }> = {
  alert: { icon: AlertTriangle, color: "text-destructive" },
  system: { icon: Radio, color: "text-primary" },
  info: { icon: Info, color: "text-muted-foreground" },
};

const filterLabels: Record<string, string> = {
  all: "All",
  alert: "Alerts",
  system: "System",
  info: "Info",
};

export default function EventLog() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? mockEvents : mockEvents.filter(e => e.type === filter);

  return (
    <div className="data-panel border border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">Live Event Log</h3>
        <div className="flex items-center gap-1">
          <Filter className="h-3 w-3 text-muted-foreground" />
          {Object.keys(filterLabels).map(key => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`text-xs px-2 py-0.5 rounded font-mono transition-colors ${
                filter === key
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filterLabels[key]}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        <AnimatePresence>
          {filtered.map(event => {
            const cfg = typeConfig[event.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-start gap-2 px-2 py-1.5 rounded hover:bg-muted/50 text-xs"
              >
                <Icon className={`h-3 w-3 mt-0.5 shrink-0 ${cfg.color}`} />
                <span className="text-muted-foreground font-mono shrink-0">{event.time}</span>
                <span className="text-secondary-foreground">{event.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
