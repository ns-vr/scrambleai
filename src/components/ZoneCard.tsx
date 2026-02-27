import { motion } from "framer-motion";
import { Users, Clock, AlertTriangle } from "lucide-react";

export type ZoneStatus = "Active" | "Alert" | "Normal";

interface ZoneCardProps {
  name: string;
  status: ZoneStatus;
  population: number;
  clearanceEta: string;
  bottleneck?: string;
}

const statusConfig = {
  Active: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/40", pulse: "status-pulse-active", dot: "bg-destructive" },
  Alert: { color: "text-accent", bg: "bg-accent/10", border: "border-accent/40", pulse: "status-pulse-alert", dot: "bg-accent" },
  Normal: { color: "text-success", bg: "bg-success/10", border: "border-success/40", pulse: "status-pulse-normal", dot: "bg-success" },
};

export default function ZoneCard({ name, status, population, clearanceEta, bottleneck }: ZoneCardProps) {
  const cfg = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`data-panel border ${cfg.border} ${cfg.pulse}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-lg font-semibold">{name}</h3>
        <span className={`flex items-center gap-1.5 text-xs font-mono ${cfg.color} ${cfg.bg} px-2 py-1 rounded-full`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {status}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span className="font-mono">{population.toLocaleString()} remaining</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="font-mono">ETA: {clearanceEta}</span>
        </div>
        {bottleneck && (
          <div className="flex items-center gap-2 text-accent">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span className="text-xs">{bottleneck}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
