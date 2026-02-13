// engine/rules.ts
import { Deal } from "./types";
import { Action } from "./actions";

export type Rule = {
  name: string;
  evaluate: (deal: Deal) => Action | null;
};

export const rules: Rule[] = [
  {
    name: "High Risk Moves to Review",
    evaluate: (deal) => {
      if (deal.riskScore > 70 && deal.stage === "Discovery") {
        return { type: "MOVE_STAGE", to: "Risk Review" };
      }
      return null;
    }
  },
  {
    name: "All Tasks Resolved Sends Agreement",
    evaluate: (deal) => {
      if (
        deal.tasks.every(t => t.resolved) &&
        deal.stage === "Risk Review"
      ) {
        return { type: "MOVE_STAGE", to: "Agreement Sent" };
      }
      return null;
    }
  }
];
