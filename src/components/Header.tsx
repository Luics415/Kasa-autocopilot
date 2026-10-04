"use client";

import React from "react";
import { Cpu, ShieldCheck, Database, Layers, ExternalLink, Sparkles, BookOpen } from "lucide-react";

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
    <header className="border-b border-surface-border bg-surface-subtle/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bedrock to-aws-orange/90 flex items-center justify-center shadow-lg shadow-bedrock/20 border border-purple-400/30">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold tracking-tight text-lg text-white">
                KASA <span className="text-bedrock-light">AutoCopilot</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-bedrock/20 text-purple-300 border border-bedrock/40">
                <Sparkles className="w-2.5 h-2.5 text-bedrock-light" />
                BEDROCK RAG
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              Copiloto de Taller Mecánico con IA Generativa · Manuales OEM Certificados
            </p>
          </div>
        </div>

        {/* Status Indicators & Navigation */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Engine Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised border border-surface-border text-xs font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                activeMode === "LIVE_AWS_BEDROCK"
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-cyan-400"
              }`}
            />
            <span className="text-slate-300">
              {activeMode === "LIVE_AWS_BEDROCK" ? "AWS Bedrock Live" : "Local RAG Mode"}
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-border text-slate-400">
              Claude 3.5 Sonnet
            </span>
          </div>

          {/* Manuals Library Button */}
          <button
            onClick={onOpenManuals}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-surface-hover border border-surface-border text-xs font-medium text-slate-300 transition-colors"
            title="Ver catálogo de manuales OEM indexados"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Manuales OEM</span>
            <span className="text-[10px] bg-cyan-950/60 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800/40">
              142 Doc
            </span>
          </button>

          {/* Portfolio & Architecture Showcase Button */}
          <button
            onClick={onOpenPortfolio}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-bedrock-dark/80 to-purple-900/80 hover:from-bedrock hover:to-purple-700 border border-purple-500/40 text-xs font-semibold text-white shadow-md shadow-purple-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Layers className="w-3.5 h-3.5 text-purple-200" />
            <span>Arquitectura & Portfolio</span>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/Luics415/Kasa-autocopilot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-surface-hover border border-surface-border text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
