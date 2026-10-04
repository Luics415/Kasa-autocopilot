"use client";

import React from "react";
import { Wrench, ShieldCheck, Database, Layers, ExternalLink, Sparkles, BookOpen, DollarSign } from "lucide-react";

interface HeaderProps {
  onOpenPortfolio: () => void;
  onOpenManuals: () => void;
  activeMode: "LIVE_AWS_BEDROCK" | "LOCAL_RAG_SIMULATION";
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPortfolio,
  onOpenManuals,
  activeMode
}) => {
  return (
    <header className="border-b-2 border-workshop-border bg-workshop-card/95 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Marca y Propósito Inmediato */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-turbo-blue to-mechanic-orange flex items-center justify-center shadow-lg shadow-turbo-blue/30 border-2 border-white/20">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                KASA <span className="text-turbo-cyan">AutoCopilot</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-green-500/20 text-green-300 border border-green-500/40 flex items-center gap-1">
                🇲🇽 Precios en Pesos ($ MXN)
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-bedrock-purple/30 text-purple-200 border border-bedrock-purple/50">
                AWS Bedrock RAG
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              El Copiloto IA de Taller Mecánico · Diagnósticos certeros con manuales de agencia
            </p>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Indicador de Motor */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-workshop-dark border border-workshop-border text-xs font-mono">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                activeMode === "LIVE_AWS_BEDROCK"
                  ? "bg-mechanic-green animate-pulse"
                  : "bg-turbo-cyan"
              }`}
            />
            <span className="text-slate-200 font-semibold">
              {activeMode === "LIVE_AWS_BEDROCK" ? "AWS Bedrock Live" : "Simulador Local Activo"}
            </span>
          </div>

          {/* Botón de Manuales */}
          <button
            onClick={onOpenManuals}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-workshop-card hover:bg-workshop-cardHover border border-workshop-border text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-turbo-cyan" />
            <span>Biblioteca Manuales</span>
            <span className="bg-turbo-blue/40 text-cyan-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
              142 OEM
            </span>
          </button>

          {/* Botón de Arquitectura y Portafolio */}
          <button
            onClick={onOpenPortfolio}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-bedrock-purple to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-900/40 border border-purple-400/40 transition-all hover:scale-105 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Arquitectura AWS & ROI ($ MXN)</span>
          </button>

          {/* Enlace GitHub */}
          <a
            href="https://github.com/Luics415/Kasa-autocopilot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-workshop-card hover:bg-workshop-cardHover border border-workshop-border text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
