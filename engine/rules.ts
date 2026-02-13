import { Deal } from "./types";
import { Action } from "./actions";

export type Rule = {
  name: string;
  evaluate: (deal: Deal) => Action | null;
};

export const rules: Rule[] = [
  {
    name: "Detect System Conflicts",
    evaluate: (deal) => {
      if (deal.externalCRM) {
        return { type: "DETECT_CONFLICTS" };
      }
      return null;
    }
  },
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
        deal.tasks.every((t) => t.resolved) &&
        deal.stage === "Risk Review"
      ) {
        return { type: "MOVE_STAGE", to: "Agreement Sent" };
      }
      return null;
    }
  },
  {
    name: "Unassigned Tasks Get Routed",
    evaluate: (deal) => {
      const unassigned = deal.tasks.find(
        (t) => !t.owner && !t.resolved
      );

      if (unassigned) {
        return {
          type: "ASSIGN_TASK_OWNER",
          taskId: unassigned.id
        };
      }

      return null;
    }
  },
  {
    name: "Deal Owner Adjusts Based on Risk",
    evaluate: () => {
      return { type: "ASSIGN_DEAL_OWNER" };
    }
  }
];
