// engine/assignmentEngine.ts
import { Deal, Task, Role } from "./types";

export function assignTaskOwner(task: Task): Role {
  switch (task.type) {
    case "Legal":
      return "Legal";
    case "Finance":
      return "Finance";
    case "Technical":
      return "Solutions Engineer";
    default:
      return "RevOps";
  }
}

export function assignDealOwner(deal: Deal): Role {
  if (deal.riskScore > 70) {
    return "RevOps";
  }

  if (deal.stage === "Agreement Sent") {
    return "Sales";
  }

  return "Sales";
}
