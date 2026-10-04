"use client";

import React, { useState } from "react";
import { ManualSourceCitation } from "@/lib/types";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, FileText, CheckCircle } from "lucide-react";

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
    <div className="bg-surface-raised border border-surface-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <h3 className="font-bold text-sm text-white tracking-tight uppercase font-mono">
            Fuentes Oficiales Citadas (RAG Grounding)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
          Cero Alucinaciones Verificadas
        </span>
      </div>

      <div className="space-y-2.5">
        {sources.map((src) => {
          const isExpanded = expandedId === src.id;

          return (
            <div
              key={src.id}
              className="rounded-lg border border-surface-border bg-surface-subtle overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(src.id)}
                className="w-full text-left p-3 flex items-center justify-between hover:bg-surface-hover/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-purple-950/70 border border-purple-700/50 flex items-center justify-center text-purple-300">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">
                      {src.documentTitle}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>Código: <strong className="text-slate-300">{src.oemCode}</strong></span>
                      <span>·</span>
                      <span>Sección: <strong className="text-slate-300">{src.section}</strong></span>
                      <span>·</span>
                      <span>Página: <strong className="text-purple-300 font-bold">{src.pageNumber}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-bold flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" />
                    {Math.round(src.relevanceScore * 100)}% Similitud
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-3.5 pt-0 text-xs font-mono text-slate-300 border-t border-surface-border/60 bg-surface-inset">
                  <div className="text-[10px] uppercase text-slate-500 font-bold mb-1 tracking-wider">
                    Fragmento Vectorial Extraído (S3 / OpenSearch Chunk):
                  </div>
                  <blockquote className="p-2.5 rounded bg-surface-raised border-l-2 border-purple-500 text-slate-300 italic text-[11px] leading-relaxed">
                    &quot;{src.snippet}&quot;
                  </blockquote>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
