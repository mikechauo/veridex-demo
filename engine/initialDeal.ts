import { Deal } from "./types";

export const initialDeal: Deal = {
  id: "deal_001",
  name: "Acme Payments",
  stage: "Discovery",
  riskScore: 55,
  owner: "Sales",
  revenue: 50000,
  legalEntity: "Acme Inc.",
  externalCRM: undefined,
  tasks: [
    {
      id: "t1",
      title: "Verify Revenue Data",
      resolved: false,
      type: "Finance"
    },
    {
      id: "t2",
      title: "Confirm Legal Entity",
      resolved: false,
      type: "Legal"
    }
  ],
  intelligence: {
    risk: 55,
    confidence: 45,
    probability: 0.5
  },
  events: []
};
