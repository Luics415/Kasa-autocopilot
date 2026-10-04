"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { VehicleSelector } from "@/components/VehicleSelector";
import { DiagnosticConsole } from "@/components/DiagnosticConsole";
import { SafetyAlertBanner } from "@/components/SafetyAlertBanner";
import { StepByStepGuide } from "@/components/StepByStepGuide";
import { TorqueMatrix } from "@/components/TorqueMatrix";
import { CitationsList } from "@/components/CitationsList";
import { FinOpsMetricsBar } from "@/components/FinOpsMetricsBar";
import { PortfolioModal } from "@/components/PortfolioModal";
import { ManualViewerModal } from "@/components/ManualViewerModal";
import { SAMPLE_VEHICLES } from "@/lib/mockKnowledgeBase";
import { VehicleProfile, DiagnosticResponse } from "@/lib/types";
import { Layers, Sparkles, BookOpen, AlertCircle, Wrench, ShieldCheck, Cpu } from "lucide-react";

export default function Home() {
  const [vehicles] = useState<VehicleProfile[]>(SAMPLE_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleProfile>(SAMPLE_VEHICLES[0]);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [isManualsOpen, setIsManualsOpen] = useState<boolean>(false);

  // Automatically run an initial diagnostic for the first vehicle on mount
  useEffect(() => {
    executeDiagnostic(
      "Presenta el procedimiento de diagnóstico guiado para el código P0301 (Fallo de encendido Cilindro 1), torques de bujía y advertencias de seguridad.",
      ["P0301"]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const executeDiagnostic = async (query: string, dtcs: string[]) => {
    setIsLoading(true);
    setLoadingStep("1. Búsqueda vectorial en Amazon Bedrock Knowledge Base...");

    // Staged progress indicators for visual realism
    const timer1 = setTimeout(() => {
      setLoadingStep("2. Aplicando Bedrock Guardrails automotrices y filtros de seguridad...");
    }, 280);

    const timer2 = setTimeout(() => {
      setLoadingStep("3. Razonando con Anthropic Claude 3.5 Sonnet en Bedrock...");
    }, 560);

    try {
      const res = await fetch("/api/copilot/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: selectedVehicle.id,
          query,
          dtcCodes: dtcs
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: DiagnosticResponse = await res.json();
      setDiagnosticResult(data);
    } catch (err) {
      console.error("Error al ejecutar diagnóstico:", err);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handleSelectVehicle = (vehicle: VehicleProfile) => {
    setSelectedVehicle(vehicle);
    executeDiagnostic(
      `Presenta el árbol de diagnóstico para el código primario ${vehicle.commonDTCs[0]}, pares de apriete y precauciones técnicas.`,
      vehicle.commonDTCs
    );
  };

  return (
    <div className="min-h-screen bg-ground flex flex-col">
      {/* Header */}
      <Header
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenManuals={() => setIsManualsOpen(true)}
        activeMode={diagnosticResult?.mode || "LOCAL_RAG_SIMULATION"}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Portfolio Showcase Hero Banner */}
        <section className="rounded-2xl p-5 border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-surface-subtle to-cyan-950/30 relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-purple-300 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-bedrock-light" />
                  Showcase de Portafolio Técnico
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  AWS Certified Architecture
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Copiloto de Taller Mecánico con IA Generativa
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Asistente de diagnóstico automotriz de grado industrial. Combina <strong>Amazon Bedrock (Claude 3.5 Sonnet)</strong> con <strong>RAG</strong> sobre manuales OEM indexados en <strong>OpenSearch Serverless</strong>. Cero alucinaciones, advertencias críticas de alto voltaje y cálculo de ahorro FinOps en tiempo real.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2 flex-shrink-0">
              <button
                onClick={() => setIsPortfolioOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-bedrock hover:bg-bedrock-light text-white text-xs font-mono font-bold shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Layers className="w-4 h-4" />
                <span>Explorar Arquitectura AWS</span>
              </button>
              <button
                onClick={() => setIsManualsOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-surface-raised hover:bg-surface-hover border border-surface-border text-slate-200 text-xs font-mono font-medium flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Manuales OEM</span>
              </button>
            </div>
          </div>
        </section>

        {/* 1. Vehicle Selection Carousel */}
        <VehicleSelector
          vehicles={vehicles}
          selectedVehicleId={selectedVehicle.id}
          onSelectVehicle={handleSelectVehicle}
        />

        {/* 2. Diagnostic Console */}
        <DiagnosticConsole
          selectedVehicle={selectedVehicle}
          onExecuteDiagnostic={executeDiagnostic}
          isLoading={isLoading}
          loadingStep={loadingStep}
        />

        {/* 3. FinOps & ROI Telemetry */}
        <FinOpsMetricsBar result={diagnosticResult} />

        {/* 4. Results Section */}
        {diagnosticResult && (
          <div className="space-y-5">
            {/* Safety Warning (High Voltage or SRS) */}
            {diagnosticResult.safetyAlert && (
              <SafetyAlertBanner alert={diagnosticResult.safetyAlert} />
            )}

            {/* Diagnostic Steps */}
            <StepByStepGuide steps={diagnosticResult.diagnosticSteps} />

            {/* Torque Matrix */}
            {diagnosticResult.torqueSpecs && diagnosticResult.torqueSpecs.length > 0 && (
              <TorqueMatrix torqueSpecs={diagnosticResult.torqueSpecs} />
            )}

            {/* Citations List */}
            {diagnosticResult.sources && diagnosticResult.sources.length > 0 && (
              <CitationsList sources={diagnosticResult.sources} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-surface-subtle/60 py-4 px-6 mt-12 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Kasa AutoCopilot · Amazon Bedrock & RAG Automotive Intelligence</span>
          <span>Desarrollado para portafolio de arquitectura cloud e IA generativa · MIT License</span>
        </div>
      </footer>

      {/* Modals */}
      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
      />

      <ManualViewerModal
        isOpen={isManualsOpen}
        onClose={() => setIsManualsOpen(false)}
      />
    </div>
  );
}
