import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Home, AlertTriangle, Settings, MessageSquare, 
  Radio, Shield, Menu, X 
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/hazards", icon: AlertTriangle, label: "Hazards" },
  { to: "/chat", icon: MessageSquare, label: "AI Chat" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar shrink-0">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground tracking-wider">
              SCRAMBLE
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            EVACUATION INTELLIGENCE
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary glow-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Shield className="h-3 w-3" />
            <span>SYS STATUS: ONLINE</span>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          <span className="font-heading text-lg font-bold tracking-wider">SCRAMBLE</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="md:hidden fixed inset-0 z-40 bg-sidebar pt-16"
          >
            <nav className="p-4 space-y-2">
              {navItems.map(item => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium ${
                      active ? "bg-primary/10 text-primary" : "text-sidebar-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto md:pt-0 pt-14">
        {children}
      </main>
    </div>
  );
}
