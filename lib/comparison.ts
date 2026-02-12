export interface Discrepancy {
  id: string;
  category: string;
  field: string;
  onboardingValue: string;
  discoveryValue: string;
  severity: "low" | "medium" | "high";
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  relatedDiscrepancyId: string;
  status: "open" | "resolved";
}

export function compareOnboardingToDiscovery(
  onboardingData: any[],
  discoveryCall: any
) {
  const discrepancies: Discrepancy[] = [];
  const tasks: Task[] = [];

  // Example 1 — Compare CRM System
  const companyProfile = onboardingData.find(
    (section) => section.title === "Company Profile"
  );

  const onboardingCRM = companyProfile?.content.systems?.crm;
  const discoveryCRM = discoveryCall.structuredData.claimedCRM;

  if (onboardingCRM !== discoveryCRM) {
    const id = "disc-001";

    discrepancies.push({
      id,
      category: "System Mismatch",
      field: "CRM",
      onboardingValue: onboardingCRM,
      discoveryValue: discoveryCRM,
      severity: "high",
    });

    tasks.push({
      id: "task-001",
      title: `Resolve CRM mismatch: ${onboardingCRM} vs ${discoveryCRM}`,
      assignedTo: "VP Engineering",
      relatedDiscrepancyId: id,
      status: "open",
    });
  }

  // Example 2 — Compare Approval Flow
  const onboardingApproval =
    companyProfile?.content.approvalFlows?.[0];

  const discoveryApproval =
    discoveryCall.structuredData.claimedApprovalFlow;

  if (onboardingApproval !== discoveryApproval) {
    const id = "disc-002";

    discrepancies.push({
      id,
      category: "Approval Flow Mismatch",
      field: "Approval Flow",
      onboardingValue: onboardingApproval,
      discoveryValue: discoveryApproval,
      severity: "medium",
    });

    tasks.push({
      id: "task-002",
      title: "Validate approval workflow change",
      assignedTo: "Compliance Officer",
      relatedDiscrepancyId: id,
      status: "open",
    });
  }

  return {
    discrepancies,
    tasks,
  };
}
