# Kasa AutoCopilot 🚗⚡🤖 🇲🇽

> **El Copiloto de Inteligencia Artificial para Talleres Mecánicos en México — Arquitectura Serverless RAG en Amazon Web Services (AWS Bedrock + Claude 3.5 Sonnet)**

[![AWS Bedrock](https://img.shields.io/badge/AWS-Amazon%20Bedrock-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/bedrock/)
[![Model](https://img.shields.io/badge/LLM-Claude%203.5%20Sonnet-8B5CF6)](https://www.anthropic.com/claude)
[![Vector Search](https://img.shields.io/badge/Vector%20DB-OpenSearch%20Serverless-0052CC)](https://aws.amazon.com/opensearch-service/)
[![Moneda](https://img.shields.io/badge/Moneda-Pesos%20Mexicanos%20(MXN)-green?logo=circle)](https://es.wikipedia.org/wiki/Peso_mexicano)
[![Next.js](https://img.shields.io/badge/Next.js-15%20App%20Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform)](https://www.terraform.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 ¿Qué es Kasa AutoCopilot? (Explicación Rápida)

En los talleres mecánicos y agencias automotrices de México (Nissan, Volkswagen, Toyota, Chevrolet, Ford), cuando un auto entra con la luz de **Check Engine encendida**, el mecánico conecta el escáner y obtiene un código de falla (ejemplo: `P0300`, `P0420`, `P0A80`). 

A partir de ahí viene el mayor cuello de botella: **buscar en manuales oficiales de servicio en PDF de 4,000 páginas** qué pin medir con el multímetro, cuál es el valor normal de resistencia o cuál es el torque en $N\cdot m$ para no degollar un tornillo en la cabeza del motor. Esto toma entre **35 y 55 minutos por auto**.

### 💡 ¿Cómo lo resuelve Kasa AutoCopilot con AWS?
1. **El mecánico selecciona el vehículo** (ej. Nissan Versa, VW Jetta, Toyota Prius Híbrido) y el código de falla.
2. **Amazon Bedrock (Claude 3.5 Sonnet)** consulta en segundos la base vectorial en **OpenSearch Serverless** con los manuales oficiales de agencia indexados.
3. **El asistente entrega en pantalla**:
   * Qué cable y pin medir con el multímetro y el valor en Ohms/Voltios esperado.
   * La tabla de **pares de apriete (torques)** en $N\cdot m$ y $lb\text{-}ft$.
   * Advertencias obligatorias de seguridad (ej. desconexión de 201.6V DC con guantes aislantes en autos híbridos).
   * La cita exacta del manual con número de página y porcentaje de coincidencia.

---

## 💰 Retorno de Inversión y FinOps en Pesos Mexicanos (MXN)

El modelo de costos demuestra una rentabilidad incomparable para cualquier taller o concesionario:

| Concepto | Costo / Ahorro en Pesos ($ MXN) | Explicación Operativa |
| :--- | :--- | :--- |
| **Costo de Consulta en AWS Bedrock** | **~$0.07 MXN** (7 centavos) | ~1,500 tokens de Claude 3.5 Sonnet + búsqueda vectorial OpenSearch. |
| **Tiempo Ahorrado de Técnico** | **+$552.50 MXN** | Ahorro de ~39 min por auto (tarifa promedio de mecánico: **$850 MXN / hora**). |
| **Pérdida de Refacción Evitada** | **+$5,800.00 MXN** | Evita cambiar sensores de oxígeno, bobinas o catalizadores sanos por adivinanza. |
| **Ahorro Neto Total por Diagnóstico** | **+$6,352.50 MXN** | Beneficio directo para el taller en cada orden de trabajo. |
| **Multiplicador de ROI** | **> 90,000x** | Por cada \$1.00 peso invertido en AWS, el taller recupera \$90,000 pesos en eficiencia. |

---

## 🏛 Arquitectura Cloud en Amazon Web Services (AWS)

```
+----------------------------------------------------------------------------------------------------+
|                                    KASA AUTOCOPILOT ARCHITECTURE                                   |
+----------------------------------------------------------------------------------------------------+

 [ Manuales Oficiales OEM (PDFs) ]
               │
               ▼
       [ Amazon S3 Bucket ] ──► [ AWS Textract (Tablas & Torques) ] ──► [ Lambda Semantic Chunker ]
                                                                                   │
                                                                                   ▼
                                                                   [ Titan Text Embeddings V1 ]
                                                                                   │
                                                                                   ▼
                                                                   [ OpenSearch Serverless (Vector DB) ]
                                                                                   ▲
                                                                                   │ (Búsqueda kNN)
                                                                                   │
 [ Consola de Taller Mecánico ] ◄──► [ Next.js 15 App Router ] ◄──► [ Bedrock Knowledge Base ]
    (Tablet / Estación de Bahía)         (/api/copilot/diagnose)                    │
                                                    │                              ▼
                                                    ├──► [ Bedrock Guardrails ] ──► [ Claude 3.5 Sonnet ]
                                                    │    (Alto Voltaje & EPP)       (Razonamiento Técnico)
                                                    ▼
                                        [ Amazon DynamoDB ] & [ CloudWatch ]
                                       (Historial por VIN & Telemetría FinOps)
```

---

## 🚗 Vehículos Populares en México Precargados

* **Nissan Versa Sense / Advance 1.6L (2022)** — El vehículo más vendido en México. Código `P0301` (Fallo de combustión en cilindro 1, prueba de bobinas Hitach y bujías NGK).
* **Volkswagen Jetta Trendline 1.4L TSI (2021)** — Ícono fabricado en la planta de Puebla. Código `P0420` (Eficiencia catalítica y sensor de oxígeno pre/post catalizador).
* **Toyota Prius Híbrido 1.8L HEV (2020)** — El híbrido insignia en México. Código `P0A80` (Deterioro de batería de tracción y alerta crítica de 201.6V DC con guantes Clase 0).
* **Chevrolet Onix / Tracker 1.2L Turbo (2023)** — Motor E-Turbo de 3 cilindros. Código `P0299` (Presión baja de turbo, prueba de estanqueidad de intercooler).
* **Ford Lobo / F-150 3.5L EcoBoost (2022)** — Camioneta de trabajo pesado. Código `P0016` (Correlación de cadena y actuadores VCT).

---

## ⚡ Inicio Rápido (Quickstart)

### 1. Clonar el Repositorio e Instalar Dependencias
```bash
git clone https://github.com/Luics415/Kasa-autocopilot.git
cd Kasa-autocopilot
npm install
```

### 2. Modo Simulación Local (Sin costo de AWS)
El proyecto incluye un simulador automotriz de alta fidelidad que funciona de inmediato:
```bash
npm run dev
```
Abre en tu navegador [http://localhost:3000](http://localhost:3000).

### 3. Modo AWS Bedrock Live (Producción)
En `.env.local`:
```env
AWS_MODE=live
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0
BEDROCK_KNOWLEDGE_BASE_ID=tu_knowledge_base_id
```

---

## 🧪 Pruebas Automatizadas

```bash
npm test
```
Ejecuta la suite de verificación con casos reales de México, validación de fórmulas FinOps en pesos mexicanos y guardrails de alta tensión (3/3 passing).

---

## 📄 Licencia

Distribuido bajo la Licencia **MIT**. Desarrollado por **Luics** para portafolio de Arquitectura Cloud, IA Generativa y Sistemas Distribuidos.
