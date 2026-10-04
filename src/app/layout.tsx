import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kasa AutoCopilot — Copiloto de Taller Mecánico con IA Generativa (AWS Bedrock + RAG)",
  description: "Asistente inteligente de diagnóstico automotriz y consulta de manuales OEM con Amazon Bedrock, Claude 3.5 Sonnet y RAG con citas verificadas.",
  keywords: ["AWS", "Amazon Bedrock", "RAG", "Claude 3.5 Sonnet", "Automotive", "OBD-II", "FinOps", "OpenSearch"],
  authors: [{ name: "Luics" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="bg-ground text-slate-200 antialiased min-h-screen selection:bg-bedrock selection:text-white">
        {children}
      </body>
    </html>
  );
}
