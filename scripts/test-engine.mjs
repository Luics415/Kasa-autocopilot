import assert from "node:assert";
import { executeRagDiagnostic } from "../src/lib/ragEngine.js";
import { calculateDiagnosticFinOps } from "../src/lib/finopsCalculator.js";

console.log("\n🚗 [TEST RUNNER] Kasa AutoCopilot Suite de Verificación (México · MXN)");
console.log("======================================================================");

async function runTests() {
  // Test 1: FinOps en Pesos Mexicanos (MXN)
  console.log("▶ Test 1: Verificando cálculo FinOps en Pesos Mexicanos ($ MXN)...");
  const finops = calculateDiagnosticFinOps(1000, 500, 420);
  assert(finops.estimatedCostMxn > 0, "Costo estimado en MXN debe ser mayor a 0");
  assert(finops.laborCostSavedMxn > 0, "Mano de obra ahorrada en MXN debe ser mayor a 0");
  assert(finops.totalSavingsMxn > 0, "Ahorro total en MXN debe ser mayor a 0");
  console.log(`  ✓ FinOps OK: Costo $${finops.estimatedCostMxn} MXN (~7 centavos), Ahorro $${finops.totalSavingsMxn} MXN`);

  // Test 2: Nissan Versa P0301 (Auto #1 de México)
  console.log("▶ Test 2: Verificando diagnóstico para Nissan Versa 1.6L (P0301)...");
  const versaResult = await executeRagDiagnostic("veh-nissan-versa", "Procedimiento para P0301", ["P0301"]);
  assert(versaResult.diagnosticSteps.length > 0, "Debe retornar pasos de diagnóstico");
  assert(versaResult.torqueSpecs.length > 0, "Debe retornar tabla de torques");
  assert(versaResult.sources.length > 0, "Debe citar manuales oficiales de Nissan");
  console.log(`  ✓ Pasos generados: ${versaResult.diagnosticSteps.length}`);
  console.log(`  ✓ Torques encontrados: ${versaResult.torqueSpecs.length} (ej. ${versaResult.torqueSpecs[0].component}: ${versaResult.torqueSpecs[0].torqueNm} N·m)`);

  // Test 3: Toyota Prius P0A80 Guardrail de Alto Voltaje (201.6V DC)
  console.log("▶ Test 3: Verificando Guardrail de Alto Voltaje en Toyota Prius Híbrido (P0A80)...");
  const priusResult = await executeRagDiagnostic("veh-toyota-prius", "Diagnóstico batería tracción P0A80", ["P0A80"]);
  assert(priusResult.safetyAlert !== undefined, "Debe activar alerta de seguridad crítica");
  assert(priusResult.safetyAlert.severity === "CRITICAL_HV", "Severidad debe ser CRITICAL_HV");
  assert(priusResult.safetyAlert.instructions.length >= 3, "Debe incluir instrucciones de seguridad");
  assert(priusResult.safetyAlert.ppeRequired.length >= 2, "Debe exigir EPP dieléctrico");
  console.log(`  ✓ Alerta disparada: "${priusResult.safetyAlert.title}"`);
  console.log(`  ✓ EPP Mandatorio: ${priusResult.safetyAlert.ppeRequired.join(", ")}`);

  console.log("\n======================================================================");
  console.log("✅ TODOS LOS TESTS PASARON EXITOSAMENTE EN MXN (3/3)\n");
}

runTests().catch((err) => {
  console.error("❌ Falló la prueba:", err);
  process.exit(1);
});
