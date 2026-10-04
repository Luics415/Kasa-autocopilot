"use client";

import React, { useState } from "react";
import { X, BookOpen, Search, CheckCircle, Database } from "lucide-react";

interface ManualViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INDEXED_MANUALS = [
  {
    id: "m-nissan-versa",
    oem: "Nissan Mexicana",
    vehicle: "Nissan Versa & V-Drive 1.6L (2020-2024)",
    code: "SM20EM-HR16-MEX",
    pages: 3420,
    systems: ["1.6L HR16DE", "Encendido Electrónico Hitach", "Inyección Multipunto", "Transmisión CVT Xtronic"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-vw-jetta",
    oem: "Volkswagen de México (Planta Puebla)",
    vehicle: "Jetta Trendline & R-Line 1.4 TSI (2019-2024)",
    code: "VW-ERWIN-JETTA7-EA211",
    pages: 4120,
    systems: ["1.4L TSI Turbo EA211", "Inyección Directa FSI", "Depuración de Gases Lambda", "Transmisión Tiptronic 6 vel"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-toyota-prius",
    oem: "Toyota Motor Sales de México",
    vehicle: "Prius & Corolla Hybrid HSD (2018-2024)",
    code: "RM34D0U-MEX",
    pages: 3640,
    systems: ["Hybrid Synergy Drive", "Batería de Tracción 201.6V DC", "Inversor / Convertidor Boost", "Seguridad Service Plug"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-chevy-onix",
    oem: "General Motors de México",
    vehicle: "Chevrolet Onix & Tracker 1.2L Turbo (2021-2024)",
    code: "GMSI-DOC-ONIX-MEX",
    pages: 2890,
    systems: ["1.2L 3 Cilindros E-Turbo", "Válvula de Desahogo Wastegate", "Presión de Aceite Variable", "Red CAN Bus GM-LAN"],
    status: "INDEXADO EN OPENSEARCH"
  },
  {
    id: "m-ford-lobo",
    oem: "Ford Motor Company México",
    vehicle: "Ford Lobo / F-150 Lariat 3.5L EcoBoost (2020-2024)",
    code: "WSM-303-01D-MEX",
    pages: 5120,
    systems: ["3.5L EcoBoost Twin-Turbo", "Distribución Variable VCT", "Inyección Dual PFI/GDI", "Transmisión 10R80"],
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-workshop-card border-2 border-workshop-border rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Cabecera */}
        <div className="p-6 border-b-2 border-workshop-border flex items-center justify-between bg-workshop-dark">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-turbo-blue/20 text-turbo-cyan border border-turbo-cyan/40 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white font-sans">
                Manuales de Taller Oficiales Indexados en Bedrock Knowledge Base
              </h2>
              <p className="text-xs text-slate-300 font-sans">
                5 manuales maestros de agencia para México · 19,190 páginas procesadas con AWS Textract y Bedrock Titan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-workshop-cardHover text-slate-400 hover:text-white transition-colors border border-workshop-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Buscador */}
        <div className="p-4 border-b-2 border-workshop-border bg-workshop-dark/80">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por marca, modelo o código de manual (ej. Versa, Jetta, Prius, EcoBoost)..."
              className="w-full bg-workshop-dark border-2 border-workshop-border rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-turbo-cyan font-mono"
            />
          </div>
        </div>

        {/* Lista */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-xl bg-workshop-dark border-2 border-workshop-border hover:border-turbo-cyan transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-turbo-cyan font-mono uppercase tracking-wider">
                    {m.oem}
                  </div>
                  <h3 className="font-extrabold text-base text-white mt-0.5">
                    {m.vehicle}
                  </h3>
                  <div className="text-xs font-mono text-slate-300 mt-1 flex items-center gap-3 flex-wrap">
                    <span>Código: <strong className="text-white">{m.code}</strong></span>
                    <span>·</span>
                    <span>Páginas: <strong className="text-purple-300">{m.pages.toLocaleString()}</strong></span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {m.status}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-workshop-border flex flex-wrap gap-2">
                {m.systems.map((sys, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-workshop-card border border-workshop-border text-slate-300"
                  >
                    {sys}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-workshop-border bg-workshop-dark flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-turbo-cyan" />
            <span>Almacenamiento: S3 Bucket (Cifrado KMS) + Búsqueda kNN en OpenSearch Serverless</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-workshop-card hover:bg-workshop-cardHover text-white font-bold transition-all border border-workshop-border"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
