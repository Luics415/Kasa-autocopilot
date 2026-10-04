"use client";

import React, { useState } from "react";
import { TorqueSpecification } from "@/lib/types";
import { Gauge, Info } from "lucide-react";

interface TorqueMatrixProps {
  torqueSpecs: TorqueSpecification[];
}

export const TorqueMatrix: React.FC<TorqueMatrixProps> = ({ torqueSpecs }) => {
  const [unitMode, setUnitMode] = useState<"ALL" | "NM" | "LBFT">("ALL");

  if (!torqueSpecs || torqueSpecs.length === 0) {
    return null;
  }

  return (
    <section className="bg-workshop-card border-2 border-workshop-border rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-workshop-border gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-mechanic-amber/20 text-mechanic-amber flex items-center justify-center border border-mechanic-amber/40">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight uppercase font-sans">
              Tabla de Pares de Apriete Oficiales (Torques OEM)
            </h3>
            <p className="text-xs text-slate-300">
              Evita barrer cuerdas en monoblock o deformar juntas de cabeza y tapas plásticas
            </p>
          </div>
        </div>

        {/* Conmutador de unidades */}
        <div className="flex items-center bg-workshop-dark p-1 rounded-xl border border-workshop-border text-xs font-mono">
          <button
            onClick={() => setUnitMode("ALL")}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              unitMode === "ALL" ? "bg-mechanic-amber text-black shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setUnitMode("NM")}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              unitMode === "NM" ? "bg-mechanic-amber text-black shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            N·m (Métrico)
          </button>
          <button
            onClick={() => setUnitMode("LBFT")}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              unitMode === "LBFT" ? "bg-mechanic-amber text-black shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            lb-ft (Inglés)
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-workshop-border">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b-2 border-workshop-border text-slate-300 bg-workshop-dark">
              <th className="py-3 px-4 font-bold">Componente o Tornillo</th>
              {(unitMode === "ALL" || unitMode === "NM") && (
                <th className="py-3 px-4 font-extrabold text-mechanic-amber text-sm">Torque (N·m)</th>
              )}
              {(unitMode === "ALL" || unitMode === "LBFT") && (
                <th className="py-3 px-4 font-extrabold text-turbo-cyan text-sm">Torque (lb-ft)</th>
              )}
              {unitMode === "ALL" && (
                <th className="py-3 px-4 font-bold text-slate-400">Torque (lb-in)</th>
              )}
              <th className="py-3 px-4 font-bold">Instrucciones de Secuencia y Montaje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-workshop-border/80 bg-workshop-card">
            {torqueSpecs.map((spec) => (
              <tr key={spec.id} className="hover:bg-workshop-cardHover/60 transition-colors">
                <td className="py-3 px-4 font-bold text-white text-sm">{spec.component}</td>
                {(unitMode === "ALL" || unitMode === "NM") && (
                  <td className="py-3 px-4 font-black text-amber-300 text-sm">{spec.torqueNm} N·m</td>
                )}
                {(unitMode === "ALL" || unitMode === "LBFT") && (
                  <td className="py-3 px-4 font-black text-turbo-cyan text-sm">{spec.torqueLbFt} lb-ft</td>
                )}
                {unitMode === "ALL" && (
                  <td className="py-3 px-4 text-slate-300 font-bold">
                    {spec.torqueLbIn ? `${spec.torqueLbIn} lb-in` : "—"}
                  </td>
                )}
                <td className="py-3 px-4 text-slate-300 text-xs leading-relaxed max-w-sm">
                  {spec.notes || "Apretar en cruz según secuencia OEM en roscas frías."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
