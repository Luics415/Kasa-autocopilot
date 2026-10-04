"use client";

import React from "react";
import { DiagnosticStep } from "@/lib/types";
import { CheckCircle2, Wrench, ArrowRight, Gauge, AlertCircle, MapPin } from "lucide-react";

interface StepByStepGuideProps {
  steps: DiagnosticStep[];
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 font-mono text-xs bg-surface-raised border border-surface-border rounded-xl">
        No hay pasos de diagnóstico generados para esta consulta.
      </div>
    );
  }

  return (
    <div className="bg-surface-raised border border-surface-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white tracking-tight uppercase font-mono">
            Procedimiento de Diagnóstico Guiado ({steps.length} Pasos)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Validado con Manual OEM
        </span>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="p-4 rounded-lg bg-surface-subtle border border-surface-border hover:border-slate-600 transition-colors"
          >
            {/* Step Header */}
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-mono font-bold text-xs flex items-center justify-center">
                {step.stepNumber}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-200 text-sm">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {step.procedure}
                </p>
              </div>
            </div>

            {/* Technical Sub-cards */}
            <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {/* Tool & Location */}
              <div className="p-2.5 rounded bg-surface-inset border border-surface-border/80 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Herramienta:</span>
                  <strong className="text-slate-200">{step.toolRequired}</strong>
                </div>
                {step.pinoutOrLocation && (
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pines / Ubicación:</span>
                    <strong className="text-slate-200">{step.pinoutOrLocation}</strong>
                  </div>
                )}
              </div>

              {/* Expected Value & Remediation */}
              <div className="p-2.5 rounded bg-surface-inset border border-surface-border/80 space-y-1">
                <div className="flex items-start gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">Valor Nominal: </span>
                    <span className="font-bold text-emerald-300">{step.expectedValue}</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">Si está fuera de rango: </span>
                    <span className="text-amber-200">{step.actionIfOutOfRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
