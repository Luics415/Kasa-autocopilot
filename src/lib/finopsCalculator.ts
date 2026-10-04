export interface FinOpsMetricsMxn {
  inputTokens: number;
  outputTokens: number;
  estimatedCostMxn: number;
  latencyMs: number;
  hoursLaborSaved: number;
  laborCostSavedMxn: number;
  partsLossAvoidedMxn: number;
  totalSavingsMxn: number;
}

// Tipo de cambio base: 1 USD = 20.00 MXN
const USD_TO_MXN = 20.0;

// Precios de AWS Bedrock (Anthropic Claude 3.5 Sonnet) convertidos a Pesos Mexicanos (MXN)
const PRICE_PER_1K_INPUT_MXN = (0.003 * USD_TO_MXN); // $0.06 MXN por cada 1,000 tokens de entrada
const PRICE_PER_1K_OUTPUT_MXN = (0.015 * USD_TO_MXN); // $0.30 MXN por cada 1,000 tokens de salida
const KB_RETRIEVAL_FEE_MXN = (0.0005 * USD_TO_MXN); // ~$0.01 MXN por búsqueda vectorial en OpenSearch

// Parámetros de mercado automotriz en México (Talleres particulares calificados y agencias)
const TARIFA_HORA_TECNICO_MXN = 850.0; // Tarifa promedio por hora en taller/agencia mexicana ($850 MXN/h)
const HORAS_AHORRADAS_PROMEDIO = 0.65; // ~39 minutos ahorrados buscando en manuales de 4,000 páginas
const COSTO_REFACCION_EVITADA_MXN = 5800.0; // Costo promedio de pieza cambiada por error (ej. sensor O2, bobina o catalizador de agencia)

export function calculateDiagnosticFinOps(
  inputTokens: number,
  outputTokens: number,
  latencyMs: number
): FinOpsMetricsMxn {
  const inputCost = (inputTokens / 1000) * PRICE_PER_1K_INPUT_MXN;
  const outputCost = (outputTokens / 1000) * PRICE_PER_1K_OUTPUT_MXN;
  const totalCostMxn = Number((inputCost + outputCost + KB_RETRIEVAL_FEE_MXN).toFixed(4));

  const laborCostSavedMxn = Number((HORAS_AHORRADAS_PROMEDIO * TARIFA_HORA_TECNICO_MXN).toFixed(2));
  const partsLossAvoidedMxn = COSTO_REFACCION_EVITADA_MXN;
  const totalSavingsMxn = Number((laborCostSavedMxn + partsLossAvoidedMxn).toFixed(2));

  return {
    inputTokens,
    outputTokens,
    estimatedCostMxn: totalCostMxn,
    latencyMs,
    hoursLaborSaved: HORAS_AHORRADAS_PROMEDIO,
    laborCostSavedMxn,
    partsLossAvoidedMxn,
    totalSavingsMxn
  };
}
