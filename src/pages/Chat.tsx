import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Radio } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "SCRAMBLE AI Co-Pilot online. I have access to live evacuation data, zone statuses, shelter occupancy, and routing information. How can I assist?",
    time: new Date().toLocaleTimeString(),
  },
];

const mockResponses: Record<string, string> = {
  "congested": "**Congested Zones:**\n- Zone A-3 (Riverside): Bridge bottleneck — 45,200 remaining, ETA 47min\n- Zone C-1 (Downtown): NH-48 blocked — 89,400 remaining, ETA 1h 12min\n\nRecommendation: Trigger re-optimization for Zone C-1 alternate routes.",
  "zone 14": "Zone 14 is not currently in the active monitoring grid. Active zones are A-3, B-7, C-1, D-4, E-2, and F-9. Would you like a population report for any of these?",
  "shelter": "**Shelter Status:**\n| Shelter | Occupied | Capacity | Status |\n|---|---|---|---|\n| Central Stadium | 12,400 | 15,000 | Open |\n| Convention Center | 7,800 | 8,000 | Open |\n| North School | 2,950 | 3,000 | Full |\n| Tech Park | 1,200 | 5,000 | Open |\n\nS3 (North School) is at 98% — rebalancing recommended.",
  "rerouted": "Zone B was rerouted at 14:22 UTC due to:\n1. SAR detection of water accumulation in industrial corridor\n2. Soil instability risk near warehouse district\n3. Predicted road degradation within 45 minutes\n\nAlternate routes via Highway 7 were activated with 12% longer ETA but 100% safety margin.",
  "default": "I can help with:\n- Zone status queries (\"Which zones are congested?\")\n- Shelter information (\"Show shelter status\")\n- AI decision explanations (\"Why was Zone B rerouted?\")\n- System commands (requires confirmation)\n\nWhat would you like to know?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("congested") || lower.includes("bottleneck")) return mockResponses["congested"];
  if (lower.includes("zone 14") || lower.includes("zone fourteen")) return mockResponses["zone 14"];
  if (lower.includes("shelter") || lower.includes("capacity") || lower.includes("s3")) return mockResponses["shelter"];
  if (lower.includes("reroute") || lower.includes("why")) return mockResponses["rerouted"];
  return mockResponses["default"];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(userMsg.content),
        time: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, response]);
      setTyping(false);
    }, 800 + Math.random() * 500);
  };

  return (
    <div className="flex flex-col h-full scramble-grid">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h1 className="font-heading text-xl font-bold tracking-wide">AI Co-Pilot</h1>
        </div>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">
          Query live system data • Explain AI decisions • Issue commands
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"
            }`}>
              {msg.role === "assistant" ? <Radio className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            <div className={`max-w-[75%] ${
              msg.role === "user" ? "bg-primary/10 border-primary/20" : "bg-card border-border"
            } border rounded-lg px-4 py-3`}>
              <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-1">{msg.time}</div>
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Radio className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <div className="bg-card border border-border rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask about zones, shelters, routes..."
            className="bg-input border-border font-body"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {["Which zones are congested?", "Show shelter status", "Why was Zone B rerouted?"].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors font-mono"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
