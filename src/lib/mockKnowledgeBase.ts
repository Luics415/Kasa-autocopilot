import { VehicleProfile, DiagnosticResponse } from "./types";

export const SAMPLE_VEHICLES: VehicleProfile[] = [
  {
    id: "veh-nissan-versa",
    vin: "3N1CN8EV9NL109283",
    make: "Nissan",
    model: "Versa Sense / Advance (México)",
    year: 2022,
    engine: "1.6L HR16DE 4 Cilindros (118 HP)",
    powertrainType: "GASOLINA",
    mileageKm: 58400,
    workshopBay: "Bahía 01 (Mecánica Rápida y Afinación)",
    commonDTCs: ["P0300", "P0301", "P0171"],
    popularInMexico: true
  },
  {
    id: "veh-vw-jetta",
    vin: "3VWD17AJ4MM084920",
    make: "Volkswagen",
    model: "Jetta Trendline / R-Line (Puebla)",
    year: 2021,
    engine: "1.4L TSI Turbo EA211 (150 HP)",
    powertrainType: "GASOLINA",
    mileageKm: 64200,
    workshopBay: "Bahía 03 (Diagnóstico Electrónico)",
    commonDTCs: ["P0420", "P0299", "P0130"],
    popularInMexico: true
  },
  {
    id: "veh-toyota-prius",
    vin: "JTDKN3DU5L1084920",
    make: "Toyota",
    model: "Prius Hybrid Synergy Drive",
    year: 2020,
    engine: "1.8L 2ZR-FXE Híbrido (201.6V DC)",
    powertrainType: "HIBRIDO",
    mileageKm: 98100,
    workshopBay: "Bahía 05 (Alta Tensión / Híbridos)",
    commonDTCs: ["P0A80", "P0A0D", "P0AA6"],
    popularInMexico: true
  },
  {
    id: "veh-chevy-onix",
    vin: "3G1BE6SM5NG198302",
    make: "Chevrolet",
    model: "Onix Premier / Tracker Turbo",
    year: 2023,
    engine: "1.2L Turbo E-Turbo 3 Cilindros",
    powertrainType: "GASOLINA",
    mileageKm: 34500,
    workshopBay: "Bahía 02 (Sobrealimentación & Turbo)",
    commonDTCs: ["P0299", "P0521", "P0016"],
    popularInMexico: true
  },
  {
    id: "veh-ford-lobo",
    vin: "1FTFW1ED4NFA10982",
    make: "Ford",
    model: "Lobo / F-150 Lariat 4x4",
    year: 2022,
    engine: "3.5L V6 Twin-Turbo EcoBoost D35",
    powertrainType: "GASOLINA",
    mileageKm: 74200,
    workshopBay: "Bahía 04 (Tren Motriz Pesado)",
    commonDTCs: ["P0301", "P0016", "P0087"],
    popularInMexico: true
  }
];

export const TECHNICAL_KNOWLEDGE_BASE: Record<string, Partial<DiagnosticResponse>> = {
  // Nissan Versa P0301 / P0300
  "P0301": {
    symptomSummary: "Fallo de combustión en Cilindro 1 (Misfire). El motor tiembla en ralentí en semáforos y parpadea el testigo Check Engine. Causa frecuente: Bobina de encendido desvalorizada o bujía de iridio con carbón.",
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Intercambio cruzado de Bobinas de Encendido (Cilindro 1 ↔ Cilindro 2)",
        procedure: "Retirar el resonador de admisión plástico. Con dado de 10mm, desmontar la bobina del Cilindro 1 y permutarla con la bobina del Cilindro 2. Borrar códigos con escáner y arrancar motor a 2,000 RPM durante 2 minutos.",
        toolRequired: "Escáner OBD-II (Launch / Autel / Consult), Dado 10mm y matraca 1/4",
        pinoutOrLocation: "Frente del motor, cilindro más cercano a la banda de accesorios",
        expectedValue: "Si el código migra a P0302, la bobina Hitachi tiene fuga de chispa interna. Si se queda en P0301, el problema es bujía, compresión o inyector.",
        actionIfOutOfRange: "Reemplazar bobina de encendido OEM Nissan / Hanshin número de parte 22448-1KT0A."
      },
      {
        stepNumber: 2,
        title: "Comprobación de voltaje de alimentación y tierra en conector de 3 pines",
        procedure: "Con switch en ON (motor apagado), medir voltaje entre Pin 1 (Alimentación 12V Batería) y masa de motor. Medir continuidad a chasis en Pin 2.",
        toolRequired: "Multímetro automotriz digital CAT III",
        pinoutOrLocation: "Conector bobina: Pin 1 (Azul - 12V), Pin 2 (Negro - Tierra), Pin 3 (Señal ECM)",
        expectedValue: "Pin 1: 12.0V a 12.6V. Pin 2: menos de 0.2 Ω respecto a masa de batería.",
        actionIfOutOfRange: "Si no hay voltaje, verificar fusible de encendido (15A) en caja IPDM junto a la batería."
      },
      {
        stepNumber: 3,
        title: "Calibración e inspección de bujía NGK DILKAR7D11H",
        procedure: "Extraer bujía con dado de 14mm de pared delgada. Verificar si el electrodo de iridio presenta desgaste o rosca empapada de aceite por junta de punterías.",
        toolRequired: "Dado para bujías 14mm de pared delgada con retén de goma y calibrador de hojas",
        pinoutOrLocation: "Pozo de bujía Cilindro 1",
        expectedValue: "Abertura de electrodo nominal: 1.1 mm (0.044 pulgadas).",
        actionIfOutOfRange: "Reemplazar las 4 bujías por bujías de Iridio originales NGK DILKAR7D11H."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-versa-bujia",
        component: "Bujías de encendido en cabeza de aluminio (14mm)",
        torqueNm: 19.6,
        torqueLbFt: 14.5,
        torqueLbIn: 174,
        notes: "Apretar en frío. No aplicar grasa en las roscas para no falsear el torque nominal."
      },
      {
        id: "trq-versa-bobina",
        component: "Tornillo de fijación de bobina a tapa de punterías (M6)",
        torqueNm: 7.0,
        torqueLbFt: 5.2,
        torqueLbIn: 62,
        notes: "No exceder 7 N·m para evitar degollar el inserto roscado plástico."
      }
    ],
    sources: [
      {
        id: "src-nissan-versa-em",
        documentTitle: "Manual de Taller Oficial Nissan Versa / V-Drive (Chasis N17/N18)",
        oemCode: "SM20EM-HR16-MEX",
        section: "Sección EM - Control de Motor y Sistema de Encendido",
        pageNumber: 342,
        system: "POWERTRAIN",
        snippet: "Procedimiento de prueba de bobinas de encendido con transistor de potencia integrado y tabla de torques de cabeza HR16DE.",
        relevanceScore: 0.99
      }
    ]
  },

  // Volkswagen Jetta P0420
  "P0420": {
    symptomSummary: "Eficiencia del Convertidor Catalítico por debajo del límite permisible (Banco 1). La computadora del motor detecta que el catalizador no retiene suficiente oxígeno.",
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Monitoreo en vivo de Sensor de Oxígeno Pre-catalizador (B1S1) vs Post-catalizador (B1S2)",
        procedure: "Conectar escáner VAG / VCDS. Conducir hasta que el refrigerante alcance 90°C. Mantener motor a 2,200 RPM estables y observar canal de datos.",
        toolRequired: "Escáner VCDS (VAG-COM), ODIS o escáner multimarcas con gráfica en vivo",
        pinoutOrLocation: "Escape tras el turbocargador antes y después de la petaca catalítica",
        expectedValue: "Sensor 1 (Banda ancha) debe oscilar rápidamente. Sensor 2 debe permanecer casi plano y estable entre 0.65V y 0.75V.",
        actionIfOutOfRange: "Si el Sensor 2 copia las oscilaciones del Sensor 1 en espejo, el catalizador ha perdido su recubrimiento de metales preciosos."
      },
      {
        stepNumber: 2,
        title: "Detección de fugas de gases en flexible y abrazadera de bajada de turbo",
        procedure: "Inspeccionar con detector de humo o agua jabonosa la unión entre la salida de la caracola de escape y el tubo flexible.",
        toolRequired: "Lámpara de inspección y máquina generadora de humo",
        pinoutOrLocation: "Abrazadera V-Band de salida de turbo EA211",
        expectedValue: "Cero presencia de hollín negro ni soplido audible en juntas.",
        actionIfOutOfRange: "Cambiar abrazadera y junta metálica cónica OEM VW 1K0-253-115-T antes de cambiar el catalizador."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-jetta-o2",
        component: "Sensor Lambda post-catalizador (Llave 22mm ranurada)",
        torqueNm: 50,
        torqueLbFt: 36.8,
        notes: "Aplicar pasta cerámica lubricante exclusivamente en la rosca sin tocar la cápsula sensora."
      },
      {
        id: "trq-jetta-vband",
        component: "Abrazadera V-Band bajada de turbo a catalizador",
        torqueNm: 25,
        torqueLbFt: 18.4,
        notes: "Alinear correctamente el labio cónico antes de apretar."
      }
    ],
    sources: [
      {
        id: "src-vw-jetta-erwin",
        documentTitle: "Volkswagen erWin Manual de Reparaciones - Jetta Sedán 1.4 TSI",
        oemCode: "VW-ERWIN-JETTA7-EA211",
        section: "Sistema de Escape y Depuración de Gases de Escape",
        pageNumber: 189,
        system: "EMISSIONS",
        snippet: "Comprobación del envejecimiento de sondas lambda y diagnóstico de eficiencia catalítica P0420.",
        relevanceScore: 0.98
      }
    ]
  },

  // Toyota Prius P0A80 (Alta Tensión)
  "P0A80": {
    symptomSummary: "Deterioro en el Paquete de Batería de Tracción Híbrida (HV Battery Pack). Diferencia de voltaje superior a 0.3V entre bloques de celdas bajo aceleración.",
    safetyAlert: {
      severity: "CRITICAL_HV",
      title: "PELIGRO DE MUERTE: CIRCUITO DE ALTO VOLTAJE 201.6V CORRIENTE DIRECTA (DC)",
      instructions: [
        "Use obligatoriamente Guantes Dieléctricos Clase 0 (certificados a 1,000V) con guantes de protección mecánica de cuero encima.",
        "Retire la clavija de servicio (Service Plug Grip) ubicada en la cajuela, gírela 90° y guárdela en su bolsillo para evitar reconexiones accidentales.",
        "Espere OBLIGATORIAMENTE 10 MINUTOS para que los condensadores del inversor se descarguen por completo.",
        "Mida con multímetro CAT III 1,000V en los bornes del inversor. Verifique que el voltaje sea MENOR A 1.0 VOLT antes de tocar cualquier cable naranja."
      ],
      ppeRequired: ["Guantes Dieléctricos Clase 0 (1,000V)", "Careta Facial contra Arco Eléctrico", "Botas Dieléctricas de Casco No Metálico"]
    },
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Lectura de bloques de batería 01 al 14 con Techstream",
        procedure: "Ingresar a 'Hybrid Control / Data List'. Monitorear 'Battery Block 01 Voltage' hasta 'Block 14 Voltage' mientras se aplica prueba de calado (freno pisado y acelerador a fondo en directa durante 5 seg máx).",
        toolRequired: "Escáner Toyota Techstream / GTS+ o Autel MaxiSys Elite",
        pinoutOrLocation: "Conector OBD-II bajo el volante a la izquierda",
        expectedValue: "La diferencia de voltaje entre el bloque más alto y el más bajo no debe superar 0.25V.",
        actionIfOutOfRange: "Identificar el bloque desbalanceado (usualmente bloques centrales 6 al 9 por sobrecalentamiento de ventilador)."
      },
      {
        stepNumber: 2,
        title: "Inspección de corrosión en pletinas de cobre de interconexión (Busbars)",
        procedure: "Con clavija desconectada y EPP puesto, desmontar la tapa superior. Revisar si las tuercas de 8mm tienen sulfato blanco o verde que falsea la lectura del BMS.",
        toolRequired: "Juego de dados y matracas aisladas 1,000V VDE",
        pinoutOrLocation: "Regleta lateral de módulos de batería NiMH",
        expectedValue: "Superficies de cobre brillantes, resistencia de contacto menor a 0.05 Ω.",
        actionIfOutOfRange: "Limpiar o sustituir el arnés de sensores de voltaje OEM Toyota 82165-47040."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-prius-tuercas",
        component: "Tuercas de cobre terminales de celda de batería (M5)",
        torqueNm: 5.4,
        torqueLbFt: 4.0,
        torqueLbIn: 48,
        notes: "PRECAUCIÓN EXTREMA: El vástago roscado de la celda de níquel es frágil. Si se pasa de 6 N·m, se romperá la celda."
      },
      {
        id: "trq-prius-tapa",
        component: "Tornillos de cubierta metálica de paquete HV a chasis",
        torqueNm: 8.5,
        torqueLbFt: 6.3,
        torqueLbIn: 75,
        notes: "Garantiza la masa para el detector de fugas de aislamiento del vehículo."
      }
    ],
    sources: [
      {
        id: "src-toyota-prius-rm",
        documentTitle: "Manual de Taller Toyota Prius HSD - Sistema Híbrido",
        oemCode: "RM34D0U-MEX",
        section: "Diagnóstico de Batería de Tracción y Códigos DTC P0A80 / P0A0D",
        pageNumber: 284,
        system: "ELECTRICAL_HV",
        snippet: "Medidas de seguridad en alto voltaje y procedimiento de reemplazo de celdas en paquete de tracción.",
        relevanceScore: 0.99
      }
    ]
  },

  // Chevrolet Onix Turbo P0299
  "P0299": {
    symptomSummary: "Baja presión de sobrealimentación de turbocargador (Underboost). El motor pierde potencia en subidas o rebases y enciende el testigo de falla.",
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Prueba de estanqueidad en tuberías y enfriador de aire (Intercooler)",
        procedure: "Adaptar tapón de prueba con manómetro en la entrada del turbo. Presurizar el sistema a 12 PSI con máquina de humo.",
        toolRequired: "Generador de humo automotriz y manómetro de baja presión (0-30 PSI)",
        pinoutOrLocation: "Mangueras de intercooler detrás de la fascia delantera",
        expectedValue: "La presión debe mantenerse estable por 30 segundos sin fugas audibles ni escape de humo.",
        actionIfOutOfRange: "Apretar abrazaderas o cambiar manguera de intercooler fisurada."
      },
      {
        stepNumber: 2,
        title: "Comprobación de solenoide de válvula Wastegate y actuador de vacío",
        procedure: "Conectar bomba de vacío manual al pulmón del turbo. Aplicar 15 inHg de vacío.",
        toolRequired: "Bomba de vacío manual Mityvac con manómetro",
        pinoutOrLocation: "Pulmón actuador wastegate sobre la caracola de escape",
        expectedValue: "La varilla debe desplazarse 8 a 10 mm con suavidad y sostener el vacío sin caer.",
        actionIfOutOfRange: "Reemplazar válvula solenoide de control de presión de turbo OEM GM 55574902."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-onix-turbo",
        component: "Tornillos de fijación de líneas de aceite y refrigerante a turbo",
        torqueNm: 10,
        torqueLbFt: 7.4,
        notes: "Usar siempre arandelas de cobre nuevas para evitar fugas de aceite hacia el escape."
      }
    ],
    sources: [
      {
        id: "src-gm-onix-turbo",
        documentTitle: "Información de Servicio Chevrolet Onix / Tracker Turbo",
        oemCode: "GMSI-DOC-ONIX-MEX",
        section: "Motor 1.2L E-Turbo - Sistema de Inducción de Aire",
        pageNumber: 215,
        system: "POWERTRAIN",
        snippet: "Árbol de diagnóstico para DTC P0299 y calibración de varilla de compuerta de alivio.",
        relevanceScore: 0.97
      }
    ]
  },

  // Ford Lobo P0016
  "P0016": {
    symptomSummary: "Desfase en la correlación de posición de árbol de levas y cigüeñal (Banco 1, Sensor A). Ruido de cascabeleo o traqueteo al encender en frío por estiramiento de cadena de distribución.",
    diagnosticSteps: [
      {
        stepNumber: 1,
        title: "Lectura de ángulo de avance VCT con osciloscopio o escáner FDRS",
        procedure: "Conectar canales de osciloscopio a sensor CKP (cigüeñal) y sensor CMP (árbol de levas admisión Banco 1). Comparar los pulsos del diente de referencia.",
        toolRequired: "Osciloscopio automotriz de 2 o 4 canales / Escáner Ford FDRS",
        pinoutOrLocation: "Sensores CMP en la parte trasera de las tapas de punterías",
        expectedValue: "El diente de sincronización debe coincidir con una tolerancia menor a ±3° con motor caliente en ralentí.",
        actionIfOutOfRange: "Si el desfase supera 6°, la cadena de distribución principal presenta elongación o el engrane variador VCT no traba en reposo."
      },
      {
        stepNumber: 2,
        title: "Inspección de presión de aceite del motor en filtro de solenoide VCT",
        procedure: "Roscar manómetro mecánico en el puerto de presión de la cabeza de cilindros. Medir presión con aceite a 90°C.",
        toolRequired: "Manómetro de presión de aceite hidráulico 0-100 PSI",
        pinoutOrLocation: "Galería de lubricación principal del bloque motor",
        expectedValue: "Mínimo 15 PSI en ralentí y 30-45 PSI a 2,000 RPM.",
        actionIfOutOfRange: "Si la presión es baja, revisar coladera de bomba de aceite obstruida por restos de silicón o lodos."
      }
    ],
    torqueSpecs: [
      {
        id: "trq-ford-vct",
        component: "Tornillos de engrane variador de árbol de levas VCT",
        torqueNm: 40,
        torqueLbFt: 29.5,
        notes: "Paso 1: 40 N·m. Paso 2: Apretar 90 grados adicionales con goniómetro de ángulo."
      }
    ],
    sources: [
      {
        id: "src-ford-lobo-wsm",
        documentTitle: "Manual de Taller Ford Lobo / F-150 3.5L EcoBoost",
        oemCode: "WSM-303-01D-MEX",
        section: "Mecanismo de Distribución y Sistema de Avance Variable VCT",
        pageNumber: 512,
        system: "POWERTRAIN",
        snippet: "Prueba de correlación CKP-CMP y procedimiento de reemplazo del kit de cadena y tensores hidráulicos.",
        relevanceScore: 0.98
      }
    ]
  }
};
