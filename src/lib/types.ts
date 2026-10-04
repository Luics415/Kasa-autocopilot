export type VehicleSystem =
  | "POWERTRAIN"
  | "ELECTRICAL_HV"
  | "BRAKES_ABS"
  | "TRANSMISSION"
  | "STEERING_SUSPENSION"
  | "EMISSIONS"
  | "BODY_SRS";

export interface VehicleProfile {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  engine: string;
  powertrainType: "GASOLINA" | "HIBRIDO" | "ELECTRICO" | "DIESEL";
  mileageKm: number;
  workshopBay: string;
  commonDTCs: string[];
  imageUrl?: string;
  popularInMexico?: boolean;
}

export interface DiagnosticStep {
  stepNumber: number;
  title: string;
  procedure: string;
  toolRequired: string;
  pinoutOrLocation?: string;
  expectedValue: string;
  actionIfOutOfRange: string;
}

export interface TorqueSpecification {
  id: string;
  component: string;
  torqueNm: number;
  torqueLbFt: number;
  torqueLbIn?: number;
  sequenceStep?: string;
  notes?: string;
}

export interface ManualSourceCitation {
  id: string;
  documentTitle: string;
  oemCode: string;
  section: string;
  pageNumber: number;
  system: VehicleSystem;
  snippet: string;
  relevanceScore: number;
}

export interface SafetyWarning {
  severity: "CRITICAL_HV" | "HIGH_PRESSURE" | "SRS_AIRBAG" | "HAZARD_MECHANICAL";
  title: string;
  instructions: string[];
  ppeRequired: string[];
}

export interface DiagnosticResponse {
  queryId: string;
  vehicle: VehicleProfile;
  dtcCodes: string[];
  symptomSummary: string;
  safetyAlert?: SafetyWarning;
  diagnosticSteps: DiagnosticStep[];
  torqueSpecs: TorqueSpecification[];
  fluidSpecs?: {
    fluidType: string;
    specification: string;
    capacityLiters: number;
  }[];
  sources: ManualSourceCitation[];
  finops: {
    inputTokens: number;
    outputTokens: number;
    estimatedCostMxn: number;
    latencyMs: number;
    hoursLaborSaved: number;
    laborCostSavedMxn: number;
    partsLossAvoidedMxn: number;
    totalSavingsMxn: number;
  };
  bedrockModelUsed: string;
  mode: "LIVE_AWS_BEDROCK" | "LOCAL_RAG_SIMULATION";
}

export interface FinOpsSummary {
  totalQueries: number;
  totalTokensProcessed: number;
  accumulatedCostMxn: number;
  accumulatedHoursSaved: number;
  accumulatedSavingsMxn: number;
  avgLatencyMs: number;
}
