import { DealStage } from "./types";

export type Action =
  | { type: "MOVE_STAGE"; to: DealStage }
  | { type: "ASSIGN_TASK_OWNER"; taskId: string }
  | { type: "ASSIGN_DEAL_OWNER" }
  | { type: "DETECT_CONFLICTS" };
