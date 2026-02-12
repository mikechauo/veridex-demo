export interface Discrepancy {
  id: string;
  category: string;
  expected: string | undefined;
  actual: string | undefined;
  severity: "low" | "medium" | "high";
}

export interface Task {
  id: string;
  owner: string;
  action: string;
  priority: "low" | "medium" | "high";
}

export interface RiskResult {
  discrepancies: Discrepancy[];
  tasks: Task[];
  riskScore: number;
  riskLevel: "Aligned" | "Low" | "Moderate" | "High";
}

const severityWeights = {
  low: 1,
  medium: 3,
  high: 5,
};

function calculateRiskScore(discrepancies: Discrepancy[]) {
  return discrepancies.reduce((total, d) => {
    return total + severityWeights[d.severity];
  }, 0);
}

function classifyRisk(score: number) {
  if (score === 0) return "Aligned";
  if (score <= 3) return "Low";
  if (score <= 6) return "Moderate";
  return "High";
}

export function compareData(
  onboardingData: any,
  discoveryCall: any
): RiskResult {
  const discrepancies: Discrepancy[] = [];
  const tasks: Task[] = [];

  // --- Compare CRM ---
  const onboardingCRM = onboardingData.company.systems.crm;
  const discoveryCRM = discoveryCall.structured.claimedCRM;

  if (onboardingCRM !== discoveryCRM) {
    discrepancies.push({
      id: "1",
      category: "CRM Mismatch",
      expected: onboardingCRM,
      actual: discoveryCRM,
      severity: "high",
    });

    tasks.push({
      id: "1",
      owner: "Sales Engineer",
      action: "Clarify CRM system with client",
      priority: "high",
    });
  }

  // --- Compare Approval Flow ---
  const onboardingApproval = onboardingData.approvalFlow;
  const discoveryApproval =
    discoveryCall.structured.claimedApprovalFlow;

  if (onboardingApproval !== discoveryApproval) {
    discrepancies.push({
      id: "2",
      category: "Approval Flow Mismatch",
      expected: onboardingApproval,
      actual: discoveryApproval,
      severity: "medium",
    });

    tasks.push({
      id: "2",
      owner: "Compliance",
      action: "Validate approval process",
      priority: "medium",
    });
  }

  const riskScore = calculateRiskScore(discrepancies);
  const riskLevel = classifyRisk(riskScore);

  return {
    discrepancies,
    tasks,
    riskScore,
    riskLevel,
  };
}
