import { VehicleProfile, DiagnosticResponse, TorqueSpecification, ManualSourceCitation } from "./types";

export const SAMPLE_VEHICLES: VehicleProfile[] = [
  {
    id: "veh-ford-f150",
    vin: "1FTFW1ED4NFA10982",
    make: "Ford",
    model: "F-150 EcoBoost 4x4",
    year: 2022,
    engine: "3.5L V6 Twin-Turbo D35",
    powertrainType: "ICE",
    mileageKm: 68400,
    workshopBay: "Bahía 02 (Diagnóstico Powertrain)",
    commonDTCs: ["P0300", "P0301", "P0299"]
  },
  {
    id: "veh-toyota-prius",
    vin: "JTDKN3DU5L1084920",
    make: "Toyota",
    model: "Prius Hybrid Synergy Drive",
    year: 2020,
    engine: "1.8L 2ZR-FXE HEV",
    powertrainType: "HEV",
    mileageKm: 94200,
    workshopBay: "Bahía 05 (Bajo Aislamiento HV / Eléctricos)",
    commonDTCs: ["P0A80", "P0A0D", "P0AA6"]
  },
  {
    id: "veh-chevy-silverado",
    vin: "3GCPCREC5MG198302",
    make: "Chevrolet",
    model: "Silverado 1500 High Country",
    year: 2021,
    engine: "5.3L EcoTec3 V8 L84",
    powertrainType: "ICE",
    mileageKm: 81200,
    workshopBay: "Bahía 01 (Mecánica Rápida)",
    commonDTCs: ["P0420", "P0171", "P0521"]
  },
  {
    id: "veh-tesla-model3",
    vin: "5YJ3E1EB8NF839102",
    make: "Tesla",
    model: "Model 3 Long Range AWD",
    year: 2023,
    engine: "Dual Motor Permanent Magnet (Front/Rear)",
    powertrainType: "BEV",
    mileageKm: 42300,
    workshopBay: "Bahía 08 (Bahía Alta Tensión Certificada)",
    commonDTCs: ["BMS_a066", "BMS_f035", "DI_w019"]
  },
  {
    id: "veh-vw-golf",
    vin: "WVWZZZAUZMP049210",
    make: "Volkswagen",
    model: "Golf GTI Performance",
    year: 2021,
    engine: "2.0L TSI EA888 Gen 3",
    powertrainType: "ICE",
    mileageKm: 51800,
    workshopBay: "Bahía 03 (Calibración & Turbo)",
    commonDTCs: ["P0299", "P2015", "P0016"]
  }
];

export const TECHNICAL_KNOWLEDGE_BASE: Record<string, Partial<DiagnosticResponse>> = {
  // Ford F-150 P0301
  "P0301": {
    symptomSummary: "Fallo de encendido detectado en el Cilindro 1 (Misfire). Posible causa: Bobina COP defectuosa, bujía contaminada con carbón/aceite, o inyector de alta presión directo obstruido.",
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Intercambio cruzado de Bobina Coil-on-Plug (COP)",
        procedure: "Retirar la bobina del Cilindro 1 y permutarla con la bobina del Cilindro 2. Borrar códigos DTC con el escáner y realizar prueba de manejo en ciclo de aceleración a 2,500 RPM.",
        toolRequired: "Escáner OBD-II / Ford IDS / FDRS, Dado 8mm y matraca 1/4",
        pinoutOrLocation: "Banco 1 (Lado acompañante), primera bobina frontal",
        expectedValue: "Si el código migra a P0302, la bobina COP está en corto interno o fuga a masa. Si permanece en P0301, el fallo es en bujía, arnés o inyector.",
        actionIfOutOfRange: "Reemplazar bobina COP OEM Motorcraft DG-558."
      },
      {
        stepNumber: 2,
        title: "Medición de resistencia y voltaje de alimentación de arnés",
        procedure: "Desconectar conector de bobina C1201. Con switch en ON (KOEO), medir voltaje entre Pin 1 (Alimentación VPWR) y Masa chasis. Medir continuidad entre Pin 2 (Control PCM) y conector PCM C175B Pin 44.",
        toolRequired: "Multímetro Digital Automotriz CAT III 600V",
        pinoutOrLocation: "Conector C1201: Pin 1 (Azul/Rojo), Pin 2 (Amarillo/Naranja)",
        expectedValue: "Voltaje en Pin 1: 11.8V - 12.6V (Voltaje de batería). Resistencia arnés a PCM < 0.5 Ω.",
        actionIfOutOfRange: "Reparar circuito abierto en arnés motor o revisar fusible F18 (15A) en caja BJB."
      },
      {
        stepNumber: 3,
        title: "Inspección de bujía de Iridio y calibración de gap",
        procedure: "Extraer la bujía del cilindro 1. Inspeccionar desgaste de electrodo central, porcelana rota o depósito aceitoso. Calibrar holgura con calibrador de lainas.",
        toolRequired: "Dado de bujía magnético 5/8 con extensión articulada y calibrador de lainas",
        pinoutOrLocation: "Cilindro 1 Pozo de bujía",
        expectedValue: "Calibración recomendada: 0.030 - 0.033 pulgadas (0.75 - 0.85 mm).",
        actionIfOutOfRange: "Ajustar electrodo de masa o sustituir por bujía Spark Plug OEM CYFS-12Y-PCT."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-f150-spark",
        component: "Bujía Cilindro 1 a cabeza de cilindros",
        torqueNm: 15,
        torqueLbFt: 11,
        torqueLbIn: 133,
        notes: "Instalar en rosca fría. No aplicar lubricante ni anti-seize (altera el par de apriete nominal)."
      },
      {
        id: "trq-f150-coil",
        component: "Tornillo de sujeción bobina COP a tapa de punterías",
        torqueNm: 9,
        torqueLbFt: 6.6,
        torqueLbIn: 80,
        notes: "Apretar firmemente con dado de 8mm sin sobre-apretar el inserto de bronce."
      }
    ],
    sources: [
      {
        id: "src-f150-wsm-303",
        documentTitle: "Ford Workshop Manual F-150 Raptor/3.5L GTDI",
        oemCode: "WSM-303-07C",
        section: "Engine Ignition & Misfire Diagnostics",
        pageNumber: 418,
        system: "POWERTRAIN",
        snippet: "Pinpoint Test HC: Coil On Plug (COP) Ignition Diagnosis & Cylinder Balancing Test. Section 303-07C.",
        relevanceScore: 0.98
      }
    ]
  },

  // Toyota Prius P0A80 & P0A0D (High Voltage)
  "P0A80": {
    symptomSummary: "Deterioro en el Paquete de Batería de Tracción Híbrida (HV Battery Pack Deterioration). Diferencia de voltaje superior a 0.3V entre bloques adyacentes de celdas bajo carga.",
    safetyAlert: {
      severity: "CRITICAL_HV",
      title: "ADVERTENCIA DE SEGURIDAD CRÍTICA: ALTO VOLTAJE 201.6V DC NOMINAL",
      instructions: [
        "Use obligatoriamente Guantes Aislantes Clase 0 (1,000V) certificados y probados con prueba de aire.",
        "Desconecte el interruptor del Service Plug Grip (enchufe de servicio) ubicado en la cajuela y guárdelo en su bolsillo antes de tocar cualquier componente del paquete HV.",
        "Espere un mínimo de 10 MINUTOS para permitir la descarga de los condensadores de alta capacidad del inversor.",
        "Verifique con multímetro CAT III 1000V que el voltaje en los terminales del inversor sea menor a 1.0V antes de proceder."
      ],
      ppeRequired: ["Guantes Aislantes Clase 0 (1,000V)", "Careta de Protección Facial contra Arco Eléctrico", "Botas Dieléctricas de Seguridad"]
    },
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Lectura de Data List de Bloques de Batería HV (Blocks 1 al 14)",
        procedure: "Conectar Toyota Techstream. Acceder a 'Hybrid Control / Data List' y graficar 'Battery Block Voltage 01' hasta 'Battery Block Voltage 14' durante aceleración plena con freno pisado (Stall test controlado a 1,500 RPM, máx 5 seg).",
        toolRequired: "Escáner Toyota Techstream / GTS+",
        pinoutOrLocation: "Conector OBD-II DLC3 bajo tablero lado conductor",
        expectedValue: "La variación máxima permitida entre el bloque de mayor voltaje y el de menor voltaje debe ser inferior a 0.25V.",
        actionIfOutOfRange: "Si un bloque cae por debajo de 13.5V mientras los demás se mantienen en 14.8V, ese módulo de celdas NiMH presenta alta resistencia interna."
      },
      {
        stepNumber: 2,
        title: "Inspección de barra colectora de cobre (Busbar Corrosion)",
        procedure: "Retirar cubierta metálica de batería HV con herramienta aislada 1000V. Inspeccionar tuercas de 8mm y pletinas de cobre en busca de sulfatación verdosa/blanquecina.",
        toolRequired: "Juego de llaves aisladas 1000V VDE y multímetro de micro-ohmios",
        pinoutOrLocation: "Módulos de batería HV 1 a 28",
        expectedValue: "Superficies de contacto limpias, resistencia de unión < 0.05 Ω por puente.",
        actionIfOutOfRange: "Reemplazar arnés de monitoreo de voltaje y barras colectoras OEM Toyota 82165-47040."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-prius-busbar",
        component: "Tuercas de cobre de interconexión de terminales de celda HV (M5)",
        torqueNm: 5.4,
        torqueLbFt: 4.0,
        torqueLbIn: 48,
        notes: "PRECAUCIÓN: No sobre-apretar. El poste de la celda de níquel es frágil y puede quebrarse si supera los 6.0 Nm."
      },
      {
        id: "trq-prius-cover",
        component: "Tornillos de cubierta metálica de carcasa de batería",
        torqueNm: 8.5,
        torqueLbFt: 6.3,
        torqueLbIn: 75,
        notes: "Asegurar el contacto de tierra de la carcasa al chasis para detección de aislamiento."
      }
    ],
    sources: [
      {
        id: "src-prius-rm-080",
        documentTitle: "Toyota Prius Repair Manual - Hybrid System Diagnosis",
        oemCode: "RM34D0U",
        section: "Hybrid / Battery Control System / DTC P0A80",
        pageNumber: 284,
        system: "ELECTRICAL_HV",
        snippet: "Precaution for High Voltage Inspection & Battery Smart Unit DTC P0A80-123 Logic.",
        relevanceScore: 0.99
      }
    ]
  },

  // Chevrolet Silverado P0420
  "P0420": {
    symptomSummary: "Eficiencia del Convertidor Catalítico por debajo del umbral (Banco 1). La capacidad de almacenamiento de oxígeno del sustrato cerámico está degradada.",
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Monitoreo de ondas de Sensor O2 Upstream (Sensor 1) vs Downstream (Sensor 2)",
        procedure: "Calentar motor a temperatura normal de operación (ECT > 85°C). Mantener a 2,000 RPM constantes y observar gráfica de voltaje en el escáner.",
        toolRequired: "Escáner GM GDS2 / MDI o multímetro con función gráfica",
        pinoutOrLocation: "Escape Banco 1 antes y después del convertidor catalítico",
        expectedValue: "Sensor 1 debe conmutar rápidamente entre 0.1V y 0.9V (1-3 Hz). Sensor 2 debe permanecer casi plano y estable entre 0.6V y 0.75V.",
        actionIfOutOfRange: "Si Sensor 2 oscila en espejo idéntico al Sensor 1, el catalizador ha perdido capacidad de almacenamiento catalítico."
      },
      {
        stepNumber: 2,
        title: "Comprobación de fugas de escape antes del sensor O2",
        procedure: "Conectar máquina de humo al tubo de escape o inspeccionar juntas de múltiple de escape Banco 1 en busca de hollín negro.",
        toolRequired: "Detector de fugas de humo y estetoscopio mecánico",
        pinoutOrLocation: "Junta de múltiple de escape a cabeza y brida de bajada",
        expectedValue: "Cero fugas de escape ni entrada parásita de aire frío.",
        actionIfOutOfRange: "Reemplazar junta de escape metálica multicapa antes de condenar el catalizador."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-chevy-o2",
        component: "Sensor de Oxígeno calefactado (O2) en tubo de escape",
        torqueNm: 42,
        torqueLbFt: 31,
        torqueLbIn: 372,
        notes: "Aplicar pasta anti-adherente de alta temperatura en las roscas evitando contaminar la punta del sensor."
      }
    ],
    sources: [
      {
        id: "src-chevy-gmt-p0420",
        documentTitle: "GM Service Information Silverado 1500 V8 Powertrain",
        oemCode: "GMSI-DOC-54219",
        section: "Engine Exhaust / Catalytic Converter Diagnostics",
        pageNumber: 156,
        system: "EMISSIONS",
        snippet: "DTC P0420 or P0430 Diagnostic Procedure & Three-Way Converter Efficiency Evaluation.",
        relevanceScore: 0.96
      }
    ]
  },

  // Volkswagen Golf TSI P0299 (Turbo underboost)
  "P0299": {
    symptomSummary: "Presión de sobrealimentación de turbo insuficiente (Underboost). Presión especificada por ECM no alcanzada en colector de admisión.",
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Inspección de válvula de recirculación / desahogo Diverter Valve (N249)",
        procedure: "Desmontar la electroválvula de recirculación montada directamente en la caracola compresora del turbocargador IHI IS20. Inspeccionar diafragma de goma o pistón de teflón.",
        toolRequired: "Llave Allen 5mm o Torx T30",
        pinoutOrLocation: "Caracola compresora de turbo, parte trasera baja del vano motor",
        expectedValue: "Diafragma sin rasgaduras ni fugas de presión; el pistón debe retornar con suavidad por resorte.",
        actionIfOutOfRange: "Instalar versión actualizada de pistón reforzado OEM VW 06H-145-710-D."
      },
      {
        stepNumber: 2,
        title: "Prueba de estanqueidad de circuito de aire comprimido (Boost Leak Smoke Test)",
        procedure: "Adaptar tapón de prueba en tubo de entrada de turbo. Presurizar el sistema de admisión a 10 PSI con humo.",
        toolRequired: "Máquina de humo con regulador de presión",
        pinoutOrLocation: "Mangueras de intercooler frontal y cuerpo de aceleración",
        expectedValue: "El circuito debe mantener 10 PSI durante al menos 30 segundos sin silbidos ni fuga de humo.",
        actionIfOutOfRange: "Apretar abrazaderas de acople o sustituir manguera agrietada de intercooler."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-vw-diverter",
        component: "Tornillos de fijación de válvula desahogo N249 a turbocargador (3 tornillos)",
        torqueNm: 7,
        torqueLbFt: 5.2,
        torqueLbIn: 62,
        notes: "Cuerpo de aleación de aluminio. Apretar en patrón triangular parejo."
      }
    ],
    sources: [
      {
        id: "src-vw-erwin-turbo",
        documentTitle: "Volkswagen erWin Workshop Repair Manual - 2.0L TSI EA888 Gen 3",
        oemCode: "VW-ERWIN-A005GTI",
        section: "Turbocharging / Intercooling System",
        pageNumber: 312,
        system: "POWERTRAIN",
        snippet: "Checking Charge Pressure Control and Wastegate Actuator Mechanical Linkage.",
        relevanceScore: 0.97
      }
    ]
  }
};
