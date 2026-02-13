// engine/initialDeal.ts
import { Deal } from "./types";

export const initialDeal: Deal = {
  id: "deal_001",
  name: "Acme Payments",
  stage: "Discovery",
  riskLevel: "Medium",
  riskScore: 55,
  tasks: [
    { id: "t1", title: "Verify Revenue Data", resolved: false },
    { id: "t2", title: "Confirm Legal Entity", resolved: false }
  ],
  intelligence: {
    risk: 55,
    confidence: 60,
    probability: 0.5
  },
  events: []
};
