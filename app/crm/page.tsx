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
    <div className="p-10 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">
        Veridex CRM — Deal Intelligence
      </h1>

      {/* Risk Summary */}
        <section className="border rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold">Risk Summary</h2>
        <p><strong>Risk Score:</strong> {riskScore}</p>
        <p><strong>Risk Level:</strong> {riskLevel}</p>
        </section>


      {/* Discrepancies */}
      <section className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Detected Discrepancies
        </h2>

        {discrepancies.length === 0 ? (
          <p className="text-green-600">
            No mismatches detected.
          </p>
        ) : (
          discrepancies.map((d) => (
            <div
              key={d.id}
              className="bg-red-50 border border-red-200 p-4 rounded"
            >
              <p><strong>{d.category}</strong></p>
              <p>Expected: {d.expected}</p>
              <p>Actual: {d.actual}</p>
            </div>
          ))
        )}
      </section>

      {/* Tasks */}
      <section className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Auto-Generated Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-green-600">
            No tasks required.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-yellow-50 border border-yellow-200 p-4 rounded space-y-2"
            >
              <p><strong>Owner:</strong> {task.owner}</p>
              <p><strong>Action:</strong> {task.action}</p>
              <p><strong>Priority:</strong> {task.priority}</p>

              <button
                onClick={() => resolveTask(task.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Mark Resolved
              </button>
            </div>
          ))
        )}
      </section>

      
    {/* Deal Finalization */}
    <section className="border rounded-lg p-6 space-y-4">
    <h2 className="text-xl font-semibold">
        Deal Finalization
    </h2>

    {canProceed ? (
        <div className="space-y-2">
        <p className="text-green-600 font-medium">
            Deal eligible for approval.
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
            Finalize Deal
        </button>
        </div>
    ) : (
        <div className="space-y-2">
        <p className="text-red-600 font-medium">
            🚫 Deal blocked due to high risk discrepancies.
        </p>
        <p className="text-sm text-gray-600">
            Resolve high-severity conflicts before proceeding.
        </p>
        <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
        >
            Finalize Deal
        </button>
        </div>
    )}
    </section>


    </div>
  );
}
