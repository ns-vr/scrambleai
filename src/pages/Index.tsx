import { motion } from "framer-motion";
import { Radio, Users, MapPin, Shield, AlertTriangle, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import heroCity from "@/assets/hero-city.jpg";

const features = [
  { icon: Zap, title: "SAR Detection", desc: "Sentinel-1 satellite flood detection through clouds, day & night" },
  { icon: MapPin, title: "Smart Routing", desc: "GPU-accelerated evacuation path optimization in under 3 minutes" },
  { icon: Globe, title: "Multilingual", desc: "Instructions in Kannada, Hindi, Tamil, Telugu & English" },
  { icon: Shield, title: "Offline-First", desc: "SMS fallback for 2G networks and connectivity outages" },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCity} alt="City evacuation grid" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>
        <div className="absolute inset-0 scramble-grid" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Radio className="h-8 w-8 text-primary" />
            <span className="font-heading text-4xl md:text-5xl font-bold tracking-wider text-glow-primary">
              SCRAMBLE
            </span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
            AI-Powered Civilian Evacuation Intelligence
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
          >
            From satellite detection to safety routing in under 3 minutes.
            Real-time movement coordination for smart cities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:opacity-90 transition-opacity glow-primary"
            >
              Open Dashboard
            </Link>
            <Link
              to="/hazards"
              className="px-6 py-3 border border-border text-foreground font-heading font-semibold rounded-md hover:bg-muted transition-colors"
            >
              View Hazards
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Live Stats */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center">
          Live System Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={AlertTriangle} label="Active Zones" value={7} variant="danger" />
          <StatCard icon={Users} label="Evacuating" value={284530} variant="accent" />
          <StatCard icon={MapPin} label="Shelters Open" value={42} variant="success" />
          <StatCard icon={Shield} label="Routes Active" value={156} variant="primary" />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="data-panel border border-border hover:border-primary/30 transition-colors"
            >
              <f.icon className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-heading text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="data-panel border border-primary/20 glow-primary"
        >
          <h2 className="font-heading text-2xl font-bold text-primary mb-2">
            Satellite → Safety in &lt;3 Minutes
          </h2>
          <div className="flex items-center justify-center gap-2 md:gap-6 text-xs font-mono text-muted-foreground flex-wrap">
            {["SAR Ingest", "→", "Flood Detection", "→", "Graph Update", "→", "Route Optimization", "→", "Delivery"].map(
              (step, i) => (
                <span key={i} className={step === "→" ? "text-primary" : ""}>{step}</span>
              )
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
