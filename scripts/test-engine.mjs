import assert from "node:assert";
import { executeRagDiagnostic } from "../src/lib/ragEngine.js";
import { calculateDiagnosticFinOps } from "../src/lib/finopsCalculator.js";

console.log("\n🚗 [TEST RUNNER] Kasa AutoCopilot Verification Suite");
console.log("====================================================");

async function runTests() {
  // Test 1: FinOps Calculation
  console.log("▶ Test 1: Verificando cálculo FinOps y ROI...");
  const finops = calculateDiagnosticFinOps(1000, 500, 420);
  assert(finops.estimatedCostUsd > 0, "Costo estimado en USD debe ser mayor a 0");
  assert(finops.hoursLaborSaved > 0, "Horas ahorradas debe ser mayor a 0");
  assert(finops.warrantyDollarsSaved > 0, "Dólares de garantía evitados debe ser mayor a 0");
  console.log(`  ✓ FinOps OK: Costo $${finops.estimatedCostUsd} USD, ROI Ahorro $${finops.warrantyDollarsSaved} USD`);

  // Test 2: Ford F-150 P0301 Diagnostic Steps & Torques
  console.log("▶ Test 2: Verificando diagnóstico Powertrain Ford F-150 (P0301)...");
  const fordResult = await executeRagDiagnostic("veh-ford-f150", "Procedimiento para P0301", ["P0301"]);
  assert(fordResult.diagnosticSteps.length > 0, "Debe retornar pasos de diagnóstico");
  assert(fordResult.torqueSpecs.length > 0, "Debe retornar tabla de torques");
  assert(fordResult.sources.length > 0, "Debe citar manuales OEM");
  console.log(`  ✓ Pasos generados: ${fordResult.diagnosticSteps.length}`);
  console.log(`  ✓ Torques encontrados: ${fordResult.torqueSpecs.length} (ej. ${fordResult.torqueSpecs[0].component}: ${fordResult.torqueSpecs[0].torqueNm} Nm)`);

  // Test 3: Toyota Prius P0A80 High-Voltage Safety Guardrail
  console.log("▶ Test 3: Verificando Guardrail de Alto Voltaje Toyota Prius HEV (P0A80)...");
  const priusResult = await executeRagDiagnostic("veh-toyota-prius", "Diagnóstico batería tracción P0A80", ["P0A80"]);
  assert(priusResult.safetyAlert !== undefined, "Debe activar alerta de seguridad crítica");
  assert(priusResult.safetyAlert.severity === "CRITICAL_HV", "Severidad debe ser CRITICAL_HV");
  assert(priusResult.safetyAlert.instructions.length >= 3, "Debe incluir instrucciones de seguridad");
  assert(priusResult.safetyAlert.ppeRequired.length >= 2, "Debe exigir EPP dieléctrico");
  console.log(`  ✓ Alerta de seguridad disparada: "${priusResult.safetyAlert.title}"`);
  console.log(`  ✓ EPP Mandatorio: ${priusResult.safetyAlert.ppeRequired.join(", ")}`);

  console.log("\n====================================================");
  console.log("✅ TODOS LOS TESTS PASARON EXITOSAMENTE (3/3)\n");
}

runTests().catch((err) => {
  console.error("❌ Falló la prueba:", err);
  process.exit(1);
});
