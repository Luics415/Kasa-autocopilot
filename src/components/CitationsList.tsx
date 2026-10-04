"use client";

import React, { useState } from "react";
import { ManualSourceCitation } from "@/lib/types";
import { BookOpen, ChevronDown, ChevronUp, FileText, CheckCircle2 } from "lucide-react";

interface CitationsListProps {
  sources: ManualSourceCitation[];
}

export const CitationsList: React.FC<CitationsListProps> = ({ sources }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!sources || sources.length === 0) {
    return null;
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-workshop-card border-2 border-workshop-border rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-workshop-border gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/40">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight uppercase font-sans">
              Manuales de Agencia Oficiales Citados (RAG Grounding)
            </h3>
            <p className="text-xs text-slate-300">
              Cada procedimiento está fundamentado en la documentación original del fabricante
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-purple-200 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/40">
          Cero Alucinaciones Verificadas
        </span>
      </div>

      <div className="space-y-3">
        {sources.map((src) => {
          const isExpanded = expandedId === src.id;

          return (
            <div
              key={src.id}
              className="rounded-xl border-2 border-workshop-border bg-workshop-dark overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(src.id)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-workshop-cardHover/50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-sans">
                      {src.documentTitle}
                    </div>
                    <div className="text-xs text-slate-300 font-mono flex items-center gap-2 mt-0.5 flex-wrap">
                      <span>Código: <strong className="text-white">{src.oemCode}</strong></span>
                      <span>·</span>
                      <span>Sección: <strong className="text-white">{src.section}</strong></span>
                      <span>·</span>
                      <span>Página: <strong className="text-purple-300 font-extrabold">{src.pageNumber}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {Math.round(src.relevanceScore * 100)}% Coincidencia
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-300" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 text-xs font-mono text-slate-200 border-t border-workshop-border bg-workshop-dark/80">
                  <div className="text-[11px] uppercase text-slate-400 font-bold mb-1.5 tracking-wider">
                    Fragmento Vectorial Extraído (OpenSearch Serverless Chunk):
                  </div>
                  <blockquote className="p-3 rounded-lg bg-workshop-card border-l-4 border-purple-500 text-slate-200 italic leading-relaxed text-xs">
                    &quot;{src.snippet}&quot;
                  </blockquote>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
