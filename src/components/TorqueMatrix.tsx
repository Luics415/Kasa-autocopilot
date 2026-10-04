"use client";

import React, { useState } from "react";
import { TorqueSpecification } from "@/lib/types";
import { Gauge, Info, Check, ShieldAlert } from "lucide-react";

interface TorqueMatrixProps {
  torqueSpecs: TorqueSpecification[];
}

export const TorqueMatrix: React.FC<TorqueMatrixProps> = ({ torqueSpecs }) => {
  const [unitMode, setUnitMode] = useState<"ALL" | "NM" | "LBFT">("ALL");

  if (!torqueSpecs || torqueSpecs.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface-raised border border-surface-border rounded-xl p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-surface-border gap-2">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm text-white tracking-tight uppercase font-mono">
            Tabla de Pares de Apriete (Torques OEM)
          </h3>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center bg-surface-subtle p-0.5 rounded-lg border border-surface-border text-xs font-mono">
          <button
            onClick={() => setUnitMode("ALL")}
            className={`px-2 py-0.5 rounded ${
              unitMode === "ALL" ? "bg-amber-500 text-black font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setUnitMode("NM")}
            className={`px-2 py-0.5 rounded ${
              unitMode === "NM" ? "bg-amber-500 text-black font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            N·m
          </button>
          <button
            onClick={() => setUnitMode("LBFT")}
            className={`px-2 py-0.5 rounded ${
              unitMode === "LBFT" ? "bg-amber-500 text-black font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            lb-ft
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-surface-border text-slate-400 bg-surface-subtle/50">
              <th className="py-2.5 px-3 font-semibold">Componente / Sujeción</th>
              {(unitMode === "ALL" || unitMode === "NM") && (
                <th className="py-2.5 px-3 font-semibold text-amber-300">Torque (N·m)</th>
              )}
              {(unitMode === "ALL" || unitMode === "LBFT") && (
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Torque (lb-ft)</th>
              )}
              {unitMode === "ALL" && (
                <th className="py-2.5 px-3 font-semibold text-slate-400">Torque (lb-in)</th>
              )}
              <th className="py-2.5 px-3 font-semibold">Notas de Montaje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/60">
            {torqueSpecs.map((spec) => (
              <tr key={spec.id} className="hover:bg-surface-hover/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200">{spec.component}</td>
                {(unitMode === "ALL" || unitMode === "NM") && (
                  <td className="py-2.5 px-3 font-bold text-amber-300">{spec.torqueNm} N·m</td>
                )}
                {(unitMode === "ALL" || unitMode === "LBFT") && (
                  <td className="py-2.5 px-3 font-bold text-cyan-300">{spec.torqueLbFt} lb-ft</td>
                )}
                {unitMode === "ALL" && (
                  <td className="py-2.5 px-3 text-slate-400">
                    {spec.torqueLbIn ? `${spec.torqueLbIn} lb-in` : "—"}
                  </td>
                )}
                <td className="py-2.5 px-3 text-slate-400 text-[11px] leading-tight max-w-xs">
                  {spec.notes || "Apretar en cruz según secuencia OEM."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
