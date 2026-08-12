const STATIONS_GUIDE_DATABASE = {
  // --- PRIMAVERA / SPRING (CÁLIDO, CLARO, BRILLANTE/SUAVE) ---
  "warm-spring": {
    name: "Primavera Cálida",
    jewelry: {
      bestMetals: ["Oro Amarillo (18k-24k)", "Oro Rosa Cálido", "Bronce Pulido"],
      avoidMetals: ["Plata de Ley Opaca", "Peltre", "Titanio Oscuro"],
      finishes: ["Brillante", "Efecto Espejo", "Satinado Cálido"],
      recommendedGems: [
        { name: "Ojo de Tigre / Citrino", desc: "Aporta luminosidad y armoniza con reflejos dorados." },
        { name: "Turquesa Cálida", desc: "El contraste ideal para resaltar ojos y piel cálida." },
        { name: "Coral & Perlas Crema", desc: "Suavizan los rasgos con elegancia natural." }
      ],
      stylingTip: "Mezcla piezas de oro amarillo pulido con piedras cálidas para potenciar el brillo natural de tu rostro."
    },
    makeup: {
      undertone: "Cálido / Dorado",
      foundations: ["Subtono Dorado / Peach", "BB Cream con acabado Radiante/Dewy"],
      lips: [
        { name: "Coral Radiante", hex: "#FF6F61" },
        { name: "Nude Melocotón", hex: "#E7987D" },
        { name: "Rojo Tomate / Cálido", hex: "#D33F29" }
      ],
      blush: ["Melocotón Intenso", "Coral Brillante", "Albaricoque"],
      eyeshadows: ["Bronce Cálido", "Oro Champagne", "Cobre", "Marrón Avellana"],
      eyeliner: ["Marrón Dorado", "Verde Oliva", "Cobre"],
      finishesAdvice: "Opta por acabados jugosos (Dewy/Satinado). Evita los labiales y bases ultra mate que apagan tu luminosidad."
    }
  },

  "light-spring": {
    name: "Primavera Clara",
    jewelry: {
      bestMetals: ["Oro Claro (10k-14k)", "Oro Rosa Suave", "Plata Champagne"],
      avoidMetals: ["Bronce Muy Oscuro", "Cobre Envejecido", "Metales Pavonados"],
      finishes: ["Luminoso", "Fino", "Delicado"],
      recommendedGems: [
        { name: "Aguamarina Cálida", desc: "Aporta frescura sin saturar los tonos delicados." },
        { name: "Cuarzo Rosa", desc: "Complementa la suavidad del tono de piel." },
        { name: "Perlas Akoya Doradas", desc: "Elegancia sutil y luminosa." }
      ],
      stylingTip: "Prefiere joyería de trazo fino y delicado; las piezas demasiado pesadas o masculinas pueden opacar tus rasgos suaves."
    },
    makeup: {
      undertone: "Neutro-Cálido Claro",
      foundations: ["Subtono Neutro con destellos Dorados", "Cobertura Ligera/Luminosa"],
      lips: [
        { name: "Rosa Melocotón", hex: "#F29F97" },
        { name: "Coral Pastel", hex: "#F7A38B" },
        { name: "Nude Rosado Suave", hex: "#DDA7A5" }
      ],
      blush: ["Rosa Albaricoque", "Melocotón Claro"],
      eyeshadows: ["Vainilla Radiante", "Champagne Pastel", "Marrón Suave", "Rosa Melocotón"],
      eyeliner: ["Marrón Claro", "Taupe Cálido"],
      finishesAdvice: "Sombras satinadas ligeras y gloss de labios. El maquillaje recargado o ahumado negro endurecerá tu rostro."
    }
  },

  // --- OTOÑO / AUTUMN (CÁLIDO, OSCURO, PROFUNDO/SUAVE) ---
  "warm-autumn": {
    name: "Otoño Cálido",
    jewelry: {
      bestMetals: ["Oro Envejecido / Antiguo", "Cobre", "Bronce MATE", "Oro Amarillo Intenso"],
      avoidMetals: ["Plata Fina Brillante", "Platino", "Rodio Blanco"],
      finishes: ["Texturizado", "Martillado", "Mate / Antiguo"],
      recommendedGems: [
        { name: "Ámbar", desc: "Refleja la calidez vegetal y terracota de tu paleta." },
        { name: "Granate Cálido", desc: "Profundidad elegante para eventos nocturnos." },
        { name: "Jade Verde / Malaquita", desc: "Resalta el subtono dorado y marrón de los ojos." }
      ],
      stylingTip: "Los acabados martillados y mate en oro viejo o cobre encajan a la perfección con la riqueza y calidez de tu piel."
    },
    makeup: {
      undertone: "Cálido / Terracota",
      foundations: ["Subtono Cálido Bronce / Dorado", "Acabado Natural Mate"],
      lips: [
        { name: "Terracota", hex: "#C05A46" },
        { name: "Rojo Ladrillo", hex: "#9E2A2B" },
        { name: "Nude Miel", hex: "#B87333" }
      ],
      blush: ["Bronce Melocotón", "Terracota Suave", "Tostado"],
      eyeshadows: ["Cobre Oscuro", "Marrón Chocolate", "Verde Oliva", "Oro Viejo"],
      eyeliner: ["Marrón Espreso", "Verde Musgo"],
      finishesAdvice: "Los polvos bronceadores y sombreados ahumados en tonos cálidos crean un look sofisticado e impactante."
    }
  },

  // --- INVIERNO / WINTER (FRÍO, OSCURO/BRILLANTE) ---
  "deep-winter": {
    name: "Invierno Profundo",
    jewelry: {
      bestMetals: ["Plata de Ley (High Polish)", "Platino", "Oro Blanco", "Oro Negro / Titanio"],
      avoidMetals: ["Oro Amarillo Dorado", "Cobre", "Bronce Mate"],
      finishes: ["Espejo", "Pulido de Alto Brillo", "Pavonado Oscuro"],
      recommendedGems: [
        { name: "Zafiro Azul", desc: "Aporta contraste dramático y elegancia fría." },
        { name: "Rubí Profundo", desc: "El rojo frío perfecto para ocasiones de gala." },
        { name: "Ónice Negro / Diamante", desc: "Define la estructura facial con máximo contraste." }
      ],
      stylingTip: "Aposta por el máximo contraste: joyas en plata brillante o de líneas geométricas oscuras."
    },
    makeup: {
      undertone: "Frío / Frío-Neutro Profundo",
      foundations: ["Subtono Frío/Rosado o Neutro", "Cobertura Media-Alta Semimate"],
      lips: [
        { name: "Rojo Borgoña / Vino", hex: "#6B1D2F" },
        { name: "Rojo Rubí Frío", hex: "#A6192E" },
        { name: "Ciruela Oscuro", hex: "#4A1525" }
      ],
      blush: ["Rosa Ciruela", "Berry Frío", "Rosa Mermelada"],
      eyeshadows: ["Gris Pizarra", "Negro Azabache", "Ciruela Profundo", "Plata Metálica"],
      eyeliner: ["Negro Intenso", "Azul Marino Oscuro"],
      finishesAdvice: "Labiales de alta pigmentación en acabado mate o satinado. Los delineados negros definidos son ideales."
    }
  },

  // --- VERANO / SUMMER (FRÍO, CLARO, SUAVE) ---
  "soft-summer": {
    name: "Verano Suave",
    jewelry: {
      bestMetals: ["Plata Cepillada", "Oro Blanco Mate", "Peltre", "Oro Rosa Frío"],
      avoidMetals: ["Oro Amarillo Intenso", "Cobre Brillante"],
      finishes: ["Mate", "Satinado", "Efecto Cepillado"],
      recommendedGems: [
        { name: "Amatista Suave", desc: "Harmoniza con el aura tenue y sofisticada de tu piel." },
        { name: "Piedra de Luna", desc: "Destellos apagados y marianos." },
        { name: "Perlas Grises o Rosadas", desc: "Suavidad absoluta sin destellos estridentes." }
      ],
      stylingTip: "Evita el exceso de brillo; los metales cepillados y las piedras opacas o traslúcidas son tus mejores aliados."
    },
    makeup: {
      undertone: "Frío / Neutro Aterciopelado",
      foundations: ["Subtono Frío Neutro", "Acabado Terciopelo / Natural"],
      lips: [
        { name: "Malva Frío", hex: "#996666" },
        { name: "Rosa Empolvado", hex: "#D8A7B1" },
        { name: "Berry Suave", hex: "#8C5366" }
      ],
      blush: ["Rosa Antiguo", "Malva Suave"],
      eyeshadows: ["Taupe Frío", "Gris Humo Suave", "Rosa Ceniza", "Marrón Frío"],
      eyeliner: ["Gris Carbón", "Marrón Frío"],
      finishesAdvice: "El efecto difuminado (Smokey neutro) y tonos monocromáticos malva / rosa empolvado favorecen tu armonía."
    }
  }
};
