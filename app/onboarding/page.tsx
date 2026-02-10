"use client";

import { useState } from "react";

const TABS = [
  "Company Profile",
  "Technical Specs",
  "Legal & Compliance",
];

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        Veridex — Client Onboarding (Demo)
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t text-sm font-medium
              ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border rounded-lg p-6 space-y-4">
        {activeTab === "Company Profile" && <CompanyProfile />}
        {activeTab === "Technical Specs" && <TechnicalSpecs />}
        {activeTab === "Legal & Compliance" && <LegalCompliance />}
      </div>
    </div>
  );
}

/* ---------------- TAB CONTENT ---------------- */

function CompanyProfile() {
  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-xl font-semibold">B2B SaaS Company Overview</h2>

      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Name:</strong> AcmeFlow Inc.</li>
        <li><strong>Industry:</strong> Payments & Subscription Billing</li>
        <li><strong>Founded:</strong> 2018</li>
        <li><strong>Employees:</strong> 240</li>
        <li><strong>Markets:</strong> US & Canada</li>

        <li>
          <strong>Roles</strong>
          <ul className="list-disc pl-6">
            <li>Head of Sales</li>
            <li>VP Engineering</li>
            <li>Compliance Officer</li>
            <li>Underwriting Manager</li>
            <li>Customer Support Lead</li>
          </ul>
        </li>

        <li>
          <strong>Core Systems</strong>
          <ul className="list-disc pl-6">
            <li>CRM: Salesforce</li>
            <li>Billing: Stripe + Custom Ledger</li>
            <li>Support: Zendesk</li>
            <li>Data Warehouse: Snowflake</li>
          </ul>
        </li>

        <li>
          <strong>Key Decisions</strong>
          <ul className="list-disc pl-6">
            <li>Merchant approval thresholds</li>
            <li>Risk scoring overrides</li>
            <li>Refund authorization limits</li>
          </ul>
        </li>

        <li>
          <strong>Artifacts</strong>
          <ul className="list-disc pl-6">
            <li>Merchant application (PDF)</li>
            <li>Risk assessment worksheet</li>
            <li>Sales discovery call notes</li>
          </ul>
        </li>

        <li>
          <strong>Approval Flows</strong>
          <ul className="list-disc pl-6">
            <li>Sales → Underwriting → Compliance</li>
            <li>Legal escalation for edge cases</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function TechnicalSpecs() {
  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-xl font-semibold">Technical Architecture</h2>

      <ul className="list-disc pl-6 space-y-1">
        <li>API: REST + Webhooks</li>
        <li>Authentication: OAuth 2.0</li>
        <li>Backend: Node.js (TypeScript)</li>
        <li>Frontend: React + Next.js</li>
        <li>Hosting: AWS (ECS, RDS, S3)</li>
        <li>Encryption: AES-256 at rest, TLS 1.2+</li>
        <li>Rate Limits: 1,000 req/min/client</li>

        <li>
          Event Types
          <ul className="list-disc pl-6">
            <li>merchant.created</li>
            <li>transaction.authorized</li>
            <li>transaction.settled</li>
            <li>refund.initiated</li>
          </ul>
        </li>

        <li>
          Internal Services
          <ul className="list-disc pl-6">
            <li>Risk Engine</li>
            <li>Ledger Reconciliation</li>
            <li>Notification Dispatcher</li>
          </ul>
        </li>

        <li>Audit Logs: Immutable append-only</li>
        <li>Monitoring: Datadog + CloudWatch</li>
      </ul>
    </div>
  );
}

function LegalCompliance() {
  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-xl font-semibold">Legal & Compliance Requirements</h2>

      <ul className="list-disc pl-6 space-y-1">
        <li>KYC & KYB verification required</li>
        <li>AML monitoring enabled by default</li>
        <li>PCI-DSS Level 1 compliant</li>
        <li>Canadian data residency required</li>
        <li>Electronic merchant agreement required</li>
        <li>Right-to-audit retained by AcmeFlow</li>
        <li>SAR reporting within 24 hours</li>

        <li>
          Data Retention
          <ul className="list-disc pl-6">
            <li>Transactions: 7 years</li>
            <li>Call recordings: 24 months</li>
          </ul>
        </li>

        <li>
          Regulators
          <ul className="list-disc pl-6">
            <li>FINTRAC (Canada)</li>
            <li>FINCEN (US)</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
