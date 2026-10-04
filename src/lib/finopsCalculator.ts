export interface TokenMetrics {
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
  latencyMs: number;
  hoursLaborSaved: number;
  warrantyDollarsSaved: number;
}

// Pricing based on AWS Bedrock Anthropic Claude 3.5 Sonnet
const PRICE_PER_1K_INPUT = 0.003;
const PRICE_PER_1K_OUTPUT = 0.015;
const KNOWLEDGE_BASE_RETRIEVAL_FEE = 0.0005; // OpenSearch Serverless vector search

// Workshop operational assumptions
const TECHNICIAN_HOURLY_RATE_USD = 95.0; // Typical dealership master technician rate
const AVG_HOURS_SAVED_PER_DIAGNOSTIC = 0.65; // ~39 minutes saved researching manuals
const AVG_MISDIAGNOSIS_COST_AVOIDED = 320.0; // Cost of unnecessary part swapped by mistake

export function calculateDiagnosticFinOps(
  inputTokens: number,
  outputTokens: number,
  latencyMs: number
): TokenMetrics {
  const inputCost = (inputTokens / 1000) * PRICE_PER_1K_INPUT;
  const outputCost = (outputTokens / 1000) * PRICE_PER_1K_OUTPUT;
  const totalCost = Number((inputCost + outputCost + KNOWLEDGE_BASE_RETRIEVAL_FEE).toFixed(6));

  const hoursLaborSaved = AVG_HOURS_SAVED_PER_DIAGNOSTIC;
  const laborDollarValue = hoursLaborSaved * TECHNICIAN_HOURLY_RATE_USD;
  const warrantyDollarsSaved = Number((laborDollarValue + AVG_MISDIAGNOSIS_COST_AVOIDED).toFixed(2));

  return {
    inputTokens,
    outputTokens,
    estimatedCostUsd: totalCost,
    latencyMs,
    hoursLaborSaved,
    warrantyDollarsSaved
  };
}
