"use client";

import React from "react";
import { SafetyWarning } from "@/lib/types";
import { AlertOctagon, ShieldAlert, Zap } from "lucide-react";

interface SafetyAlertBannerProps {
  alert: SafetyWarning;
}

export const SafetyAlertBanner: React.FC<SafetyAlertBannerProps> = ({ alert }) => {
  const isHighVoltage = alert.severity === "CRITICAL_HV";

  return (
    <div
      className={`rounded-2xl border-4 p-5 mb-5 shadow-2xl relative overflow-hidden transition-all ${
        isHighVoltage
          ? "bg-amber-950/40 border-amber-500 text-amber-100 shadow-amber-950/60"
          : "bg-red-950/40 border-red-500 text-red-100 shadow-red-950/60"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div
          className={`p-3.5 rounded-2xl flex-shrink-0 shadow-lg ${
            isHighVoltage
              ? "bg-amber-500 text-black animate-pulse"
              : "bg-red-500 text-white"
          }`}
        >
          {isHighVoltage ? (
            <Zap className="w-8 h-8 font-extrabold" />
          ) : (
            <AlertOctagon className="w-8 h-8 font-extrabold" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono px-2.5 py-1 rounded font-extrabold uppercase tracking-wider bg-black/60 text-amber-300 border-2 border-amber-400">
              ⚡ PROTOCOLO MANDATORIO DE SEGURIDAD (AWS BEDROCK GUARDRAIL)
            </span>
            <span className="text-xs font-bold text-amber-200">
              Riesgo de Electrocución / Tensión Superior a 60V DC
            </span>
          </div>

          <h3 className="text-lg font-extrabold mt-1.5 text-white tracking-tight">
            {alert.title}
          </h3>

          {/* Lista de instrucciones numeradas */}
          <div className="mt-3.5 space-y-2">
            {alert.instructions.map((inst, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-amber-100 font-mono bg-black/30 p-2.5 rounded-lg border border-amber-500/30">
                <span className="text-amber-400 font-black text-sm">[{idx + 1}]</span>
                <span className="leading-relaxed font-semibold">{inst}</span>
              </div>
            ))}
          </div>

          {/* EPP Requerido */}
          {alert.ppeRequired && alert.ppeRequired.length > 0 && (
            <div className="mt-4 pt-3 border-t-2 border-amber-500/40 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1 font-mono">
                <ShieldAlert className="w-4 h-4" /> Equipo de Protección Personal (EPP) Obligatorio:
              </span>
              {alert.ppeRequired.map((ppe, i) => (
                <span
                  key={i}
                  className="text-xs font-bold font-mono bg-amber-400 text-black px-2.5 py-1 rounded-md shadow-sm"
                >
                  ✓ {ppe}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
