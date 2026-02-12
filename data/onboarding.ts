// export const onboardingData = {
//   company: {
//     name: "AcmeFlow Inc",
//     systems: {
//       crm: "Salesforce"
//     }
//   },
//   approvalFlow: "Manager → Director → CFO"
// };
export const onboardingData = [
  {
    id: "company",
    title: "Company Info",
    fields: [
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        value: "AcmeFlow Inc"
      },
      {
        id: "crm",
        label: "CRM System",
        type: "text",
        value: "Salesforce"
      }
    ]
  },
  {
    id: "approval",
    title: "Approval Flow",
    fields: [
      {
        id: "approvalFlow",
        label: "Approval Flow",
        type: "text",
        value: "Manager → Director → CFO"
      }
    ]
  }
];

