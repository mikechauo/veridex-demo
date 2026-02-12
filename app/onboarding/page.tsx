"use client";

import { onboardingData } from "@/data/onboarding";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Client Onboarding Overview
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">

          {/* Company Info */}
          <div>
            <h2 className="text-sm uppercase tracking-wider text-zinc-500 mb-2">
              Company
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-zinc-400">Company Name</p>
                <p className="font-medium">
                  {onboardingData.company.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-400">CRM System</p>
                <p className="font-medium">
                  {onboardingData.company.systems.crm}
                </p>
              </div>
            </div>
          </div>

          {/* Approval Flow */}
          <div>
            <h2 className="text-sm uppercase tracking-wider text-zinc-500 mb-2">
              Approval Flow
            </h2>
            <p className="font-medium">
              {onboardingData.approvalFlow}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
