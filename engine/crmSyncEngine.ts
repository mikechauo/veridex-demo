// engine/crmSyncEngine.ts

import { Deal } from "./types";

export type CRMAction =
  | {
      type: "UPDATE_STAGE";
      system: "Salesforce";
      value: string;
    }
  | {
      type: "ASSIGN_OWNER";
      system: "Salesforce";
      value: string;
    }
  | {
      type: "CREATE_TASK";
      system: "Salesforce";
      value: string;
    }
  | {
      type: "ADD_NOTE";
      system: "Salesforce";
      value: string;
    };

export type CRMAutomation = {
  message: string;
};

export function generateCRMActions(deal: Deal): {
  actions: CRMAction[];
  automations: CRMAutomation[];
} {
  const actions: CRMAction[] = [];
  const automations: CRMAutomation[] = [];

  // Stage sync
  if (deal.externalCRM && deal.stage !== deal.externalCRM.stage) {
    actions.push({
      type: "UPDATE_STAGE",
      system: "Salesforce",
      value: deal.stage
    });

    automations.push({
      message: `CRM triggered workflow due to stage update → ${deal.stage}`
    });
  }

  // Owner sync
  if (deal.externalCRM && deal.owner !== deal.externalCRM.owner) {
    actions.push({
      type: "ASSIGN_OWNER",
      system: "Salesforce",
      value: deal.owner || "Unassigned"
    });

    automations.push({
      message: `CRM reassigned deal owner → ${deal.owner}`
    });
  }

  // Conflict tasks
  deal.tasks
    .filter((t) => t.type === "Conflict" && !t.resolved)
    .forEach((task) => {
      actions.push({
        type: "CREATE_TASK",
        system: "Salesforce",
        value: task.title
      });

      automations.push({
        message: `CRM created governance task → ${task.title}`
      });
    });

  return { actions, automations };
}
