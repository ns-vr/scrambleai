import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  variant?: "primary" | "accent" | "danger" | "success";
}

const variantStyles = {
  primary: "border-primary/30 glow-primary",
  accent: "border-accent/30 glow-accent",
  danger: "border-destructive/30 glow-danger",
  success: "border-success/30 glow-success",
};

const variantText = {
  primary: "text-primary",
  accent: "text-accent",
  danger: "text-destructive",
  success: "text-success",
};

export default function StatCard({ icon: Icon, label, value, suffix = "", variant = "primary" }: StatCardProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`data-panel border ${variantStyles[variant]} transition-all hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-4 w-4 ${variantText[variant]}`} />
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{label}</span>
      </div>
      <div className={`text-3xl font-heading font-bold ${variantText[variant]} text-glow-primary`}>
        {display.toLocaleString()}{suffix}
      </div>
    </motion.div>
  );
}
