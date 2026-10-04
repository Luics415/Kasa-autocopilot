# Kasa AutoCopilot 🚗⚡🤖

> **Copiloto de Taller Mecánico con IA Generativa — Arquitectura Serverless RAG en Amazon Web Services (AWS Bedrock + Claude 3.5 Sonnet)**

[![AWS Bedrock](https://img.shields.io/badge/AWS-Amazon%20Bedrock-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/bedrock/)
[![Model](https://img.shields.io/badge/LLM-Claude%203.5%20Sonnet-8B5CF6)](https://www.anthropic.com/claude)
[![Vector Search](https://img.shields.io/badge/Vector%20DB-OpenSearch%20Serverless-0052CC)](https://aws.amazon.com/opensearch-service/)
[![Next.js](https://img.shields.io/badge/Next.js-15%20App%20Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform)](https://www.terraform.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Resumen Ejecutivo (Executive Summary)

**Kasa AutoCopilot** es una plataforma de software de grado industrial diseñada para talleres mecánicos de concesionarios, flotas de transporte y centros de servicio automotriz.

A través de **IA Generativa en AWS (Amazon Bedrock)** y técnicas avanzadas de **RAG (Retrieval-Augmented Generation)** sobre miles de páginas de manuales de taller originales (OEM), boletines técnicos (TSBs) y esquemas de cableado, el sistema asiste a los técnicos mecánicos en tiempo real:

1. **Elimina tiempos muertos**: Reduce la búsqueda de procedimientos en manuales de 45 minutos a **< 500 ms**.
2. **Cero Alucinaciones (Grounded Knowledge)**: Cada paso cita el manual OEM, año, modelo, sección y número de página exacto.
3. **Seguridad Mandatoria en Alto Voltaje (HEV/BEV)**: Detecta vehículos híbridos o 100% eléctricos y antepone protocolos de descarga de capacitores y EPP dieléctrico antes de permitir pruebas de multímetro.
4. **Impacto FinOps Medible**: Telemetría en vivo del costo por token en Bedrock (~$0.0034 USD) frente al ahorro en horas de técnico (~$61.75 USD) y piezas mal diagnosticadas ($320 USD).

---

## 🏛 Arquitectura de la Solución en AWS

```
+----------------------------------------------------------------------------------------------------+
|                                    KASA AUTOCOPILOT ARCHITECTURE                                   |
+----------------------------------------------------------------------------------------------------+

 [ PDF Manuals & TSBs ]
           │
           ▼
   [ Amazon S3 Bucket ] ──► [ AWS Textract (Tables & Pinouts) ] ──► [ Lambda Semantic Chunker ]
                                                                                │
                                                                                ▼
                                                                [ Titan Text Embeddings V1 ]
                                                                                │
                                                                                ▼
                                                                [ OpenSearch Serverless (Vector DB) ]
                                                                                ▲
                                                                                │ (Retrieve)
                                                                                │
 [ Technician Workstation ] ◄──► [ Next.js 15 App Router ] ◄──► [ Bedrock Knowledge Base ]
      (Touchscreen UI)               (/api/copilot/diagnose)                     │
                                                │                               ▼
                                                ├──► [ Bedrock Guardrails ] ──► [ Claude 3.5 Sonnet ]
                                                │    (EV Safety & PII)          (Structured Reasoning)
                                                ▼
                                    [ Amazon DynamoDB ] & [ CloudWatch ]
                                   (Sessions & FinOps Telemetry)
```

### Flujo de Datos Técnico:
1. **Ingesta Especializada**: Los manuales OEM se depositan en Amazon S3. **AWS Textract** preserva las relaciones espaciales de tablas de apriete (torques) y asignaciones de pines.
2. **Chunking Semántico Jerárquico**: A diferencia de chunks arbitrarios de 500 palabras, el chunker particiona por `Sistema` $\rightarrow$ `Código DTC` $\rightarrow$ `Procedimiento OEM`.
3. **Búsqueda Vectorial**: **Bedrock Knowledge Bases** consulta el índice vectorial en **Amazon OpenSearch Serverless** utilizando similitud de coseno con **Titan Embeddings**.
4. **Guardrails de Seguridad**: Interceptan la consulta. Si el vehículo opera a 200V–800V DC, inyectan advertencias obligatorias de bloqueo/etiquetado (LOTO) y verificación de guantes Clase 0.
5. **Inferencia con Claude 3.5 Sonnet**: Devuelve un esquema JSON estructurado con pasos numerados, herramientas requeridas, valores nominales y citas bibliográficas.

---

## 🚀 Capacidades Destacadas

| Capacidad | Descripción Técnica |
| :--- | :--- |
| **Árbol de Pruebas Guiado** | Pasos numerados con herramientas específicas (multímetro, osciloscopio), pines de conector, valores de resistencia esperados y acción correctiva si está fuera de rango. |
| **Matriz de Torques OEM** | Conversor automático de unidades ($N\cdot m$, $lb\text{-}ft$, $lb\text{-}in$) con notas críticas de apriete (rosca seca, apriete angular, secuencia en cruz). |
| **Guardrails de Alto Voltaje** | Protección de vida para técnicos ante riesgos de arco eléctrico o choque en vehículos HEV/PHEV/BEV. |
| **Fuentes Citadas con Snippets** | Cada respuesta incluye un cajón desplegable con el fragmento del manual extraído por RAG y el porcentaje de similitud vectorial ($>95\%$). |
| **Barra Telemetría FinOps** | Monitoreo de latencia, tokens de entrada/salida, costo en dólares de AWS Bedrock y ROI de taller en tiempo real. |
| **Modo Dual (Live / Mock)** | Listo para desplegar en producción en AWS o ejecutarse 100% en local sin credenciales de AWS mediante un simulador de conocimiento automotriz de alta fidelidad. |

---

## 🛠 Stack Tecnológico

* **Frontend / Fullstack**: [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/).
* **Nube & Modelos**:
  * **Amazon Bedrock**: `anthropic.claude-3-5-sonnet-20241022-v2:0`
  * **Amazon Bedrock Embeddings**: `amazon.titan-embed-text-v1`
  * **Amazon Bedrock Knowledge Bases** & **Amazon OpenSearch Serverless**
  * **Amazon S3**, **Amazon DynamoDB**, **AWS Textract**
* **SDKs Oficiales**: `@aws-sdk/client-bedrock-runtime`, `@aws-sdk/client-bedrock-agent-runtime`, `@aws-sdk/client-s3`, `@aws-sdk/client-dynamodb`.
* **Infraestructura como Código (IaC)**: [Terraform](https://www.terraform.io/) (`/terraform`).

---

## ⚡ Inicio Rápido (Quickstart)

### 1. Clonar el Repositorio e Instalar Dependencias
```bash
git clone https://github.com/Luics415/Kasa-autocopilot.git
cd Kasa-autocopilot
npm install
```

### 2. Modo Simulación Local (Recomendado para evaluación rápida sin costo)
El proyecto viene preconfigurado con `AWS_MODE=mock`, lo que permite probar todas las capacidades, interfaces y casos reales (Ford, Toyota HEV, Chevy, Tesla, VW) de inmediato:
```bash
npm run dev
```
Abre en tu navegador [http://localhost:3000](http://localhost:3000).

### 3. Modo AWS Bedrock Live (Producción)
Para conectar con tu cuenta de AWS y Knowledge Bases:
1. Configura tus variables en `.env.local`:
```env
AWS_MODE=live
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0
BEDROCK_KNOWLEDGE_BASE_ID=tu_knowledge_base_id
```
2. Ejecuta el servidor:
```bash
npm run dev
```

---

## 🧪 Pruebas Automatizadas

El proyecto incluye un suite de pruebas automatizadas que valida la lógica RAG, el cálculo FinOps y la activación de guardrails de seguridad:

```bash
npm test
```

---

## 📦 Despliegue con Terraform

La carpeta `/terraform` contiene los manifiestos para aprovisionar los recursos de AWS necesarios:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

Recursos creados:
* `aws_s3_bucket`: Almacenamiento seguro de manuales con cifrado KMS.
* `aws_opensearchserverless_collection`: Índice vectorial de búsqueda.
* `aws_dynamodb_table`: Historial de consultas y auditoría por VIN.
* `aws_iam_role`: Políticas de mínimo privilegio para ejecución de Bedrock Knowledge Bases.

---

## 📊 Modelo Financiero FinOps (Business Case)

| Parámetro | Valor Unitario | Impacto Operativo |
| :--- | :--- | :--- |
| **Costo por Consulta en Bedrock** | **\$0.0034 USD** | 950 tokens in + 640 tokens out + búsqueda vectorial. |
| **Tiempo Ahorrado por Diagnóstico** | **~39 minutos** | Valor de mano de obra del técnico: **\$61.75 USD** (\$95/h). |
| **Ahorro en Garantías Evitadas** | **\$320.00 USD** | Evita reemplazos erróneos de piezas funcionales. |
| **Multiplicador de ROI** | **> 11,200x** | Retorno directo por cada dólar invertido en AWS. |

---

## 📄 Licencia

Distribuido bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ y rigor técnico por **Luics** para el portafolio de Arquitectura Cloud, IA Generativa y Sistemas Distribuidos.
