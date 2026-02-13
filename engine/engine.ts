// engine/engine.ts
import { Deal, DealEvent } from "./types";
import { rules } from "./rules";
import { Action } from "./actions";

export function processEvent(deal: Deal, event: DealEvent): Deal {
  let updatedDeal = { ...deal };

  // Log incoming event
  updatedDeal.events = [...updatedDeal.events, event];

  // === MUTATE BASED ON EVENT ===
  switch (event.type) {
    case "CRM_UPDATED":
      updatedDeal.riskScore = calculateRisk(updatedDeal);
      break;

    case "TASK_RESOLVED":
      updatedDeal.tasks = updatedDeal.tasks.map(task =>
        task.id === event.payload.taskId
          ? { ...task, resolved: true }
          : task
      );
      updatedDeal.riskScore = calculateRisk(updatedDeal);
      break;
  }

  // Recalculate intelligence
  updatedDeal.intelligence = calculateIntelligence(updatedDeal);

  // === RULE ENGINE EXECUTION LOOP ===
  updatedDeal = runRules(updatedDeal);

  return updatedDeal;
}

function runRules(deal: Deal): Deal {
  let updatedDeal = { ...deal };

  for (const rule of rules) {
    const action = rule.evaluate(updatedDeal);
    if (action) {
      updatedDeal = applyAction(updatedDeal, action, rule.name);
    }
  }

  return updatedDeal;
}

function applyAction(
  deal: Deal,
  action: Action,
  ruleName: string
): Deal {
  let updatedDeal = { ...deal };

  switch (action.type) {
    case "MOVE_STAGE":
      updatedDeal.stage = action.to;

      updatedDeal.events = [
        ...updatedDeal.events,
        {
          type: "STAGE_AUTO_MOVED",
          dealId: deal.id,
          payload: { to: action.to, rule: ruleName },
          timestamp: new Date().toISOString()
        }
      ];
      break;
  }

  return updatedDeal;
}

function calculateRisk(deal: Deal): number {
  const unresolved = deal.tasks.filter(t => !t.resolved).length;
  return Math.max(0, 100 - unresolved * 20);
}

function calculateIntelligence(deal: Deal) {
  const risk = deal.riskScore;
  const confidence = 100 - risk;
  const probability = risk > 70 ? 0.8 : risk > 40 ? 0.6 : 0.4;

  return { risk, confidence, probability };
}
