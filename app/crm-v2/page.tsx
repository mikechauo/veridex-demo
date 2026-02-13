"use client";

import { useState } from "react";
import { initialDeal } from "@/engine/initialDeal";
import { processEvent } from "@/engine/engine";
import { Deal, DealEvent } from "@/engine/types";

export default function CRMV2Page() {
  const [deal, setDeal] = useState<Deal>(initialDeal);

  function dispatch(event: DealEvent) {
    const updated = processEvent(deal, event);
    setDeal(updated);
  }

  function resolveTask(taskId: string) {
    dispatch({
      type: "TASK_RESOLVED",
      dealId: deal.id,
      payload: { taskId },
      timestamp: new Date().toISOString()
    });
  }

  function simulateCRMConflict() {
    dispatch({
      type: "CRM_UPDATED",
      dealId: deal.id,
      payload: {
        revenue: 70000,
        legalEntity: "Acme Holdings LLC"
      },
      timestamp: new Date().toISOString()
    });
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Veridex CRM v2 – Conflict Intelligence</h1>

      <hr />

      <h2>{deal.name}</h2>
      <p><strong>Stage:</strong> {deal.stage}</p>
      <p><strong>Deal Owner:</strong> {deal.owner}</p>
      <p><strong>Risk Score:</strong> {deal.riskScore}</p>

      <h3>Intelligence</h3>
      <p>Confidence: {deal.intelligence.confidence}</p>
      <p>Close Probability: {deal.intelligence.probability}</p>

      <hr />

      <h3>Internal Data</h3>
      <p>Revenue: ${deal.revenue}</p>
      <p>Legal Entity: {deal.legalEntity}</p>

      <hr />

      <button onClick={simulateCRMConflict}>
        Simulate CRM Conflict
      </button>

      <hr />

      <h3>Tasks</h3>
      {deal.tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: 10 }}>
          <span>
            {task.title} – {task.resolved ? "✅" : "❌"}
            {task.owner && ` (Owner: ${task.owner})`}
          </span>

          {!task.resolved && (
            <button
              style={{ marginLeft: 10 }}
              onClick={() => resolveTask(task.id)}
            >
              Resolve
            </button>
          )}
        </div>
      ))}

      <hr />

      <h3>Event Timeline</h3>
      {deal.events.map((event, i) => (
        <div key={i}>
          <small>
            {event.type} – {event.timestamp}
          </small>
        </div>
      ))}
    </div>
  );
}
