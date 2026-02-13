import { Deal } from "./types";

export function detectConflicts(deal: Deal) {
  if (!deal.externalCRM) return [];

  const conflicts: string[] = [];

  if (deal.revenue !== deal.externalCRM.revenue) {
    conflicts.push("Revenue mismatch between systems");
  }

  if (deal.legalEntity !== deal.externalCRM.legalEntity) {
    conflicts.push("Legal entity mismatch between systems");
  }

  return conflicts;
}
