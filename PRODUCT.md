# PRODUCT.md — Kasa AutoCopilot

## Executive Summary
**Kasa AutoCopilot** is an enterprise-grade Generative AI Copilot built on **Amazon Web Services (AWS)** specifically for automotive dealership workshops, independent repair centers, and fleet service facilities.

By coupling **Amazon Bedrock (Anthropic Claude 3.5 Sonnet)** with **RAG (Retrieval-Augmented Generation)** over original equipment manufacturer (OEM) technical manuals, Kasa AutoCopilot provides verified, step-by-step diagnostic workflows, exact torque tables, connector pinout diagrams, and mandatory high-voltage safety alerts in under 500 milliseconds.

---

## The Core Problem
Dealership service departments face three massive friction points:
1. **Unwieldy Manual Volumes**: OEM workshop manuals average between 3,000 and 6,000 pages of dense PDFs. Technicians spend an estimated 35 to 55 minutes per repair order searching for pinouts, sensor resistance ranges, or tightening sequences.
2. **High-Voltage Electrification Risks**: Modern hybrid (HEV) and battery electric vehicles (BEV) carry traction batteries ranging from 200V to 800V DC. Touching high-voltage orange cables without completing a verified capacitor discharge protocol can be lethal.
3. **Misdiagnosis & Warranty Losses**: Replacing functional parts by trial and error (e.g., swapping a \$1,200 catalytic converter when the root issue was an air leak in the exhaust manifold) causes costly warranty claims and customer churn.

---

## Value Proposition & ROI
* **Labor Efficiency**: Reduces diagnostic research time from 45 minutes to under 30 seconds per vehicle.
* **First-Time Fix Rate (FTFR)**: Boosts first-visit repair completion by 24% through verified OEM test steps.
* **FinOps ROI**: With an average Bedrock query cost of **\$0.0034 USD**, saving 39 minutes of technician labor (\$61.75 USD) and avoiding a \$320 misdiagnosis results in an operational ROI multiplier exceeding **11,000x**.

---

## Primary Users & Scenarios
1. **Master Technicians & Diagnostic Specialists**: Rapidly testing multi-pin connectors, reading CAN bus values, and executing pinpoint test trees on complex fault codes (e.g., P0301, P0A80, P0420).
2. **Service Advisors**: Generating accurate labor hour estimates and explaining OEM-required test steps directly to customers.
3. **Workshop Safety Officers**: Enforcing mandatory Personal Protective Equipment (PPE) checklists and lock-out/tag-out steps before high-voltage battery service.

---

## Technical Pillars
- **Zero-Hallucination Guardrails**: Every diagnostic step is tied to an explicit page and section from verified OEM service documentation.
- **Dual-Mode Execution**:
  - *Live AWS Bedrock*: Connects directly to Amazon Bedrock Knowledge Bases and OpenSearch Serverless.
  - *Zero-Cost Local Simulation*: Runs completely offline with a high-fidelity automotive knowledge base for demonstrations and evaluations.
- **Tactical Cockpit UI**: High-contrast, dark-mode workstation designed for touchscreen tablets and workshop service bays.
