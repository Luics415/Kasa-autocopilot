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
import {
  Wrench,
  Sparkles,
  BookOpen,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  HelpCircle,
  Clock,
  DollarSign
} from "lucide-react";

export default function Home() {
  const [vehicles] = useState<VehicleProfile[]>(SAMPLE_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleProfile>(SAMPLE_VEHICLES[0]);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [isManualsOpen, setIsManualsOpen] = useState<boolean>(false);

  // Carga inicial automática con el auto insignia de México: Nissan Versa (P0301)
  useEffect(() => {
    executeDiagnostic(
      "Presenta el procedimiento paso a paso para el código P0301 (Fallo en Cilindro 1 de Nissan Versa), prueba de bobina con multímetro, torques de bujía en N·m y advertencias de taller.",
      ["P0301"]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const executeDiagnostic = async (query: string, dtcs: string[]) => {
    setIsLoading(true);
    setLoadingStep("1. Buscando en el manual de agencia con Amazon Bedrock Knowledge Base...");

    const timer1 = setTimeout(() => {
      setLoadingStep("2. Validando guardrails de seguridad y advertencias eléctricas...");
    }, 280);

    const timer2 = setTimeout(() => {
      setLoadingStep("3. Claude 3.5 Sonnet razonando pruebas mecánicas y torques...");
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
      `Procedimiento guiado de taller para ${vehicle.make} ${vehicle.model} (${vehicle.engine}) ante el código ${vehicle.commonDTCs[0]}, valores normales de medición y pares de apriete en N·m.`,
      vehicle.commonDTCs
    );
  };

  return (
    <div className="min-h-screen bg-workshop-bg flex flex-col font-sans">
      {/* Cabecera */}
      <Header
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenManuals={() => setIsManualsOpen(true)}
        activeMode={diagnosticResult?.mode || "LOCAL_RAG_SIMULATION"}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* BANNER DE CLARIDAD INMEDIATA: ¿DE QUÉ TRATA EL PROYECTO? */}
        <section className="rounded-3xl p-6 sm:p-8 border-2 border-turbo-cyan/40 bg-gradient-to-br from-workshop-card via-workshop-cardHover to-workshop-dark shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-green-500/20 text-green-300 border border-green-500/40 flex items-center gap-1.5">
                  🇲🇽 PROYECTO CLOUD PARA TALLERES EN MÉXICO
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-turbo-blue/20 text-turbo-cyan border border-turbo-cyan/40">
                  AWS Bedrock + Claude 3.5 Sonnet + RAG
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                ¿Qué es Kasa AutoCopilot?
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                Es un <strong>asistente inteligente para mecánicos y talleres automotrices</strong>. En lugar de perder 40 minutos buscando en manuales de agencia de 4,000 páginas en PDF, el mecánico escoge el auto y el código de falla: la IA de <strong>AWS Bedrock</strong> le entrega en 3 segundos <strong>qué medir con el multímetro</strong>, los <strong>torques de apriete en N·m</strong> y <strong>alertas de alto voltaje</strong>.
              </p>

              {/* 3 Beneficios rápidos en viñetas destacadas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-workshop-dark/80 border border-workshop-border flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">TIEMPO EN MANUALES</span>
                    <strong className="text-white text-xs">De 45 min a 500 ms</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-workshop-dark/80 border border-workshop-border flex items-center gap-2.5">
                  <DollarSign className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">COSTO POR CONSULTA</span>
                    <strong className="text-green-300 text-xs">~$0.07 MXN (7 centavos)</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-workshop-dark/80 border border-workshop-border flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-turbo-cyan flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">CERO ALUCINACIONES</span>
                    <strong className="text-white text-xs">Citas con página OEM</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción del banner */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsPortfolioOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-bedrock-purple to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-extrabold text-sm shadow-xl shadow-purple-900/50 flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 border border-purple-400/50"
              >
                <Layers className="w-5 h-5" />
                <span>Ver Arquitectura AWS & ROI ($ MXN)</span>
              </button>

              <button
                onClick={() => setIsManualsOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-workshop-dark hover:bg-workshop-cardHover text-slate-200 hover:text-white font-bold text-sm transition-all border-2 border-workshop-border flex items-center justify-center gap-2.5"
              >
                <BookOpen className="w-5 h-5 text-turbo-cyan" />
                <span>Biblioteca de Manuales (142 OEM)</span>
              </button>
            </div>
          </div>
        </section>

        {/* 1. Paso 1: Selector de Vehículos en México */}
        <VehicleSelector
          vehicles={vehicles}
          selectedVehicleId={selectedVehicle.id}
          onSelectVehicle={handleSelectVehicle}
        />

        {/* 2. Paso 2 y 3: Consola de Diagnóstico de Taller */}
        <DiagnosticConsole
          selectedVehicle={selectedVehicle}
          onExecuteDiagnostic={executeDiagnostic}
          isLoading={isLoading}
          loadingStep={loadingStep}
        />

        {/* 3. Métricas Financieras y Ahorro en Pesos Mexicanos */}
        <FinOpsMetricsBar result={diagnosticResult} />

        {/* 4. Resultados Técnicos del Copiloto */}
        {diagnosticResult && (
          <div className="space-y-6">
            {/* Alerta de Alto Voltaje (Híbridos / Eléctricos) */}
            {diagnosticResult.safetyAlert && (
              <SafetyAlertBanner alert={diagnosticResult.safetyAlert} />
            )}

            {/* Pasos de Diagnóstico Guiados */}
            <StepByStepGuide steps={diagnosticResult.diagnosticSteps} />

            {/* Matriz de Pares de Apriete (Torques en N·m) */}
            {diagnosticResult.torqueSpecs && diagnosticResult.torqueSpecs.length > 0 && (
              <TorqueMatrix torqueSpecs={diagnosticResult.torqueSpecs} />
            )}

            {/* Citas Verificadas del Manual Oficial de Taller */}
            {diagnosticResult.sources && diagnosticResult.sources.length > 0 && (
              <CitationsList sources={diagnosticResult.sources} />
            )}
          </div>
        )}
      </main>

      {/* Pie de Página */}
      <footer className="border-t-2 border-workshop-border bg-workshop-card py-6 px-6 mt-16 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Kasa AutoCopilot · Inteligencia Artificial Generativa Automotriz en AWS Bedrock</span>
          <span className="text-green-400 font-bold">🇲🇽 Diseñado con precios y costos en Pesos Mexicanos (MXN)</span>
          <span>Licencia MIT · 2026</span>
        </div>
      </footer>

      {/* Modales */}
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
