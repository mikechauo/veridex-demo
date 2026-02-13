import { Deal, DealEvent } from "./types";
import { rules } from "./rules";
import { Action } from "./actions";
import {
  assignTaskOwner,
  assignDealOwner
} from "./assignmentEngine";
import { detectConflicts } from "./conflictEngine";

export function processEvent(deal: Deal, event: DealEvent): Deal {
  let updatedDeal = { ...deal };

  updatedDeal.events = [...updatedDeal.events, event];

  switch (event.type) {
    case "CRM_UPDATED":
      updatedDeal.externalCRM = event.payload;
      break;

    case "TASK_RESOLVED":
      updatedDeal.tasks = updatedDeal.tasks.map((task) =>
        task.id === event.payload.taskId
          ? { ...task, resolved: true }
          : task
      );
      break;
  }

  updatedDeal = runRules(updatedDeal);

  // 🔥 Risk is now recalculated from state
  updatedDeal.riskScore = calculateRisk(updatedDeal);

  updatedDeal.intelligence = calculateIntelligence(updatedDeal);

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

function ensureConflictTask(
  deal: Deal,
  key: string,
  title: string
) {
  const existing = deal.tasks.find((t) => t.key === key);

  if (!existing) {
    deal.tasks.push({
      id: crypto.randomUUID(),
      key,
      title,
      resolved: false,
      type: "Conflict",
      source: "system"
    });

    deal.events.push({
      type: "CONFLICT_DETECTED",
      dealId: deal.id,
      payload: { conflict: title },
      timestamp: new Date().toISOString()
    });
  }
}

function applyAction(
  deal: Deal,
  action: Action,
  ruleName: string
): Deal {
  let updatedDeal = { ...deal };

  switch (action.type) {
    case "DETECT_CONFLICTS":
      const conflicts = detectConflicts(updatedDeal);

      const revenueMismatch = conflicts.includes(
        "Revenue mismatch between systems"
      );

      const legalMismatch = conflicts.includes(
        "Legal entity mismatch between systems"
      );

      if (revenueMismatch) {
        ensureConflictTask(
          updatedDeal,
          "revenue-mismatch",
          "Revenue mismatch between systems"
        );
      }

      if (legalMismatch) {
        ensureConflictTask(
          updatedDeal,
          "legal-mismatch",
          "Legal entity mismatch between systems"
        );
      }

      break;

    case "MOVE_STAGE":
      if (updatedDeal.stage !== action.to) {
        updatedDeal.stage = action.to;

        updatedDeal.events.push({
          type: "STAGE_AUTO_MOVED",
          dealId: deal.id,
          payload: { to: action.to, rule: ruleName },
          timestamp: new Date().toISOString()
        });
      }
      break;

    case "ASSIGN_TASK_OWNER":
      updatedDeal.tasks = updatedDeal.tasks.map((task) =>
        task.id === action.taskId
          ? {
              ...task,
              owner: assignTaskOwner(task)
            }
          : task
      );

      updatedDeal.events.push({
        type: "TASK_AUTO_ASSIGNED",
        dealId: deal.id,
        payload: { taskId: action.taskId },
        timestamp: new Date().toISOString()
      });
      break;

    case "ASSIGN_DEAL_OWNER":
      const newOwner = assignDealOwner(updatedDeal);

      if (newOwner !== updatedDeal.owner) {
        updatedDeal.owner = newOwner;

        updatedDeal.events.push({
          type: "DEAL_OWNER_UPDATED",
          dealId: deal.id,
          payload: { owner: newOwner },
          timestamp: new Date().toISOString()
        });
      }
      break;
  }

  return updatedDeal;
}

/**
 * 🔥 Risk is derived from current open conflicts
 */
function calculateRisk(deal: Deal): number {
  const baseRisk = 30;

  const openConflictTasks = deal.tasks.filter(
    (t) => t.type === "Conflict" && !t.resolved
  ).length;

  const conflictRisk = openConflictTasks * 20;

  const totalRisk = baseRisk + conflictRisk;

  return Math.min(totalRisk, 100);
}

function calculateIntelligence(deal: Deal) {
  const risk = deal.riskScore;
  const confidence = Math.max(0, 100 - risk);
  const probability =
    risk > 70 ? 0.3 : risk > 40 ? 0.6 : 0.85;

  return { risk, confidence, probability };
}
