"use client";

import React, { useState } from "react";
import { VehicleProfile } from "@/lib/types";
import { Wrench, Sparkles, Send, Loader2, AlertCircle, FileSearch, CheckCircle2, ChevronRight } from "lucide-react";

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
    `Presenta el árbol de diagnóstico paso a paso para el código ${selectedVehicle.commonDTCs[0] || "P0301"}, incluyendo valores de resistencia esperados, torques de apriete y precauciones.`
  );

  const handleDtcChange = (dtc: string) => {
    setSelectedDtc(dtc);
    setCustomQuery(
      `Presenta el árbol de diagnóstico paso a paso para el código ${dtc}, incluyendo valores de resistencia esperados, torques de apriete y precauciones.`
    );
  };

  const handleQuickPrompt = (promptText: string) => {
    setCustomQuery(promptText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim() || isLoading) return;
    onExecuteDiagnostic(customQuery, selectedDtc ? [selectedDtc] : []);
  };

  return (
    <div className="bg-surface-raised border border-surface-border rounded-xl p-5 shadow-md">
      {/* Vehicle Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Vehículo en Diagnóstico:
            </span>
            <span className="font-bold text-white text-base">
              {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-3">
            <span>VIN: <strong className="text-slate-300">{selectedVehicle.vin}</strong></span>
            <span>Motor: <strong className="text-slate-300">{selectedVehicle.engine}</strong></span>
            <span>Odómetro: <strong className="text-slate-300">{selectedVehicle.mileageKm.toLocaleString()} km</strong></span>
          </div>
        </div>

        {/* DTC Selector Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Códigos DTC:</span>
          <div className="flex gap-1.5">
            {selectedVehicle.commonDTCs.map((dtc) => (
              <button
                key={dtc}
                type="button"
                onClick={() => handleDtcChange(dtc)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  selectedDtc === dtc
                    ? "bg-red-500 text-white shadow-sm ring-2 ring-red-400/50"
                    : "bg-surface-subtle hover:bg-surface-hover text-red-300 border border-red-900/60"
                }`}
              >
                {dtc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="mb-3.5 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-slate-400">Consultas Rápidas:</span>
        <button
          type="button"
          onClick={() =>
            handleQuickPrompt(
              `Árbol de diagnóstico paso a paso para ${selectedDtc} con pruebas de componentes y valores nominales.`
            )
          }
          className="text-xs px-2.5 py-1 rounded bg-surface-subtle hover:bg-surface-hover text-slate-300 border border-surface-border transition-colors flex items-center gap-1"
        >
          <Wrench className="w-3 h-3 text-cyan-400" />
          Árbol de Pruebas
        </button>
        <button
          type="button"
          onClick={() =>
            handleQuickPrompt(
              `Pares de apriete (Torques en Nm y lb-ft) y especificaciones de fluidos para componentes involucrados en ${selectedDtc}.`
            )
          }
          className="text-xs px-2.5 py-1 rounded bg-surface-subtle hover:bg-surface-hover text-slate-300 border border-surface-border transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          Torques & Fluidos
        </button>
        <button
          type="button"
          onClick={() =>
            handleQuickPrompt(
              `Diagrama de pines (pinout), voltajes de referencia y masa para los sensores relacionados a ${selectedDtc}.`
            )
          }
          className="text-xs px-2.5 py-1 rounded bg-surface-subtle hover:bg-surface-hover text-slate-300 border border-surface-border transition-colors flex items-center gap-1"
        >
          <FileSearch className="w-3 h-3 text-purple-400" />
          Pines & Voltajes
        </button>
      </div>

      {/* Query Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            disabled={isLoading}
            rows={2}
            className="w-full bg-ground border border-surface-border rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bedrock focus:ring-1 focus:ring-bedrock transition-all font-sans resize-none"
            placeholder="Escribe la consulta técnica o síntoma reportado por el conductor..."
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bedrock"></span>
            <span>Motor RAG: Bedrock Knowledge Base + Claude 3.5 Sonnet</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !customQuery.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-bedrock to-purple-600 hover:from-bedrock-light hover:to-purple-500 text-white font-medium text-xs shadow-md shadow-bedrock/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analizando Manuales OEM...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Consultar Copiloto</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading Progress State */}
      {isLoading && (
        <div className="mt-4 p-3.5 rounded-lg bg-surface-subtle border border-surface-border text-xs font-mono text-slate-300 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-medium">{loadingStep}</span>
          </div>
          <span className="text-slate-500">Recuperando vectores de similitud...</span>
        </div>
      )}
    </div>
  );
};
