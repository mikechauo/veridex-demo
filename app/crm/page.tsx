"use client";

import { useState } from "react";
import { onboardingData } from "@/data/onboarding";
import { discoveryCall } from "@/data/discoveryCall";
import {
  compareData,
  calculateRiskScore,
  classifyRisk,
  Discrepancy,
  Task,
} from "@/lib/comparison";

/* ================================
   Pipeline Stages
================================ */

const STAGES = [
  "Lead",
  "Discovery",
  "Risk Review",
  "Agreement Sent",
  "Signed",
  "Closed Won",
] as const;

type Stage = typeof STAGES[number];

/* ================================
   Deal Domain Model
================================ */

interface Deal {
  id: string;
  stage: Stage;
  discrepancies: Discrepancy[];
  tasks: Task[];
}

/* ================================
   CRM Page
================================ */

export default function CRMPage() {
  const initialResult = compareData(onboardingData, discoveryCall);

  const [deal, setDeal] = useState<Deal>({
    id: "deal-1",
    stage: "Discovery",
    discrepancies: initialResult.discrepancies,
    tasks: initialResult.tasks,
  });

  /* ================================
     Risk Engine
  ================================= */

  const riskScore = calculateRiskScore(deal.discrepancies);
  const riskLevel = classifyRisk(riskScore);
  const canProceed = riskLevel !== "High";

  /* ================================
     Stage Control
  ================================= */

  const currentStageIndex = STAGES.indexOf(deal.stage);

  const moveForward = () => {
    if (currentStageIndex === STAGES.length - 1) return;

    const nextStage = STAGES[currentStageIndex + 1];

    if (nextStage === "Agreement Sent" && riskLevel === "High") {
      alert("Cannot send agreement while deal is High Risk.");
      return;
    }

    setDeal((prev) => ({
      ...prev,
      stage: nextStage,
    }));
  };

  const moveBackward = () => {
    if (currentStageIndex === 0) return;

    setDeal((prev) => ({
      ...prev,
      stage: STAGES[currentStageIndex - 1],
    }));
  };

  /* ================================
     Task Resolution
  ================================= */

  const resolveTask = (taskId: string) => {
    setDeal((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
      discrepancies: prev.discrepancies.filter((d) => d.id !== taskId),
    }));
  };

  /* ================================
     UI
  ================================= */

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
            <p className="text-2xl font-semibold">{riskScore}</p>
          </div>
        </div>

        {/* Pipeline */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-sm uppercase tracking-wider text-zinc-500 mb-4">
            Pipeline Stage
          </h2>

          <div className="flex items-center justify-between">
            {STAGES.map((s, index) => (
              <div
                key={s}
                className={`text-xs px-3 py-1 rounded-full border ${
                  index <= currentStageIndex
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-500 border-zinc-700"
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={moveBackward}
              className="px-3 py-1 text-xs bg-zinc-800 rounded hover:bg-zinc-700 transition"
            >
              Back
            </button>

            <button
              onClick={moveForward}
              className="px-3 py-1 text-xs bg-zinc-800 rounded hover:bg-zinc-700 transition"
            >
              Next
            </button>
          </div>
        </section>

        {/* Risk Overview */}
        <section className="grid grid-cols-3 gap-6">
          <Card title="Risk Level">
            <p
              className={`mt-2 text-lg font-semibold ${
                riskLevel === "High"
                  ? "text-red-500"
                  : riskLevel === "Moderate"
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              {riskLevel}
            </p>
          </Card>

          <Card title="Open Discrepancies">
            <p className="mt-2 text-lg font-semibold">
              {deal.discrepancies.length}
            </p>
          </Card>

          <Card title="Deal Status">
            <p
              className={`mt-2 text-lg font-semibold ${
                canProceed ? "text-emerald-400" : "text-red-500"
              }`}
            >
              {canProceed ? "Eligible" : "Blocked"}
            </p>
          </Card>
        </section>

        {/* Discrepancies */}
        <Section title="Discrepancies">
          {deal.discrepancies.length === 0 ? (
            <p className="text-emerald-400 text-sm">
              No mismatches detected.
            </p>
          ) : (
            deal.discrepancies.map((d) => (
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
        </Section>

        {/* Tasks */}
        <Section title="Open Tasks">
          {deal.tasks.length === 0 ? (
            <p className="text-emerald-400 text-sm">
              No tasks required.
            </p>
          ) : (
            deal.tasks.map((task) => (
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
        </Section>
      </div>
    </div>
  );
}

/* ================================
   Small UI Helpers
================================ */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <p className="text-xs text-zinc-500 uppercase tracking-wider">
        {title}
      </p>
      {children}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
      <h2 className="text-sm uppercase tracking-wider text-zinc-500">
        {title}
      </h2>
      {children}
    </section>
  );
}
