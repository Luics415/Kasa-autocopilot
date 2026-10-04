"use client";

import React, { useState } from "react";
import {
  X,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  TrendingUp,
  FileCode,
  Server,
  DollarSign,
  ExternalLink,
  CheckCircle2
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
      <div className="bg-workshop-card border-2 border-workshop-border rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Cabecera */}
        <div className="p-6 border-b-2 border-workshop-border flex items-center justify-between bg-workshop-dark">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bedrock-purple to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-purple-900/40 border-2 border-white/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-extrabold text-white font-sans">
                  Kasa AutoCopilot — Arquitectura AWS & Caso de Negocio ($ MXN)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/40">
                  🇲🇽 Precios en Pesos Mexicanos
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Solución Cloud para Talleres Mecánicos y Agencias en México utilizando Amazon Bedrock y RAG
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

        {/* Pestañas de Navegación */}
        <div className="px-6 border-b-2 border-workshop-border bg-workshop-dark/60 flex items-center gap-3 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab("ARCHITECTURE")}
            className={`py-3.5 px-4 border-b-2 font-bold transition-all flex items-center gap-2 ${
              activeTab === "ARCHITECTURE"
                ? "border-turbo-cyan text-turbo-cyan bg-turbo-blue/10"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Server className="w-4 h-4" />
            <span>1. Arquitectura AWS</span>
          </button>
          <button
            onClick={() => setActiveTab("RAG_STRATEGY")}
            className={`py-3.5 px-4 border-b-2 font-bold transition-all flex items-center gap-2 ${
              activeTab === "RAG_STRATEGY"
                ? "border-turbo-cyan text-turbo-cyan bg-turbo-blue/10"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>2. RAG Automotriz vs Naive</span>
          </button>
          <button
            onClick={() => setActiveTab("FINOPS")}
            className={`py-3.5 px-4 border-b-2 font-bold transition-all flex items-center gap-2 ${
              activeTab === "FINOPS"
                ? "border-turbo-cyan text-turbo-cyan bg-turbo-blue/10"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>3. Métricas Financieras ($ MXN)</span>
          </button>
          <button
            onClick={() => setActiveTab("IAC")}
            className={`py-3.5 px-4 border-b-2 font-bold transition-all flex items-center gap-2 ${
              activeTab === "IAC"
                ? "border-turbo-cyan text-turbo-cyan bg-turbo-blue/10"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>4. Terraform (IaC)</span>
          </button>
        </div>

        {/* Contenido de la Pestaña */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ARQUITECTURA */}
          {activeTab === "ARCHITECTURE" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-workshop-dark border-2 border-workshop-border text-xs leading-relaxed text-slate-200 space-y-2.5">
                <span className="font-mono text-turbo-cyan font-bold uppercase tracking-wider block text-sm">
                  ¿Qué problema resuelve Kasa AutoCopilot en un taller o agencia?
                </span>
                <p className="text-slate-300">
                  En los talleres mecánicos y agencias automotrices en México (Nissan, Volkswagen, Ford, Toyota, etc.), los manuales oficiales de servicio tienen entre <strong>3,000 y 6,000 páginas</strong> en PDF.
                </p>
                <p className="text-slate-300">
                  Un mecánico calificado pierde entre <strong>35 y 50 minutos</strong> buscando el valor de resistencia de un sensor, el orden de apriete de tornillos de cabeza o los voltajes de 5V de computadora. Además, en autos híbridos (como el Toyota Prius), manipular cables naranjas sin saber el procedimiento de descarga puede ser mortal.
                </p>
                <p className="text-slate-300">
                  <strong>Kasa AutoCopilot</strong> utiliza <strong>Amazon Bedrock (Claude 3.5 Sonnet)</strong> y <strong>RAG con OpenSearch Serverless</strong> para entregar al técnico los pasos exactos de comprobación con multímetro, los torques en N·m y advertencias de seguridad en menos de 500 milisegundos.
                </p>
              </div>

              {/* Tarjetas interactivas de nodos AWS */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Infraestructura Cloud en AWS (Haz clic en cada bloque para inspeccionarlo):
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
                  <button
                    onClick={() => setSelectedNode("ingestion")}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedNode === "ingestion"
                        ? "bg-turbo-blue/20 border-turbo-cyan shadow-lg"
                        : "bg-workshop-dark border-workshop-border hover:bg-workshop-cardHover"
                    }`}
                  >
                    <div className="text-amber-400 font-extrabold">1. Manuales S3</div>
                    <div className="font-bold text-white text-sm mt-1">S3 + AWS Textract</div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Extracción de tablas de torques y diagramas eléctricos sin desfasar datos.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("vectordb")}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedNode === "vectordb"
                        ? "bg-turbo-blue/20 border-turbo-cyan shadow-lg"
                        : "bg-workshop-dark border-workshop-border hover:bg-workshop-cardHover"
                    }`}
                  >
                    <div className="text-turbo-cyan font-extrabold">2. Vector Search</div>
                    <div className="font-bold text-white text-sm mt-1">OpenSearch Serverless</div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Titan Embeddings V1 con chunking jerárquico por Sistema y Código DTC.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("bedrock")}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedNode === "bedrock"
                        ? "bg-turbo-blue/20 border-turbo-cyan shadow-lg"
                        : "bg-workshop-dark border-workshop-border hover:bg-workshop-cardHover"
                    }`}
                  >
                    <div className="text-purple-300 font-extrabold">3. Razonamiento IA</div>
                    <div className="font-bold text-white text-sm mt-1">Claude 3.5 Sonnet</div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Generación de pruebas de multímetro en JSON estricto con citas de página.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("guardrails")}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedNode === "guardrails"
                        ? "bg-turbo-blue/20 border-turbo-cyan shadow-lg"
                        : "bg-workshop-dark border-workshop-border hover:bg-workshop-cardHover"
                    }`}
                  >
                    <div className="text-green-400 font-extrabold">4. Seguridad Vida</div>
                    <div className="font-bold text-white text-sm mt-1">Bedrock Guardrails</div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Protocolo obligatorio de alto voltaje (200V-800V) y EPP dieléctrico.
                    </p>
                  </button>
                </div>

                {/* Detalle del nodo seleccionado */}
                <div className="mt-4 p-5 rounded-2xl bg-workshop-dark border-2 border-workshop-border text-xs font-sans leading-relaxed">
                  {selectedNode === "bedrock" && (
                    <div className="space-y-1.5">
                      <div className="text-purple-300 font-extrabold text-sm flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-purple-400" /> Inferencia con Anthropic Claude 3.5 Sonnet en Amazon Bedrock
                      </div>
                      <p className="text-slate-200">
                        Elegido por su altísima precisión en razonamiento técnico y generación de JSON estructurado sin inventar valores. Además, <strong>Amazon Bedrock garantiza privacidad absoluta</strong>: las consultas y datos de los talleres nunca se comparten con terceros ni se usan para entrenar modelos públicos.
                      </p>
                    </div>
                  )}
                  {selectedNode === "ingestion" && (
                    <div className="space-y-1.5">
                      <div className="text-amber-400 font-extrabold text-sm flex items-center gap-2">
                        <Database className="w-5 h-5" /> AWS Textract para Tablas Automotrices
                      </div>
                      <p className="text-slate-200">
                        Los manuales de taller tienen tablas complejas de torques con pasos angulares. Un OCR común mezcla los valores de cabeza con los de cárter. AWS Textract procesa la geometría y tablas para preservar exactamente cada fila.
                      </p>
                    </div>
                  )}
                  {selectedNode === "vectordb" && (
                    <div className="space-y-1.5">
                      <div className="text-turbo-cyan font-extrabold text-sm flex items-center gap-2">
                        <Server className="w-5 h-5" /> Amazon OpenSearch Serverless + Titan Embeddings
                      </div>
                      <p className="text-slate-200">
                        Índice vectorial totalmente administrado sin servidores fijos que pagar. Permite búsquedas híbridas (semántica vectorial + filtros por VIN, marca, año y DTC) con latencias menores a 350 milisegundos.
                      </p>
                    </div>
                  )}
                  {selectedNode === "guardrails" && (
                    <div className="space-y-1.5">
                      <div className="text-green-400 font-extrabold text-sm flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" /> Amazon Bedrock Guardrails para Protección del Mecánico
                      </div>
                      <p className="text-slate-200">
                        Si el auto es híbrido o eléctrico, el Guardrail intercepta la respuesta para exigir el uso de Guantes Dieléctricos Clase 0 (1,000V) y la desconexión del Service Plug antes de permitir cualquier medición con multímetro.
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
              <h4 className="text-sm font-bold text-white uppercase font-mono">
                Diferenciador Técnico: RAG Naive vs. RAG Especializado de Kasa AutoCopilot
              </h4>

              <div className="overflow-x-auto rounded-xl border-2 border-workshop-border">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-workshop-dark text-slate-300 border-b-2 border-workshop-border">
                    <tr>
                      <th className="p-3.5 font-bold">Aspecto Técnico</th>
                      <th className="p-3.5 font-bold text-red-300">RAG Genérico (ChatGPT / Naive)</th>
                      <th className="p-3.5 font-bold text-emerald-300">Kasa AutoCopilot (AWS Bedrock)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-workshop-border bg-workshop-card text-slate-200">
                    <tr>
                      <td className="p-3.5 font-bold text-white">Segmentación (Chunking)</td>
                      <td className="p-3.5 text-slate-400">Cortes ciegos cada 500 palabras rompiendo oraciones.</td>
                      <td className="p-3.5 text-emerald-200 font-semibold">
                        Partición por Sistema $\rightarrow$ Código DTC $\rightarrow$ Procedimiento OEM.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Tablas de Torques</td>
                      <td className="p-3.5 text-slate-400">Texto plano desordenado que confunde tornillos.</td>
                      <td className="p-3.5 text-emerald-200 font-semibold">
                        AWS Textract Tables respetando N·m, lb-ft y secuencias de apriete.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Seguridad Alto Voltaje</td>
                      <td className="p-3.5 text-slate-400">Ignora advertencias si no se le piden explícitamente.</td>
                      <td className="p-3.5 text-emerald-200 font-semibold">
                        Bedrock Guardrails obligatorios con lista de EPP dieléctrico.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Verificabilidad</td>
                      <td className="p-3.5 text-slate-400">Respuestas sin respaldo o fuentes inventadas.</td>
                      <td className="p-3.5 text-emerald-200 font-semibold">
                        Citas con Código OEM, Página de manual y porcentaje de coincidencia.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FINOPS */}
          {activeTab === "FINOPS" && (
            <div className="space-y-5">
              <h4 className="text-sm font-bold text-white uppercase font-mono">
                Modelo Financiero y Ahorro en Pesos Mexicanos (MXN)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-5 rounded-2xl bg-workshop-dark border-2 border-purple-500/50 space-y-2">
                  <div className="text-purple-300 font-extrabold text-sm">Costo en AWS Bedrock</div>
                  <div className="text-3xl font-black text-white">$0.07 <span className="text-sm text-purple-300">MXN</span></div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Aproximadamente <strong>7 centavos de peso mexicano</strong> por consulta (1,500 tokens con Claude 3.5 Sonnet).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-workshop-dark border-2 border-green-500/50 space-y-2">
                  <div className="text-green-300 font-extrabold text-sm">Ahorro en Mano de Obra</div>
                  <div className="text-3xl font-black text-white">$552.50 <span className="text-sm text-green-300">MXN</span></div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Ahorro de ~39 minutos de investigación técnica a una tarifa de <strong>$850 MXN / hora</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-workshop-dark border-2 border-green-500/50 space-y-2">
                  <div className="text-green-300 font-extrabold text-sm">Refacción Evitada</div>
                  <div className="text-3xl font-black text-white">$5,800.00 <span className="text-sm text-green-300">MXN</span></div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Evita que el mecánico cambie una pieza cara por adivinanza (ej. sensor O2 de agencia, bobina original o catalizador).
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-green-950/40 border-2 border-green-400 text-sm font-sans text-green-100 shadow-xl">
                <strong className="text-green-300 font-bold block mb-1 text-base">Conclusión de Negocio:</strong>
                Por cada <strong>$1.00 Peso Mexicano</strong> invertido en procesamiento de IA en Amazon Bedrock, el taller mecánico en México recupera un estimado de <strong>+$90,000 Pesos Mexicanos</strong> en ahorro de horas de taller y piezas no reemplazadas erróneamente.
              </div>
            </div>
          )}

          {/* TAB 4: IAC */}
          {activeTab === "IAC" && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase font-mono">
                Infraestructura como Código con Terraform
              </h4>
              <p className="text-xs text-slate-300">
                Todo el ecosistema de AWS (S3, Bedrock Knowledge Base, OpenSearch Serverless y DynamoDB) está empaquetado en la carpeta <code className="text-amber-300 font-mono">/terraform</code> para replicar en cualquier cuenta de AWS en minutos.
              </p>

              <pre className="p-4 rounded-xl bg-workshop-dark border-2 border-workshop-border text-xs font-mono text-slate-200 overflow-x-auto">
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
    }
  }
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Pie de modal */}
        <div className="p-5 border-t-2 border-workshop-border bg-workshop-dark flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Repositorio oficial:</span>
            <a
              href="https://github.com/Luics415/Kasa-autocopilot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-turbo-cyan hover:underline flex items-center gap-1 font-bold"
            >
              github.com/Luics415/Kasa-autocopilot
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-workshop-card hover:bg-workshop-cardHover text-white font-bold transition-all border border-workshop-border"
          >
            Volver a la Consola
          </button>
        </div>
      </div>
    </div>
  );
};
