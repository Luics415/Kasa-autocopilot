"use client";

import React, { useState } from "react";
import { VehicleProfile } from "@/lib/types";
import { Wrench, Sparkles, Send, Loader2, Gauge, FileSearch, Zap, AlertTriangle } from "lucide-react";

interface DiagnosticConsoleProps {
  selectedVehicle: VehicleProfile;
  onExecuteDiagnostic: (query: string, dtcs: string[]) => void;
  isLoading: boolean;
  loadingStep: string;
}

export const DiagnosticConsole: React.FC<DiagnosticConsoleProps> = ({
  selectedVehicle,
  onExecuteDiagnostic,
  isLoading,
  loadingStep
}) => {
  const [selectedDtc, setSelectedDtc] = useState<string>(selectedVehicle.commonDTCs[0] || "P0301");
  const [customQuery, setCustomQuery] = useState<string>(
    `Dame el procedimiento paso a paso para diagnosticar el código ${selectedVehicle.commonDTCs[0] || "P0301"}, qué valores medir con el multímetro, los pares de apriete en N·m y las advertencias de seguridad de agencia.`
  );

  const handleDtcChange = (dtc: string) => {
    setSelectedDtc(dtc);
    setCustomQuery(
      `Dame el procedimiento paso a paso para diagnosticar el código ${dtc}, qué valores medir con el multímetro, los pares de apriete en N·m y las advertencias de seguridad de agencia.`
    );
  };

  const handlePreset = (type: "PASOS" | "TORQUES" | "PINES") => {
    if (type === "PASOS") {
      setCustomQuery(
        `Procedimiento guiado de diagnóstico para ${selectedDtc} con valores de resistencia en Ohms y voltajes nominales de sensor.`
      );
    } else if (type === "TORQUES") {
      setCustomQuery(
        `Tabla de pares de apriete (Torques exactos en N·m y lb-ft) para todos los tornillos, bujías o componentes desmontados para solucionar ${selectedDtc}.`
      );
    } else {
      setCustomQuery(
        `Diagrama de pines (pinout), voltajes de referencia de 5V/12V y tierras de computadora para sensores involucrados en ${selectedDtc}.`
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim() || isLoading) return;
    onExecuteDiagnostic(customQuery, selectedDtc ? [selectedDtc] : []);
  };

  return (
    <section className="bg-workshop-card border-2 border-workshop-border rounded-2xl p-5 shadow-xl relative overflow-hidden">
      {/* Barra de paso y vehículo activo */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 mb-4 border-b border-workshop-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turbo-blue text-white font-extrabold text-xs flex items-center justify-center font-mono">
              2
            </span>
            <h2 className="text-sm uppercase font-bold tracking-wider text-white">
              Paso 2: Código de Falla (DTC) y Pregunta al Asistente
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-0.5 ml-8">
            Consultando manual oficial de <strong className="text-white">{selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.engine})</strong>
          </p>
        </div>

        {/* Selector de códigos DTC con botones grandes */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-300 font-mono">Código Escaneado:</span>
          <div className="flex gap-2">
            {selectedVehicle.commonDTCs.map((dtc) => (
              <button
                key={dtc}
                type="button"
                onClick={() => handleDtcChange(dtc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold transition-all ${
                  selectedDtc === dtc
                    ? "bg-mechanic-red text-white shadow-lg ring-2 ring-red-400 scale-105"
                    : "bg-workshop-dark text-red-300 border border-red-900/60 hover:bg-workshop-cardHover"
                }`}
              >
                {dtc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de acción rápida estilo tablet automotriz */}
      <div className="mb-4">
        <span className="text-xs font-bold text-slate-400 block mb-2 font-mono">
          Accesos directos de taller:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => handlePreset("PASOS")}
            className="p-2.5 rounded-xl bg-workshop-dark hover:bg-workshop-cardHover border border-workshop-border text-left transition-all flex items-center gap-2.5 group"
          >
            <div className="p-2 rounded-lg bg-turbo-blue/20 text-turbo-cyan group-hover:bg-turbo-blue group-hover:text-white transition-colors">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Pruebas con Multímetro</div>
              <div className="text-[11px] text-slate-400">Paso a paso y valores esperados</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handlePreset("TORQUES")}
            className="p-2.5 rounded-xl bg-workshop-dark hover:bg-workshop-cardHover border border-workshop-border text-left transition-all flex items-center gap-2.5 group"
          >
            <div className="p-2 rounded-lg bg-mechanic-amber/20 text-mechanic-amber group-hover:bg-mechanic-amber group-hover:text-black transition-colors">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Torques de Apriete (N·m)</div>
              <div className="text-[11px] text-slate-400">Tornillería y bujías sin barrer roscas</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handlePreset("PINES")}
            className="p-2.5 rounded-xl bg-workshop-dark hover:bg-workshop-cardHover border border-workshop-border text-left transition-all flex items-center gap-2.5 group"
          >
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileSearch className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Esquema de Pines (Pinout)</div>
              <div className="text-[11px] text-slate-400">Voltajes de 5V y tierras a ECM</div>
            </div>
          </button>
        </div>
      </div>

      {/* Formulario de Consulta */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <textarea
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            disabled={isLoading}
            rows={2}
            className="w-full bg-workshop-dark border-2 border-workshop-border rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-turbo-cyan focus:ring-1 focus:ring-turbo-cyan font-sans resize-none transition-all shadow-inner"
            placeholder="Escribe la duda técnica del vehículo o haz clic en uno de los accesos rápidos..."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-turbo-cyan animate-pulse"></span>
            <span>Costo de consulta IA en AWS Bedrock: <strong className="text-green-400">~$0.07 MXN</strong> (7 centavos)</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !customQuery.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-turbo-blue via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-turbo-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Consultando Manual con AWS Bedrock...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Consultar Copiloto de Taller</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Progreso en vivo */}
      {isLoading && (
        <div className="mt-4 p-4 rounded-xl bg-turbo-blue/10 border-2 border-turbo-cyan text-xs font-mono text-white flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-turbo-cyan animate-ping" />
            <span className="font-bold text-turbo-cyan text-sm">{loadingStep}</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">Indexación en OpenSearch Serverless</span>
        </div>
      )}
    </section>
  );
};
