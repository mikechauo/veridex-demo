export type DealStage =
  | "Discovery"
  | "Risk Review"
  | "Agreement Sent"
  | "Closed Won"
  | "Closed Lost";

export type RiskLevel = "Low" | "Medium" | "High";

export type Role =
  | "Sales"
  | "Legal"
  | "Finance"
  | "Solutions Engineer"
  | "RevOps";

export type DealEventType =
  | "DEAL_CREATED"
  | "CRM_UPDATED"
  | "TASK_RESOLVED"
  | "STAGE_AUTO_MOVED"
  | "TASK_AUTO_ASSIGNED"
  | "DEAL_OWNER_UPDATED"
  | "CONFLICT_DETECTED";

export type DealEvent = {
  type: DealEventType;
  dealId: string;
  payload?: any;
  timestamp: string;
};

export type TaskType =
  | "Legal"
  | "Finance"
  | "Technical"
  | "Conflict";

export type Task = {
  id: string;
  key?: string; // 🔥 stable identifier for idempotency
  title: string;
  resolved: boolean;
  type?: TaskType;
  owner?: Role;
  source?: "system" | "manual"; // 🔥 identify system-generated tasks
};

export type IntelligenceScores = {
  risk: number;
  confidence: number;
  probability: number;
};

export type ExternalCRMData = {
  revenue: number;
  legalEntity: string;
};

export type Deal = {
  id: string;
  name: string;
  stage: DealStage;
  riskScore: number;
  owner?: Role;
  revenue: number;
  legalEntity: string;
  externalCRM?: ExternalCRMData;
  tasks: Task[];
  intelligence: IntelligenceScores;
  events: DealEvent[];
};
