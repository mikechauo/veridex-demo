"use client";

import { useState } from "react";
import { onboardingData } from "@/data/onboarding";
import { discoveryCall } from "@/data/discoveryCall";
import { compareData } from "@/lib/comparison";

export default function CRMPage() {
  const initialResult = compareData(onboardingData, discoveryCall);

  const [tasks, setTasks] = useState(initialResult.tasks);
  const [discrepancies, setDiscrepancies] = useState(
    initialResult.discrepancies
  );

  const resolveTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    const updatedDiscrepancies = discrepancies.filter(
      (d) => d.id !== taskId
    );

    setTasks(updatedTasks);
    setDiscrepancies(updatedDiscrepancies);
  };

  // --- Risk Calculation (Derived from Current State) ---

    const severityWeights = {
    low: 1,
    medium: 3,
    high: 5,
    };

    const riskScore = discrepancies.reduce((total, d) => {
    return total + severityWeights[d.severity];
    }, 0);

    let riskLevel: "Aligned" | "Low" | "Moderate" | "High";

    if (riskScore === 0) riskLevel = "Aligned";
    else if (riskScore <= 3) riskLevel = "Low";
    else if (riskScore <= 6) riskLevel = "Moderate";
    else riskLevel = "High";

    // --- Deal Gating Logic ---
    const canProceed = riskLevel !== "High";

return (
  <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
    <div className="max-w-6xl mx-auto space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Veridex CRM
          </h1>
          <p className="text-sm text-zinc-400">
            Deal Intelligence Dashboard
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            Risk Score
          </p>
          <p className="text-2xl font-semibold">
            {riskScore}
          </p>
        </div>
      </div>

      {/* Risk Overview */}
      <section className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            Risk Level
          </p>
          <p
            className={`mt-2 text-lg font-semibold ${
              riskLevel === "High"
                ? "text-red-500"
                : riskLevel === "Moderate"
                ? "text-amber-400"
                : riskLevel === "Low"
                ? "text-emerald-400"
                : "text-emerald-500"
            }`}
          >
            {riskLevel}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            Open Discrepancies
          </p>
          <p className="mt-2 text-lg font-semibold">
            {discrepancies.length}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            Deal Status
          </p>
          <p
            className={`mt-2 text-lg font-semibold ${
              canProceed
                ? "text-emerald-400"
                : "text-red-500"
            }`}
          >
            {canProceed ? "Eligible" : "Blocked"}
          </p>
        </div>
      </section>

      {/* Discrepancies */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-wider text-zinc-500">
          Discrepancies
        </h2>

        {discrepancies.length === 0 ? (
          <p className="text-emerald-400 text-sm">
            No mismatches detected.
          </p>
        ) : (
          discrepancies.map((d) => (
            <div
              key={d.id}
              className="border border-zinc-800 bg-zinc-950 rounded-lg p-4"
            >
              <p className="font-medium">{d.category}</p>
              <p className="text-sm text-zinc-400">
                Expected: {d.expected}
              </p>
              <p className="text-sm text-zinc-400">
                Actual: {d.actual}
              </p>
            </div>
          ))
        )}
      </section>

      {/* Tasks */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-wider text-zinc-500">
          Open Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-emerald-400 text-sm">
            No tasks required.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="border border-zinc-800 bg-zinc-950 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{task.action}</p>
                <p className="text-xs text-zinc-400">
                  Owner: {task.owner} • Priority: {task.priority}
                </p>
              </div>

              <button
                onClick={() => resolveTask(task.id)}
                className="text-xs px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition"
              >
                Resolve
              </button>
            </div>
          ))
        )}
      </section>

      {/* Deal Finalization */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-wider text-zinc-500">
          Deal Finalization
        </h2>

        {canProceed ? (
          <button className="bg-emerald-500 hover:bg-emerald-600 transition px-4 py-2 rounded text-sm font-medium">
            Finalize Deal
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-red-500 text-sm">
              High-risk discrepancies must be resolved.
            </p>
            <button
              disabled
              className="bg-zinc-800 text-zinc-500 px-4 py-2 rounded text-sm cursor-not-allowed"
            >
              Finalize Deal
            </button>
          </div>
        )}
      </section>

    </div>
  </div>
);

  );
}
