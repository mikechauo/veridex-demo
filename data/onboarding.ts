export const onboardingData = {
  company: {
    name: "AcmeFlow Inc.",
    industry: "Payments & Subscription Billing",
    founded: 2018,
    employees: 240,
    markets: ["US", "Canada"],
  },

  roles: [
    "Head of Sales",
    "VP Engineering",
    "Compliance Officer",
    "Underwriting Manager",
    "Customer Support Lead",
  ],

  systems: {
    crm: "Salesforce",
    billing: "Stripe + Custom Ledger",
    support: "Zendesk",
    dataWarehouse: "Snowflake",
  },

  decisions: [
    "Merchant approval thresholds",
    "Risk scoring overrides",
    "Refund authorization limits",
  ],

  artifacts: [
    "Merchant application (PDF)",
    "Risk assessment worksheet",
    "Sales discovery call notes",
  ],

  approvalFlows: [
    "Sales → Underwriting → Compliance",
    "Legal escalation for edge cases",
  ],

  technicalSpecs: {
    api: "REST + Webhooks",
    auth: "OAuth 2.0",
    backend: "Node.js (TypeScript)",
    frontend: "React + Next.js",
    hosting: "AWS (ECS, RDS, S3)",
    encryption: "AES-256 at rest, TLS 1.2+",
    rateLimits: "1,000 req/min/client",
    events: [
      "merchant.created",
      "transaction.authorized",
      "transaction.settled",
      "refund.initiated",
    ],
  },

  compliance: {
    requirements: [
      "KYC & KYB verification required",
      "AML monitoring enabled",
      "PCI-DSS Level 1 compliant",
      "Canadian data residency required",
      "Electronic merchant agreement required",
      "Right-to-audit retained",
      "SAR reporting within 24 hours",
    ],
    retention: {
      transactions: "7 years",
      recordings: "24 months",
    },
    regulators: ["FINTRAC (Canada)", "FINCEN (US)"],
  },
};
