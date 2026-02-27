import { Satellite, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface DataSourceOverlayProps {
  source?: string;
  latency?: string;
  lastUpdate?: string;
}

export default function DataSourceOverlay({
  source = "SAR Satellite: Sentinel-1",
  latency = "142ms",
  lastUpdate = "14:32:07 UTC",
}: DataSourceOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 bg-card/90 backdrop-blur border border-border rounded-md px-3 py-2"
    >
      <div className="flex items-center gap-1.5">
        <Satellite className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-mono text-primary">{source}</span>
      </div>
      <div className="w-px h-4 bg-border" />
      <div className="flex items-center gap-1.5">
        <Clock className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs font-mono text-muted-foreground">Latency: {latency}</span>
      </div>
      <div className="w-px h-4 bg-border" />
      <span className="text-xs font-mono text-muted-foreground">Last: {lastUpdate}</span>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
    </motion.div>
  );
}
