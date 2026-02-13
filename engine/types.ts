// engine/types.ts

export type DealStage =
  | "Discovery"
  | "Risk Review"
  | "Agreement Sent"
  | "Closed Won"
  | "Closed Lost";

export type RiskLevel = "Low" | "Medium" | "High";

export type DealEventType =
  | "DEAL_CREATED"
  | "CRM_UPDATED"
  | "TASK_RESOLVED"
  | "RISK_RECALCULATED"
  | "STAGE_AUTO_MOVED"
  | "TASK_AUTO_ASSIGNED"
  | "SYNC_RECEIVED";

export type DealEvent = {
  type: DealEventType;
  dealId: string;
  payload?: any;
  timestamp: string;
};

export type Task = {
  id: string;
  title: string;
  resolved: boolean;
  owner?: string;
};

export type IntelligenceScores = {
  risk: number;
  confidence: number;
  probability: number;
};

export type Deal = {
  id: string;
  name: string;
  stage: DealStage;
  riskLevel: RiskLevel;
  riskScore: number;
  tasks: Task[];
  intelligence: IntelligenceScores;
  events: DealEvent[];
};
