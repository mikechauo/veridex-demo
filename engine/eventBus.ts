// engine/eventBus.ts
import { DealEvent } from "./types";

type EventHandler = (event: DealEvent) => void;

class EventBus {
  private handlers: EventHandler[] = [];

  subscribe(handler: EventHandler) {
    this.handlers.push(handler);
  }

  dispatch(event: DealEvent) {
    this.handlers.forEach(handler => handler(event));
  }
}

export const eventBus = new EventBus();
