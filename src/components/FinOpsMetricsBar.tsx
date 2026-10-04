"use client";

import React from "react";
import { DiagnosticResponse } from "@/lib/types";
import { DollarSign, Clock, Zap, Cpu, TrendingUp, ShieldCheck } from "lucide-react";

interface FinOpsMetricsBarProps {
  result: DiagnosticResponse | null;
}

export const FinOpsMetricsBar: React.FC<FinOpsMetricsBarProps> = ({ result }) => {
  if (!result) return null;

  const { finops, bedrockModelUsed, mode } = result;

  return (
    <div className="bg-surface-raised border border-surface-border rounded-xl p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between pb-2.5 mb-3 border-b border-surface-border gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-xs uppercase font-mono tracking-wider text-slate-300">
            Telemetría FinOps & Retorno de Inversión (ROI)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>Modelo: <strong className="text-purple-300">{bedrockModelUsed}</strong></span>
          <span>·</span>
          <span className="text-emerald-400 font-bold">
            {mode === "LIVE_AWS_BEDROCK" ? "AWS Live" : "Local Verified Engine"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs font-mono">
        {/* Tokens Processed */}
        <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" /> Tokens Totales
          </div>
          <div className="text-sm font-bold text-white mt-1">
            {(finops.inputTokens + finops.outputTokens).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {finops.inputTokens} in / {finops.outputTokens} out
          </div>
        </div>

        {/* Latency */}
        <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" /> Latencia RAG
          </div>
          <div className="text-sm font-bold text-amber-300 mt-1">
            {finops.latencyMs} ms
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Vector + Generación
          </div>
        </div>

        {/* Bedrock Cost */}
        <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-purple-400" /> Costo Bedrock
          </div>
          <div className="text-sm font-bold text-purple-300 mt-1">
            ${finops.estimatedCostUsd.toFixed(4)} USD
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Por consulta
          </div>
        </div>

        {/* Labor Saved */}
        <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" /> Tiempo Ahorrado
          </div>
          <div className="text-sm font-bold text-emerald-300 mt-1">
            ~{Math.round(finops.hoursLaborSaved * 60)} min
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {finops.hoursLaborSaved} h de técnico
          </div>
        </div>

        {/* Misdiagnosis Dollars Avoided */}
        <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Ahorro Garantías
          </div>
          <div className="text-sm font-bold text-emerald-300 mt-1">
            ${finops.warrantyDollarsSaved.toFixed(0)} USD
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Piezas no cambiadas
          </div>
        </div>

        {/* Net ROI */}
        <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Multiplicador ROI
          </div>
          <div className="text-sm font-bold text-emerald-300 mt-1">
            {Math.round(finops.warrantyDollarsSaved / Math.max(finops.estimatedCostUsd, 0.0001)).toLocaleString()}x
          </div>
          <div className="text-[10px] text-emerald-400/80 mt-0.5">
            Retorno por centavo
          </div>
        </div>
      </div>
    </div>
  );
};
