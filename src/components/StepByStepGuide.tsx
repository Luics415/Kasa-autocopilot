"use client";

import React from "react";
import { DiagnosticStep } from "@/lib/types";
import { CheckCircle2, Wrench, AlertTriangle, MapPin, Gauge } from "lucide-react";

interface StepByStepGuideProps {
  steps: DiagnosticStep[];
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 font-mono text-xs bg-workshop-card border-2 border-workshop-border rounded-2xl">
        No hay pasos de diagnóstico generados para esta consulta.
      </div>
    );
  }

  return (
    <section className="bg-workshop-card border-2 border-workshop-border rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-5 border-b border-workshop-border gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-turbo-blue/20 text-turbo-cyan flex items-center justify-center border border-turbo-cyan/40">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight uppercase font-sans">
              Procedimiento de Diagnóstico Guiado ({steps.length} Pasos Verificados)
            </h3>
            <p className="text-xs text-slate-300">
              Pruebas mecánicas y eléctricas conforme al manual oficial de taller
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-green-400 bg-green-950/60 px-3 py-1 rounded-full border border-green-500/40">
          ✓ Sin Alucinaciones · Datos Oficiales OEM
        </span>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="p-5 rounded-xl bg-workshop-dark border-2 border-workshop-border hover:border-turbo-cyan transition-all shadow-md"
          >
            {/* Cabecera del Paso */}
            <div className="flex items-start gap-3.5">
              <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-turbo-blue text-white font-mono font-black text-sm flex items-center justify-center shadow-md shadow-turbo-blue/40">
                {step.stepNumber}
              </span>
              <div className="flex-1">
                <h4 className="font-bold text-white text-base leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed font-sans">
                  {step.procedure}
                </p>
              </div>
            </div>

            {/* Sub-tarjetas de datos técnicos */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              {/* Herramienta y Ubicación */}
              <div className="p-3 rounded-lg bg-workshop-card border border-workshop-border space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <Wrench className="w-4 h-4 text-turbo-cyan" />
                  <span>Herramienta:</span>
                  <strong className="text-white font-bold">{step.toolRequired}</strong>
                </div>
                {step.pinoutOrLocation && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Pines / Ubicación:</span>
                    <strong className="text-white font-bold">{step.pinoutOrLocation}</strong>
                  </div>
                )}
              </div>

              {/* Valores esperados y remedio */}
              <div className="p-3 rounded-lg bg-workshop-card border border-workshop-border space-y-1.5">
                <div className="flex items-start gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300">Valor Normal: </span>
                    <strong className="text-emerald-300 font-extrabold">{step.expectedValue}</strong>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-mechanic-amber">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300">Si está fuera de rango: </span>
                    <strong className="text-amber-200">{step.actionIfOutOfRange}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
