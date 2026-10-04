"use client";

import React from "react";
import { DiagnosticResponse } from "@/lib/types";
import { DollarSign, Clock, Cpu, TrendingUp, ShieldCheck, Zap } from "lucide-react";

interface FinOpsMetricsBarProps {
  result: DiagnosticResponse | null;
}

export const FinOpsMetricsBar: React.FC<FinOpsMetricsBarProps> = ({ result }) => {
  if (!result) return null;

  const { finops, bedrockModelUsed, mode } = result;

  return (
    <section className="bg-gradient-to-r from-workshop-card via-workshop-cardHover to-workshop-card border-2 border-green-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-workshop-border gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-green-500/20 text-green-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white tracking-wide uppercase font-sans">
              Impacto Financiero y Ahorro en el Taller (En Pesos Mexicanos · MXN)
            </h3>
            <p className="text-xs text-slate-300">
              Comparativa real: Costo de inferencia en AWS Bedrock vs. Horas de mecánico y refacciones salvadas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 font-bold border border-green-500/40">
            🇲🇽 Moneda: Pesos Mexicanos (MXN)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
        {/* Costo Bedrock en Pesos */}
        <div className="p-3 rounded-xl bg-workshop-dark border-2 border-purple-500/40">
          <div className="text-[11px] text-purple-300 font-bold flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> Costo Consulta IA
          </div>
          <div className="text-lg font-extrabold text-white mt-1">
            ${finops.estimatedCostMxn.toFixed(2)} <span className="text-xs text-purple-300">MXN</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            ~7 centavos de peso
          </div>
        </div>

        {/* Tokens & Latencia */}
        <div className="p-3 rounded-xl bg-workshop-dark border border-workshop-border">
          <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-turbo-cyan" /> Latencia RAG
          </div>
          <div className="text-lg font-extrabold text-turbo-cyan mt-1">
            {finops.latencyMs} ms
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {(finops.inputTokens + finops.outputTokens).toLocaleString()} tokens procesados
          </div>
        </div>

        {/* Tiempo ahorrado en manual */}
        <div className="p-3 rounded-xl bg-workshop-dark border border-workshop-border">
          <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Tiempo Ahorrado
          </div>
          <div className="text-lg font-extrabold text-amber-300 mt-1">
            ~39 min
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            vs. 45 min en PDF manual
          </div>
        </div>

        {/* Valor de mano de obra en MXN */}
        <div className="p-3 rounded-xl bg-workshop-dark border-2 border-green-500/30">
          <div className="text-[11px] text-green-400 font-bold flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> Mano de Obra
          </div>
          <div className="text-lg font-extrabold text-green-300 mt-1">
            +${finops.laborCostSavedMxn.toFixed(2)} <span className="text-xs">MXN</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Técnico a $850 MXN/hora
          </div>
        </div>

        {/* Refacción cambiada por error evitada */}
        <div className="p-3 rounded-xl bg-workshop-dark border-2 border-green-500/30">
          <div className="text-[11px] text-green-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Refacción Evitada
          </div>
          <div className="text-lg font-extrabold text-green-300 mt-1">
            +${finops.partsLossAvoidedMxn.toLocaleString()} <span className="text-xs">MXN</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Sensor o bobina innecesaria
          </div>
        </div>

        {/* Ahorro Total Neto */}
        <div className="p-3 rounded-xl bg-green-950/40 border-2 border-green-400 shadow-lg">
          <div className="text-[11px] text-green-300 font-extrabold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Beneficio Total
          </div>
          <div className="text-lg font-extrabold text-green-300 mt-1">
            ${finops.totalSavingsMxn.toLocaleString()} <span className="text-xs">MXN</span>
          </div>
          <div className="text-[10px] text-green-400 font-bold mt-0.5">
            ROI: &gt;90,000x por consulta
          </div>
        </div>
      </div>
    </section>
  );
};
