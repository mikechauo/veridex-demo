// engine/actions.ts
import { Deal } from "./types";

export type Action =
  | { type: "MOVE_STAGE"; to: Deal["stage"] }
  | { type: "RECALCULATE_RISK" }
  | { type: "NONE" };
