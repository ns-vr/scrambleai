import { motion } from "framer-motion";
import { Home, Users } from "lucide-react";

interface ShelterCardProps {
  name: string;
  capacity: number;
  occupied: number;
  status: "Open" | "Full" | "Closed";
  onClick?: () => void;
}

export default function ShelterCard({ name, capacity, occupied, status, onClick }: ShelterCardProps) {
  const pct = Math.round((occupied / capacity) * 100);
  const barColor = pct > 90 ? "bg-destructive" : pct > 70 ? "bg-accent" : "bg-success";
  const statusColor = status === "Open" ? "text-success" : status === "Full" ? "text-accent" : "text-destructive";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="data-panel border border-border cursor-pointer hover:border-primary/40 transition-all hover:scale-[1.01]"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-primary" />
          <h4 className="font-heading font-semibold">{name}</h4>
        </div>
        <span className={`text-xs font-mono ${statusColor}`}>{status}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Users className="h-3 w-3" />
        <span className="font-mono">{occupied} / {capacity}</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </motion.div>
  );
}
