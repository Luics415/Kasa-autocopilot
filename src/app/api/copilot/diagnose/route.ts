import { NextRequest, NextResponse } from "next/server";
import { executeRagDiagnostic } from "@/lib/ragEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vehicleId, query, dtcCodes } = body;

    if (!vehicleId || !query) {
      return NextResponse.json(
        { error: "vehicleId y query son campos obligatorios" },
        { status: 400 }
      );
    }

    const result = await executeRagDiagnostic(vehicleId, query, dtcCodes || []);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Error en /api/copilot/diagnose:", err);
    return NextResponse.json(
      { error: "Error interno al ejecutar diagnóstico RAG", details: String(err) },
      { status: 500 }
    );
  }
}
