export const onboardingData = [
  {
    id: "company",
    title: "Company Profile",
    fields: [
      { id: "name", label: "Company Name", type: "text", value: "Acme Payments" },
      { id: "description", label: "Description", type: "text", value: "Payment Gateway" }
    ]
  },
  {
    id: "roles",
    title: "Roles & Responsibilities",
    fields: [
      { id: "head_sales", label: "Head of Sales", type: "text", value: "Sales" },
      { id: "underwriter", label: "Underwriter", type: "text", value: "Approves contracts" }
    ]
  },
  {
    id: "risk",
    title: "Risk & Compliance",
    fields: [
      { id: "kyc", label: "KYC Process Documented?", type: "boolean", value: false },
      { id: "chargeback_policy", label: "Chargeback Policy Defined?", type: "boolean", value: false }
    ]
  }
];
