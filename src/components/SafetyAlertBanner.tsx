"use client";

import React from "react";
import { SafetyWarning } from "@/lib/types";
import { AlertOctagon, ShieldAlert, CheckSquare, Zap } from "lucide-react";

interface SafetyAlertBannerProps {
  alert: SafetyWarning;
}

export const SafetyAlertBanner: React.FC<SafetyAlertBannerProps> = ({ alert }) => {
  const isHighVoltage = alert.severity === "CRITICAL_HV";

  return (
    <div
      className={`rounded-xl border p-4.5 mb-5 shadow-lg relative overflow-hidden transition-all ${
        isHighVoltage
          ? "bg-amber-950/30 border-amber-500/70 text-amber-200 shadow-amber-950/40"
          : "bg-red-950/30 border-red-500/70 text-red-200 shadow-red-950/40"
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`p-2.5 rounded-lg flex-shrink-0 ${
            isHighVoltage ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"
          }`}
        >
          {isHighVoltage ? (
            <Zap className="w-6 h-6 animate-pulse" />
          ) : (
            <AlertOctagon className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Protocolo de Seguridad Mandatorio (AWS Bedrock Guardrail)
            </span>
          </div>

          <h3 className="text-base font-bold mt-1 text-white tracking-tight">
            {alert.title}
          </h3>

          {/* Instructions List */}
          <div className="mt-3 space-y-1.5">
            {alert.instructions.map((inst, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-amber-100/90 font-mono">
                <span className="text-amber-400 font-bold mt-0.5">[{idx + 1}]</span>
                <span>{inst}</span>
              </div>
            ))}
          </div>

          {/* PPE Required Checklist */}
          {alert.ppeRequired && alert.ppeRequired.length > 0 && (
            <div className="mt-3 pt-3 border-t border-amber-500/30 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> EPP Obligatorio:
              </span>
              {alert.ppeRequired.map((ppe, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono bg-black/40 px-2 py-0.5 rounded border border-amber-500/30 text-amber-200"
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
