"use client";

import React from "react";
import { VehicleProfile } from "@/lib/types";
import { Car, Zap, Fuel, AlertTriangle, ShieldCheck, MapPin } from "lucide-react";

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
    <div className="bg-surface-raised border border-surface-border rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-300">
            Vehículos en Bahía de Diagnóstico
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {vehicles.length} unidades activas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {vehicles.map((v) => {
          const isSelected = v.id === selectedVehicleId;
          const isHighVoltage = v.powertrainType === "HEV" || v.powertrainType === "BEV" || v.powertrainType === "PHEV";

          return (
            <button
              key={v.id}
              onClick={() => onSelectVehicle(v)}
              className={`text-left p-3 rounded-lg border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "bg-surface-hover/90 border-bedrock shadow-md shadow-bedrock/10 ring-1 ring-bedrock/50"
                  : "bg-surface-subtle/60 border-surface-border hover:border-slate-600 hover:bg-surface-hover/40"
              }`}
            >
              {/* High Voltage Accent Tag */}
              {isHighVoltage && (
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-amber-500/20 border-b border-l border-amber-500/40 rounded-bl-md text-[9px] font-mono font-bold text-amber-300 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  ALTA TENSIÓN
                </div>
              )}

              <div>
                <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                  {v.workshopBay}
                </div>
                <div className="font-bold text-sm text-white tracking-tight leading-tight">
                  {v.make} {v.model}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {v.year} · {v.engine}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 truncate max-w-[100px]" title={v.vin}>
                  {v.vin.slice(0, 10)}...
                </span>
                <div className="flex gap-1">
                  {v.commonDTCs.slice(0, 2).map((dtc) => (
                    <span
                      key={dtc}
                      className="px-1.5 py-0.2 rounded text-[10px] bg-red-950/40 text-red-300 border border-red-800/40 font-bold"
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
    </div>
  );
};
