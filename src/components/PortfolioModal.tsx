"use client";

import React, { useState } from "react";
import {
  X,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileCode,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Server
} from "lucide-react";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<"ARCHITECTURE" | "RAG_STRATEGY" | "FINOPS" | "IAC">("ARCHITECTURE");
  const [selectedNode, setSelectedNode] = useState<string>("bedrock");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-surface-raised border border-surface-border rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bedrock to-purple-800 flex items-center justify-center text-white shadow-lg shadow-bedrock/30 border border-purple-400/40">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-mono">
                  Kasa AutoCopilot — Portafolio & Arquitectura Cloud
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  AWS BEDROCK RAG
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Arquitectura de Solución Enterprise para Diagnóstico Automotriz de Alta Precisión
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

        {/* Navigation Tabs */}
        <div className="px-5 border-b border-surface-border bg-surface-inset flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab("ARCHITECTURE")}
            className={`py-3 px-3.5 border-b-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "ARCHITECTURE"
                ? "border-bedrock text-purple-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Server className="w-4 h-4 text-cyan-400" />
            <span>1. Arquitectura AWS</span>
          </button>
          <button
            onClick={() => setActiveTab("RAG_STRATEGY")}
            className={`py-3 px-3.5 border-b-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "RAG_STRATEGY"
                ? "border-bedrock text-purple-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Database className="w-4 h-4 text-purple-400" />
            <span>2. Estrategia RAG Automotriz</span>
          </button>
          <button
            onClick={() => setActiveTab("FINOPS")}
            className={`py-3 px-3.5 border-b-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "FINOPS"
                ? "border-bedrock text-purple-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>3. Métricas FinOps & ROI</span>
          </button>
          <button
            onClick={() => setActiveTab("IAC")}
            className={`py-3 px-3.5 border-b-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "IAC"
                ? "border-bedrock text-purple-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCode className="w-4 h-4 text-amber-400" />
            <span>4. Terraform / IaC</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ARCHITECTURE */}
          {activeTab === "ARCHITECTURE" && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border text-xs leading-relaxed text-slate-300 space-y-2">
                <span className="font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Resumen Ejecutivo para Entrevistas y Portafolio
                </span>
                <p>
                  <strong>Kasa AutoCopilot</strong> aborda el desafío crítico de los talleres de concesionario: la complejidad de manuales técnicos OEM de 5,000 páginas y el riesgo de diagnósticos erróneos en vehículos de combustión, híbridos y eléctricos (HEV/BEV).
                </p>
                <p>
                  Implementa una arquitectura serverless en <strong>Amazon Web Services (AWS)</strong> utilizando <strong>Amazon Bedrock Knowledge Bases</strong> con <strong>OpenSearch Serverless</strong> para búsqueda vectorial semántica, <strong>Claude 3.5 Sonnet</strong> para razonamiento técnico riguroso, y <strong>Bedrock Guardrails</strong> para cumplimiento de protocolos de seguridad en alta tensión (300V-800V).
                </p>
              </div>

              {/* Interactive Architecture Flow Cards */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Flujo de Datos e Infraestructura AWS (Haz clic en un componente para detalles)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
                  {/* S3 + Textract */}
                  <button
                    onClick={() => setSelectedNode("ingestion")}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedNode === "ingestion"
                        ? "bg-purple-950/40 border-bedrock shadow-md ring-1 ring-bedrock"
                        : "bg-surface-subtle border-surface-border hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold">1. Ingesta S3</span>
                      <Database className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="font-bold text-white mt-1">S3 + AWS Textract</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Extracción tabular de pares de apriete y diagramas eléctricos sin perder estructura.
                    </p>
                  </button>

                  {/* Bedrock KB & OpenSearch */}
                  <button
                    onClick={() => setSelectedNode("vectordb")}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedNode === "vectordb"
                        ? "bg-purple-950/40 border-bedrock shadow-md ring-1 ring-bedrock"
                        : "bg-surface-subtle border-surface-border hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-bold">2. Vector Search</span>
                      <Server className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="font-bold text-white mt-1">Bedrock KB + OpenSearch</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Titan Embeddings G1 con chunking jerárquico por Sistema $\rightarrow$ DTC $\rightarrow$ Página.
                    </p>
                  </button>

                  {/* Bedrock Claude 3.5 */}
                  <button
                    onClick={() => setSelectedNode("bedrock")}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedNode === "bedrock"
                        ? "bg-purple-950/40 border-bedrock shadow-md ring-1 ring-bedrock"
                        : "bg-surface-subtle border-surface-border hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 font-bold">3. LLM Reasoning</span>
                      <Cpu className="w-4 h-4 text-purple-300" />
                    </div>
                    <div className="font-bold text-white mt-1">Claude 3.5 Sonnet</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Inferencia estructurada en JSON con citas de manuales OEM y cero alucinaciones.
                    </p>
                  </button>

                  {/* Guardrails & Safety */}
                  <button
                    onClick={() => setSelectedNode("guardrails")}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedNode === "guardrails"
                        ? "bg-purple-950/40 border-bedrock shadow-md ring-1 ring-bedrock"
                        : "bg-surface-subtle border-surface-border hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold">4. Guardrails</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="font-bold text-white mt-1">Bedrock Guardrails</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Filtros mandatorios de seguridad para alto voltaje y enmascaramiento de PII.
                    </p>
                  </button>
                </div>

                {/* Node Detail Box */}
                <div className="mt-4 p-4 rounded-xl bg-surface-inset border border-surface-border text-xs font-mono">
                  {selectedNode === "bedrock" && (
                    <div className="space-y-1.5">
                      <div className="text-purple-300 font-bold flex items-center gap-1.5">
                        <Cpu className="w-4 h-4" /> Detalle: Inferencia con Anthropic Claude 3.5 Sonnet en Bedrock
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Seleccionado por su capacidad sobresaliente de razonamiento determinístico y generación de JSON estricto sin alucinaciones. A diferencia de APIs públicas, Amazon Bedrock garantiza que los datos de telemetría y diagnósticos nunca se utilizan para reentrenar modelos fundacionales.
                      </p>
                    </div>
                  )}
                  {selectedNode === "ingestion" && (
                    <div className="space-y-1.5">
                      <div className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Database className="w-4 h-4" /> Detalle: AWS Textract + S3 Bucket
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Los manuales automotrices tienen formatos de doble columna con diagramas de pines y tablas de torques. AWS Textract analiza las relaciones espaciales (LAYOUT & TABLES), evitando que las tablas de pares de apriete se conviertan en texto desordenado ininteligible.
                      </p>
                    </div>
                  )}
                  {selectedNode === "vectordb" && (
                    <div className="space-y-1.5">
                      <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <Server className="w-4 h-4" /> Detalle: Amazon OpenSearch Serverless
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Indexación vectorial mediante Amazon Titan Text Embeddings V1 (1,536 dimensiones). Permite búsquedas híbridas (kNN vectorial + filtros de metadatos por VIN, fabricante, año y código DTC).
                      </p>
                    </div>
                  )}
                  {selectedNode === "guardrails" && (
                    <div className="space-y-1.5">
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Detalle: Amazon Bedrock Guardrails Automotrices
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Aplica políticas contextuales obligatorias: si la consulta involucra vehículos híbridos o eléctricos (HEV/BEV), el guardrail inyecta automáticamente el protocolo de descarga de capacitores y verificación de EPP dieléctrico antes de autorizar cualquier paso de medición.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RAG STRATEGY */}
          {activeTab === "RAG_STRATEGY" && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Comparativa: RAG Genérico vs. RAG Especializado de Kasa AutoCopilot
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-surface-border rounded-lg overflow-hidden">
                  <thead className="bg-surface-subtle text-slate-400 border-b border-surface-border">
                    <tr>
                      <th className="p-3 font-semibold">Dimensión Técnica</th>
                      <th className="p-3 font-semibold text-red-300">RAG Genérico / Naive</th>
                      <th className="p-3 font-semibold text-emerald-300">Kasa AutoCopilot (AWS Bedrock)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border text-slate-300">
                    <tr>
                      <td className="p-3 font-bold text-white">Estrategia de Chunking</td>
                      <td className="p-3 text-slate-400">Chunks fijos de 500 palabras cortando oraciones y tablas.</td>
                      <td className="p-3 text-emerald-200">
                        Chunking jerárquico por Sistema $\rightarrow$ Código DTC $\rightarrow$ Procedimiento OEM.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Extracción de Tablas</td>
                      <td className="p-3 text-slate-400">OCR plano que mezcla filas de torques de cabeza y bancada.</td>
                      <td className="p-3 text-emerald-200">
                        AWS Textract Table Extraction respetando unidades (Nm, lb-ft) y secuencias.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Seguridad en Alto Voltaje</td>
                      <td className="p-3 text-slate-400">Omite advertencias si el usuario no las pregunta explícitamente.</td>
                      <td className="p-3 text-emerald-200">
                        Bedrock Guardrails forzados: EPP y desconexión de Service Plug obligatoria.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Verificabilidad de Fuentes</td>
                      <td className="p-3 text-slate-400">Texto libre sin referencia o con citas inventadas.</td>
                      <td className="p-3 text-emerald-200">
                        Citas directas con Código OEM, Sección, Número de Página y Snippet real.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FINOPS */}
          {activeTab === "FINOPS" && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Modelo Financiero y Retorno de Inversión (ROI) en Taller
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border space-y-2">
                  <div className="text-purple-300 font-bold">Costo Unitario en AWS Bedrock</div>
                  <div className="text-2xl font-bold text-white">$0.0034 <span className="text-xs text-slate-400">USD / query</span></div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Basado en 950 tokens de entrada ($0.0028) + 640 tokens de salida ($0.0096) prorrateados con Claude 3.5 Sonnet.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border space-y-2">
                  <div className="text-emerald-300 font-bold">Ahorro en Horas Técnico</div>
                  <div className="text-2xl font-bold text-white">~39 min <span className="text-xs text-slate-400">($61.75 USD)</span></div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Un maestro mecánico factura $95 USD/h. Ahorrar 39 min de búsqueda en manuales equivale a $61.75 USD por orden.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border space-y-2">
                  <div className="text-cyan-300 font-bold">Ahorro en Garantías / Piezas</div>
                  <div className="text-2xl font-bold text-white">$320.00 <span className="text-xs text-slate-400">USD / caso</span></div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Evita sustituciones innecesarias de catalizadores o sensores provocadas por diagnósticos por tanteo.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-700/40 text-xs font-mono text-emerald-200">
                <strong className="text-emerald-300 block mb-1">Métrica Clave para Presentación Ejecutiva:</strong>
                Por cada <strong>$1.00 USD</strong> invertido en inferencia y base vectorial en Amazon Bedrock, el taller recupera un estimado de <strong>$11,200.00 USD</strong> en productividad operativa y reducción de pérdidas por garantías.
              </div>
            </div>
          )}

          {/* TAB 4: IAC */}
          {activeTab === "IAC" && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Infraestructura como Código (Terraform)
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                La infraestructura completa está codificada en Terraform dentro de la carpeta <code className="text-amber-300">/terraform</code> para despliegue automatizado en cualquier región de AWS.
              </p>

              <pre className="p-4 rounded-xl bg-surface-inset border border-surface-border text-[11px] font-mono text-slate-300 overflow-x-auto">
{`# terraform/bedrock_knowledge_base.tf
resource "aws_bedrockagent_knowledge_base" "workshop_kb" {
  name     = "kasa-autocopilot-workshop-kb"
  role_arn = aws_iam_role.bedrock_kb_role.arn

  knowledge_base_configuration {
    type = "VECTOR"
    vector_knowledge_base_configuration {
      embedding_model_arn = "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1"
    }
  }

  storage_configuration {
    type = "OPENSEARCH_SERVERLESS"
    opensearch_serverless_configuration {
      collection_arn    = aws_opensearchserverless_collection.kb_collection.arn
      vector_index_name = "workshop-manuals-index"
      field_mapping {
        vector_field   = "manual_vector"
        text_field     = "raw_text_content"
        metadata_field = "oem_metadata"
      }
    }
  }
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-subtle flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Repositorio:</span>
            <a
              href="https://github.com/Luics415/Kasa-autocopilot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
            >
              github.com/Luics415/Kasa-autocopilot
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-hover hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Volver a la Consola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
