// engine/engine.ts
import { Deal, DealEvent } from "./types";

export function processEvent(deal: Deal, event: DealEvent): Deal {
  const updatedDeal = { ...deal };

  // Log event
  updatedDeal.events = [...updatedDeal.events, event];

  // === EVENT ROUTING ===

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
      break;
  }

  // After any mutation → re-evaluate intelligence
  updatedDeal.intelligence = calculateIntelligence(updatedDeal);

  // Auto stage movement logic
  updatedDeal.stage = evaluateStage(updatedDeal);

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

function evaluateStage(deal: Deal) {
  if (deal.riskScore > 70 && deal.stage === "Discovery") {
    return "Risk Review";
  }

  if (
    deal.tasks.every(t => t.resolved) &&
    deal.stage === "Risk Review"
  ) {
    return "Agreement Sent";
  }

  return deal.stage;
}
