"use client";

import { useState } from "react";
import { onboardingData } from "@/data/onboarding";

const TABS = onboardingData.map(section => section.title);

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState(0);

  const totalFields = onboardingData.flatMap(s => s.fields).length;

  const completedFields = onboardingData
    .flatMap(s => s.fields)
    .filter(f => f.value !== "" && f.value !== false).length;
  
  const completionRate = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        Veridex — Client Onboarding (Demo)
      </h1>

      <div className="text-sm text-gray-600">
        Completion: {completionRate}%
      </div>


      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        {onboardingData.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-t text-sm font-medium ${
              activeTab === index
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>


      {/* Content */}
      <div className="bg-white border rounded-lg p-6 space-y-4">
        {onboardingData[activeTab].fields.map((field) => (
          <div key={field.id} className="space-y-1">
            <label className="block text-sm font-medium">
              {field.label}
            </label>
        
            {field.type === "text" && (
              <input
                type="text"
                defaultValue={field.value}
                className="border p-2 w-full rounded"
              />
            )}
        
            {field.type === "boolean" && (
              <input
                type="checkbox"
                defaultChecked={field.value}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

