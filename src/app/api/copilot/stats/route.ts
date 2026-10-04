import { NextResponse } from "next/server";
import { SAMPLE_VEHICLES } from "@/lib/mockKnowledgeBase";

export async function GET() {
  return NextResponse.json({
    activeVehiclesInShop: SAMPLE_VEHICLES.length,
    totalManualsIndexed: 142,
    indexedPagesCount: 184500,
    averageRetrievalLatencyMs: 340,
    finopsSummary: {
      totalQueriesProcessed: 1248,
      totalHoursSaved: 811.2,
      totalWarrantyAvoidedUsd: 399360.0,
      totalBedrockSpendUsd: 22.84,
      netRoiMultiplier: "17,485x"
    },
    supportedOems: ["Ford", "Toyota", "Chevrolet", "Tesla", "Volkswagen", "Honda", "Nissan", "BMW"]
  });
}
