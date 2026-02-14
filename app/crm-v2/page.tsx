"use client";

import { useState } from "react";
import { initialDeal } from "@/engine/initialDeal";
import { processEvent } from "@/engine/engine";
import { generateCRMActions } from "../../engine/crmSyncEngine";
import { Deal, DealEvent } from "@/engine/types";

export default function CRMV2Page() {
  const [deal, setDeal] = useState<Deal>(initialDeal);
  const [crmActions, setCrmActions] = useState<any[]>([]);
  const [crmAutomations, setCrmAutomations] = useState<any[]>([]);

  function dispatch(event: DealEvent) {
    const updated = processEvent(deal, event);
    setDeal(updated);

    const { actions, automations } = generateCRMActions(updated);
    setCrmActions(actions);
    setCrmAutomations(automations);
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
        legalEntity: "Acme Holdings LLC",
        stage: "Discovery",
        owner: "Sales"
      },
      timestamp: new Date().toISOString()
    });
  }

  const riskColor =
    deal.riskScore >= 70
      ? "bg-red-500"
      : deal.riskScore > 40
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Veridex – Live CRM Orchestration Demo
          </h1>
          <p className="text-gray-500">
            Real-time deal intelligence and CRM automation
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scenario Controls */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-semibold">
                Demo Scenarios
            </h2>

            <div className="flex flex-wrap gap-3">

                <button
                onClick={() => setDeal(initialDeal)}
                className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300"
                >
                Reset Deal
                </button>

                <button
                onClick={() =>
                    dispatch({
                    type: "CRM_UPDATED",
                    dealId: deal.id,
                    payload: {
                        revenue: deal.revenue,
                        legalEntity: deal.legalEntity,
                        stage: "Discovery",
                        owner: "Sales"
                    },
                    timestamp: new Date().toISOString()
                    })
                }
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                Clean CRM Sync
                </button>

                <button
                onClick={() =>
                    dispatch({
                    type: "CRM_UPDATED",
                    dealId: deal.id,
                    payload: {
                        revenue: 70000,
                        legalEntity: deal.legalEntity,
                        stage: "Discovery",
                        owner: "Sales"
                    },
                    timestamp: new Date().toISOString()
                    })
                }
                className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700"
                >
                Revenue Conflict
                </button>

                <button
                onClick={() =>
                    dispatch({
                    type: "CRM_UPDATED",
                    dealId: deal.id,
                    payload: {
                        revenue: 70000,
                        legalEntity: "Different Legal Entity LLC",
                        stage: "Discovery",
                        owner: "Sales"
                    },
                    timestamp: new Date().toISOString()
                    })
                }
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                Multi-System Conflict
                </button>

            </div>
            </div>


          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Internal State */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                Internal Deal State
              </h2>

              <div className="space-y-1">
                <p><strong>Stage:</strong> {deal.stage}</p>
                <p><strong>Owner:</strong> {deal.owner}</p>
              </div>

              {/* Risk Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Risk</span>
                  <span>{deal.riskScore}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${riskColor} h-3 rounded-full transition-all`}
                    style={{ width: `${deal.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  Confidence: {deal.intelligence.confidence}%
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  Probability: {(deal.intelligence.probability * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold">Tasks</h2>

              {deal.tasks.length === 0 && (
                <p className="text-gray-400">No active tasks</p>
              )}

              {deal.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex justify-between items-center p-4 rounded-xl border ${
                    task.resolved
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white"
                  }`}
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    {task.owner && (
                      <p className="text-sm text-gray-500">
                        Owner: {task.owner}
                      </p>
                    )}
                  </div>

                  {!task.resolved && (
                    <button
                      onClick={() => resolveTask(task.id)}
                      className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:opacity-80"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* CRM State */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                External CRM State (Salesforce)
              </h2>

              {deal.externalCRM ? (
                <div className="space-y-1">
                  <p><strong>Stage:</strong> {deal.externalCRM.stage}</p>
                  <p><strong>Owner:</strong> {deal.externalCRM.owner}</p>
                  <p><strong>Revenue:</strong> {deal.externalCRM.revenue}</p>
                  <p><strong>Legal Entity:</strong> {deal.externalCRM.legalEntity}</p>
                </div>
              ) : (
                <p className="text-gray-400">
                  No CRM data synced yet.
                </p>
              )}

              <button
                onClick={simulateCRMConflict}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Simulate CRM Update
              </button>
            </div>

            {/* Outbound CRM Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                Outbound CRM Actions
              </h2>

              {crmActions.length === 0 ? (
                <p className="text-gray-400">
                  No outbound updates required.
                </p>
              ) : (
                crmActions.map((action, i) => (
                  <div key={i} className="p-3 bg-slate-100 rounded-lg text-sm">
                    → {action.type} ({action.system}) : {action.value}
                  </div>
                ))
              )}
            </div>

            {/* CRM Automations */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                CRM Automations Triggered
              </h2>

              {crmAutomations.length === 0 ? (
                <p className="text-gray-400">
                  No CRM automations triggered.
                </p>
              ) : (
                crmAutomations.map((auto, i) => (
                  <div key={i} className="text-sm">
                    ✓ {auto.message}
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

        {/* Event Timeline */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
          <h2 className="text-xl font-semibold">Event Timeline</h2>

          {deal.events.length === 0 && (
            <p className="text-gray-400">No events yet</p>
          )}

          {deal.events.map((event, i) => (
            <div key={i} className="text-sm text-gray-600">
              {event.type} – {event.timestamp}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
