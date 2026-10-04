"use client";

import React from "react";
import { VehicleProfile } from "@/lib/types";
import { Car, Zap, CheckCircle2, MapPin, Sparkles } from "lucide-react";

interface VehicleSelectorProps {
  vehicles: VehicleProfile[];
  selectedVehicleId: string;
  onSelectVehicle: (vehicle: VehicleProfile) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle
}) => {
  return (
    <section className="bg-workshop-card border-2 border-workshop-border rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-workshop-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turbo-blue text-white font-extrabold text-xs flex items-center justify-center font-mono">
              1
            </span>
            <h2 className="text-sm uppercase font-bold tracking-wider text-white">
              Paso 1: Selecciona el Vehículo en el Taller
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-0.5 ml-8">
            Elige uno de los modelos comunes en agencias y talleres de México para cargar su manual oficial
          </p>
        </div>
        <span className="text-xs font-mono font-semibold text-turbo-cyan bg-turbo-blue/20 px-3 py-1 rounded-full border border-turbo-cyan/30">
          5 Unidades en Bahía
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {vehicles.map((v) => {
          const isSelected = v.id === selectedVehicleId;
          const isHighVoltage = v.powertrainType === "HIBRIDO" || v.powertrainType === "ELECTRICO";

          return (
            <button
              key={v.id}
              onClick={() => onSelectVehicle(v)}
              className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-b from-turbo-blue/30 to-workshop-cardHover border-turbo-cyan shadow-xl shadow-turbo-blue/20 scale-[1.02] ring-2 ring-turbo-cyan/50"
                  : "bg-workshop-dark border-workshop-border hover:border-slate-500 hover:bg-workshop-cardHover/70"
              }`}
            >
              {/* Badge de selección activa */}
              {isSelected && (
                <div className="absolute top-3 right-3 text-turbo-cyan">
                  <CheckCircle2 className="w-5 h-5 fill-turbo-blue text-white" />
                </div>
              )}

              {/* Tag de Alto Voltaje */}
              {isHighVoltage && (
                <div className="mb-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  <Zap className="w-3 h-3 text-amber-400" />
                  ALTO VOLTAJE
                </div>
              )}

              <div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-turbo-cyan" />
                  {v.workshopBay}
                </div>
                <div className="font-extrabold text-base text-white tracking-tight leading-tight">
                  {v.make} {v.model}
                </div>
                <div className="text-xs text-slate-300 font-mono mt-1">
                  Año {v.year} · {v.engine}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-workshop-border/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold">DTCs:</span>
                <div className="flex gap-1">
                  {v.commonDTCs.slice(0, 2).map((dtc) => (
                    <span
                      key={dtc}
                      className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-950/80 text-red-300 border border-red-700/60"
                    >
                      {dtc}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
