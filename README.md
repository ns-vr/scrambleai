# Welcome To Scramble

## Project info

**URL**: https://scrambleai.lovable.app

##  Inspiration
The sirens rang.
**230 million people heard them.**
And then—nothing.

No directions.
No clarity.
No plan.

Smart cities spent billions on sensors, alerts, and dashboards. But when disaster actually strikes, alerts don’t save lives.

**Movement does.**
**Coordination does.**
**Intelligence does.**

SCRAMBLE was born from a terrifying realization:
Cities warn people—but they don’t *guide* them.

Evacuation isn’t a notification problem.
It’s a **flow optimization problem**.
And until now, no one was solving it.

---

##  What it does
**SCRAMBLE is AI-powered evacuation intelligence for real cities, real people, and real chaos.**

Not a broadcast.
Not a generic alert.
**A live, thinking system that coordinates how millions move to safety.**

SCRAMBLE:

* Detects disasters **in real time** using live satellite intelligence
* Calculates **optimal evacuation routes per city zone**
* Dynamically balances people across shelters to prevent gridlock
* Sends **personalized, multilingual instructions** via app *and SMS* (yes—even on 2G)
* Gives responders a **single, real-time command view of the entire city**

Think:
**Google Maps × Disaster Response × AI — at city scale.**

---
##  How we built it
We built SCRAMBLE as a real-time evacuation intelligence system, not a simple alert app.

Live flood data from Sentinel-1 SAR satellites is processed via Google Earth Engine and analyzed using GPU-accelerated AI on AMD ROCm. Flooded roads are automatically removed from the city’s road graph built from OpenStreetMap data.

An AI routing engine then optimizes zone-to-shelter assignments, balancing population flow and shelter capacity to prevent gridlock. Multilingual evacuation instructions are generated using Llama 3 and delivered via a citizen app and offline-first SMS, ensuring access even on low connectivity.

The entire pipeline—from satellite detection to citizen instruction—runs in under three minutes.

###  Technical Flow (End-to-End)

```
[ Sentinel-1 SAR Satellite ]
            ↓
[ Live Flood Detection AI ]
(PyTorch + :contentReference[oaicite:0]{index=0})
            ↓
[ Hazard Map Generator ]
(Flooded roads auto-blocked)
            ↓
[ AI Routing Optimizer ]
(NetworkX + A*)
            ↓
[ Zone → Shelter Assignment ]
(Capacity-balanced)
            ↓
[ Alert Intelligence Engine ]
(:contentReference[oaicite:1]{index=1} + vLLM, 5 languages)
            ↓
[ Delivery Layer ]
App + SMS (Offline-first)
            ↓
[ Responder Command Dashboard ]
(Live movement & bottlenecks)
```

 **From satellite detection to citizen SMS: under 3 minutes.**
Because in disasters, minutes decide lives.
---
##  Architecture Overview
* **Satellite Intelligence**: Sentinel-1 SAR via Google Earth Engine
* **AI Core**: Flood detection + routing optimization on AMD ROCm GPUs
* **LLMs**: Llama 3 generating *actionable*, multilingual evacuation instructions
* **Backend**: FastAPI + PostGIS for city-scale geospatial intelligence
* **Frontend**: React + Leaflet for citizens and responders
* **Offline Access**: SMS fallback via Twilio / MSG91

 Fully open-source.
 India-deployable.
 Zero vendor lock-in.
---
## Challenges we ran into
* Turning raw satellite flood data into **instant, actionable road closures**
* Routing **millions of people simultaneously** without collapsing shelters
* Designing for **low connectivity, feature phones, and digital exclusion**
* Making AI decisions **transparent and trusted** during emergencies
* Achieving **real-time GPU inference** under extreme latency constraints

Every challenge forced us to confront one truth:
Evacuation isn’t an app problem.
It’s a **systems problem**.
---
##  Accomplishments that we’re proud of
* A complete evacuation intelligence pipeline running in **under 3 minutes**
* **AI-balanced routing** across entire cities—not just individuals
* A truly **offline-first design** that works when networks fail
* Multilingual evacuation intelligence—not just translation, but clarity
* Built entirely on **open-source + AMD ROCm** — no proprietary lock-in

But most importantly:
**SCRAMBLE works for everyone.**
Not just the connected.
Not just the privileged.
Everyone.
---
## What we learned
* Evacuation is about **movement intelligence**, not louder alerts
* AI must be **infrastructure-aware**, not cloud-dependent
* Offline capability isn’t optional—it’s life-critical
* GPUs aren’t just for models; they power **real-time civic systems**
* Smart cities don’t need more dashboards—they need **coordination layers**
---
##  What’s next for SCRAMBLE
* Pilot deployment with a municipal corporation
* Expand beyond floods to wildfire and earthquake intelligence
* Scale community-led mapping for informal settlements
* Add family reunification and accessibility-aware routing
* Deploy city-wide systems across India—and globally

---
