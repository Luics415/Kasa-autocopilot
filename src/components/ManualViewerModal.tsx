"use client";

import React, { useState } from "react";
import { X, BookOpen, Search, CheckCircle, FileText, Database, Shield } from "lucide-react";

interface ManualViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INDEXED_MANUALS = [
  {
    id: "m-ford-1",
    oem: "Ford Motor Company",
    vehicle: "Ford F-150 / Raptor (2021-2024)",
    code: "WSM-303-07C",
    pages: 4820,
    systems: ["3.5L EcoBoost", "Encendido COP", "Inyección Directa GDI", "10R80 Transmisión"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-toyota-1",
    oem: "Toyota Motor Corporation",
    vehicle: "Prius & Corolla Hybrid (2018-2023)",
    code: "RM34D0U",
    pages: 3640,
    systems: ["Hybrid Synergy Drive", "Inversor / Convertidor Boost", "Batería NiMH 201.6V", "Frenado Regenerativo"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-gm-1",
    oem: "General Motors / Chevrolet",
    vehicle: "Silverado / Sierra 1500 V8 (2019-2024)",
    code: "GMSI-DOC-54219",
    pages: 5120,
    systems: ["5.3L / 6.2L EcoTec3", "Dynamic Fuel Management (DFM)", "Control de Emisiones OBD-II", "Convertidor Catalítico"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-tesla-1",
    oem: "Tesla Inc.",
    vehicle: "Model 3 / Model Y AWD (2020-2024)",
    code: "TSLA-SM-M3-2023",
    pages: 2980,
    systems: ["High Voltage Safety Loop", "BMS & Pyrofuse", "Inversor Frontal / Trasero", "Sistema Térmico Octovalve"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-vw-1",
    oem: "Volkswagen AG",
    vehicle: "Golf GTI / R 2.0L TSI (2019-2023)",
    code: "VW-ERWIN-A005GTI",
    pages: 3890,
    systems: ["2.0L EA888 Gen 3", "Turbocargador IHI IS20", "Válvula N75 / N249", "Transmisión DSG DQ381"],
    status: "INDEXADO EN OPENSEARCH"
  }
];

export const ManualViewerModal: React.FC<ManualViewerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filtered = INDEXED_MANUALS.filter(
    (m) =>
      m.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.oem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-raised border border-surface-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono">
                Catálogo de Manuales OEM Indexados en Bedrock Knowledge Base
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                5 manuales maestros · 20,450 páginas procesadas con AWS Textract y Bedrock Titan Embeddings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-hover text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-surface-border bg-surface-inset">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por marca, modelo o código OEM (ej. WSM, Toyota, EA888)..."
              className="w-full bg-ground border border-surface-border rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-xl bg-surface-subtle border border-surface-border hover:border-slate-600 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    {m.oem}
                  </div>
                  <h3 className="font-bold text-sm text-white mt-0.5">
                    {m.vehicle}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-3">
                    <span>Código OEM: <strong className="text-slate-200">{m.code}</strong></span>
                    <span>·</span>
                    <span>Páginas: <strong className="text-purple-300">{m.pages.toLocaleString()}</strong></span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-bold flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5" />
                  {m.status}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-surface-border/60 flex flex-wrap gap-1.5">
                {m.systems.map((sys, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-inset border border-surface-border text-slate-300"
                  >
                    {sys}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-subtle flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Almacenamiento: S3 Bucket (Cifrado KMS SSE-S3) + Vector Search OpenSearch Serverless</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-surface-hover hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
