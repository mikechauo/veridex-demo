export const discoveryCall = {
  plainText: `
Sales (John): Thanks for joining today. Can you walk us through your current merchant onboarding process?

Head of Sales (Client): Sure. Sales collects the merchant application and uploads it into Salesforce. 
Underwriting manually reviews applications above $50k monthly volume. 
Risk overrides require Compliance approval.

VP Engineering: We currently use Stripe for billing and we do not support webhooks yet.
We need real-time transaction monitoring and AML checks.

Compliance Officer: We must ensure FINTRAC reporting within 24 hours. 
We store call recordings for 12 months.

Sales (John): Great. Do you require Canadian data residency?

Compliance Officer: Yes, absolutely. Data must remain in Canada.
`,
  structured: {
    merchantApprovalThreshold: 50000,
    systems: {
      crm: "Salesforce",
      billing: "Stripe",
      webhookSupport: false
    },
    requirements: {
      amlMonitoring: true,
      realtimeMonitoring: true,
      dataResidency: "Canada",
      callRecordingRetentionMonths: 12,
      regulator: ["FINTRAC"]
    }
  }
};
