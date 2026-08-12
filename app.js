/**
 * Aura Palette – Client-Side Interactivity & Simulation
 * Glow Palette — UX/UI & Marketing Team
 */

document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        activeModel: 'cool', // 'cool' or 'warm' or 'custom'
        customImageSrc: null,
        activeStation: 'soft-summer',
        isScanning: false
    };

    // Navigation and UI Elements
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const auraGlowBar = document.getElementById('auraGlowBar');

    // Analyzer Elements
    const btnModelCool = document.getElementById('btnModelCool');
    const btnModelWarm = document.getElementById('btnModelWarm');
    const fileUploadMock = document.getElementById('fileUploadMock');
    const realFileInput = document.getElementById('realFileInput');
    const btnTriggerUpload = document.getElementById('btnTriggerUpload');
    const uploadSuccessIndicator = document.getElementById('uploadSuccessIndicator');
    const btnResetUpload = document.getElementById('btnResetUpload');
    const btnStartAnalysis = document.getElementById('btnStartAnalysis');
    const scanningOverlay = document.getElementById('scanningOverlay');
    const analyzerPortraitImg = document.getElementById('analyzerPortraitImg');
    const drapingPortraitImg = document.getElementById('drapingPortraitImg');

    // Scanning progress elements
    const metricFillTemp = document.getElementById('metricFillTemp');
    const metricValTemp = document.getElementById('metricValTemp');
    const metricFillVal = document.getElementById('metricFillVal');
    const metricValVal = document.getElementById('metricValVal');
    const metricFillCroma = document.getElementById('metricFillCroma');
    const metricValCroma = document.getElementById('metricValCroma');

    // Dashboard Elements
    const stationTabs = document.querySelectorAll('.station-tab');
    const dashboardSection = document.getElementById('dashboard');
    const dashboardSubtitle = document.getElementById('dashboardSubtitle');
    const dashboardTitleText = document.getElementById('dashboardTitleText');
    const drapingBackdrop = document.getElementById('drapingBackdrop');
    const drapeColorTray = document.getElementById('drapeColorTray');
    const powerTrioDisplay = document.getElementById('powerTrioDisplay');
    const colorPaletteGrid = document.getElementById('colorPaletteGrid');
    const makeupRecommendationList = document.getElementById('makeupRecommendationList');
    const jewelryRecommendationDisplay = document.getElementById('jewelryRecommendationDisplay');

    // --- 1. MOBILE NAVIGATION ---
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // --- 2. SETUP MODEL SELECTION ---
    function selectModel(modelType) {
        if (state.isScanning) return;
        
        state.activeModel = modelType;
        
        if (modelType === 'cool') {
            btnModelCool.classList.add('active');
            btnModelWarm.classList.remove('active');
            analyzerPortraitImg.src = 'assets/model_cool.png';
            drapingPortraitImg.src = 'assets/model_cool.png';
            
            // Auto reset custom upload UI
            resetUploadUI();
        } else if (modelType === 'warm') {
            btnModelCool.classList.remove('active');
            btnModelWarm.classList.add('active');
            analyzerPortraitImg.src = 'assets/model_warm.png';
            drapingPortraitImg.src = 'assets/model_warm.png';
            
            // Auto reset custom upload UI
            resetUploadUI();
        }
    }

    btnModelCool.addEventListener('click', () => selectModel('cool'));
    btnModelWarm.addEventListener('click', () => selectModel('warm'));

    // Variable para almacenar el archivo real o resetear
    let selectedFile = null;

    // --- 3. UPLOAD LOGIC ---
    btnTriggerUpload.addEventListener('click', (e) => {
        e.stopPropagation();
        realFileInput.click();
    });
    
    fileUploadMock.addEventListener('click', () => {
        realFileInput.click();
    });

    realFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFile = file; // Guardar referencia al archivo
            const reader = new FileReader();
            reader.onload = (event) => {
                state.activeModel = 'custom';
                state.customImageSrc = event.target.result;
                
                // Update images
                analyzerPortraitImg.src = state.customImageSrc;
                drapingPortraitImg.src = state.customImageSrc;
                
                // Deactivate model buttons
                btnModelCool.classList.remove('active');
                btnModelWarm.classList.remove('active');
                
                // Toggle UIs
                fileUploadMock.style.display = 'none';
                uploadSuccessIndicator.style.display = 'flex';
            };
            reader.readAsDataURL(file);
        }
    });

    function resetUploadUI() {
        realFileInput.value = '';
        state.customImageSrc = null;
        selectedFile = null;
        fileUploadMock.style.display = 'flex';
        uploadSuccessIndicator.style.display = 'none';
    }

    btnResetUpload.addEventListener('click', (e) => {
        e.stopPropagation();
        resetUploadUI();
        // Go back to cool model by default
        selectModel('cool');
    });

    // --- 4. DATASET OF THE 12 COLOR STATIONS ---
    const stationsData = {
        'soft-summer': {
            name: 'Verano Suave (Soft Summer)',
            subtitle: 'Estación Fría, Suave y Clara',
            desc: 'Tu colorimetría está dominada por tonos apagados, fríos y de valor medio-claro. Tu piel resplandece en armonías grises, rosas empolvados y azules lavanda.',
            powerTrio: [
                { name: 'Rose Dust', hex: '#E3C4B8' },
                { name: 'Slate Blue', hex: '#6C7A89' },
                { name: 'Soft Sage', hex: '#8A9A86' }
            ],
            palette: [
                { name: 'Rosa Pastel', hex: '#F2D6D3', type: 'cool' },
                { name: 'Lavanda Muted', hex: '#C2B4C5', type: 'cool' },
                { name: 'Azul Denim', hex: '#58708F', type: 'cool' },
                { name: 'Verde Salvia', hex: '#95A595', type: 'cool' },
                { name: 'Gris Perla', hex: '#D2D7D9', type: 'neutral' },
                { name: 'Marrón Arena', hex: '#B8A99A', type: 'neutral' },
                { name: 'Rosa Viejo', hex: '#C48B9F', type: 'cool' },
                { name: 'Ciruela Claro', hex: '#8F6B7B', type: 'cool' },
                { name: 'Celeste Grisáceo', hex: '#A3B4C4', type: 'cool' },
                { name: 'Verde Eucalipto', hex: '#778E77', type: 'cool' },
                { name: 'Peltre', hex: '#7F8C8D', type: 'neutral' },
                { name: 'Taupe Frío', hex: '#8D7F77', type: 'neutral' },
                { name: 'Frambuesa Suave', hex: '#B04E6A', type: 'cool' },
                { name: 'Violeta Apagado', hex: '#7B6B8F', type: 'cool' },
                { name: 'Azul Acero', hex: '#46627F', type: 'cool' },
                { name: 'Verde Pino Suave', hex: '#4A695E', type: 'cool' },
                { name: 'Gris Carbón', hex: '#4F5D65', type: 'neutral' },
                { name: 'Cacao', hex: '#5D4F46', type: 'neutral' },
                { name: 'Menta Pastel', hex: '#D6E4DB', type: 'cool' },
                { name: 'Orquídea', hex: '#D4A5C9', type: 'cool' },
                { name: 'Azul Hielo', hex: '#D6E4F0', type: 'cool' },
                { name: 'Jade Suave', hex: '#A2C4C1', type: 'cool' },
                { name: 'Arena Suave', hex: '#EAE5DB', type: 'neutral' },
                { name: 'Gris Piedra', hex: '#A8A69F', type: 'neutral' },
                { name: 'Rosa Brezo', hex: '#B27C88', type: 'cool' },
                { name: 'Amatista Muted', hex: '#8D5B8D', type: 'cool' },
                { name: 'Azul Cadete', hex: '#5E748E', type: 'cool' },
                { name: 'Verde Oliva Frío', hex: '#626F55', type: 'cool' },
                { name: 'Humo', hex: '#E1E3E6', type: 'neutral' },
                { name: 'Gris Ceniza', hex: '#9AA0A6', type: 'neutral' }
            ],
            makeup: [
                { category: 'Rubor (Blush)', brand: 'Dior Backstage', name: 'Rosy Glow (Tono 001 Pink)' },
                { category: 'Labial (Lipstick)', brand: 'Glossier', name: 'Generation G (Tono Jam - Berry suave)' },
                { category: 'Sombra de Ojos', brand: 'Chanel', name: 'Les 4 Ombres (Tono 318 Blurry Grey)' },
                { category: 'Delineador', brand: 'Sephora Collection', name: 'Retractable Waterproof (Tono Matte Charcoal)' }
            ],
            jewelry: {
                metals: ['Plata Mate', 'Oro Blanco', 'Platino'],
                desc: 'Los acabados satinados, cepillados o mate son ideales. El brillo excesivo del oro amarillo tradicional compite con tu subtono frío suave.'
            }
        },
        'bright-winter': {
            name: 'Invierno Brillante (Bright Winter)',
            subtitle: 'Estación Fría, Brillante y Oscura',
            desc: 'Tu colorimetría destaca por un contraste extremo, alta saturación y subtono frío. Los colores vibrantes, joya y puros elevan al instante la luminosidad de tu mirada.',
            powerTrio: [
                { name: 'Royal Blue', hex: '#0047AB' },
                { name: 'Magenta', hex: '#D11A5B' },
                { name: 'Emerald', hex: '#008751' }
            ],
            palette: [
                { name: 'Blanco Puro', hex: '#FFFFFF', type: 'neutral' },
                { name: 'Negro Absoluto', hex: '#000000', type: 'neutral' },
                { name: 'Azul Cobalto', hex: '#002FA7', type: 'cool' },
                { name: 'Magenta Puro', hex: '#FF007F', type: 'cool' },
                { name: 'Verde Esmeralda', hex: '#00A86B', type: 'cool' },
                { name: 'Fucsia Neón', hex: '#FF00FF', type: 'cool' },
                { name: 'Rojo Carmín', hex: '#D2143A', type: 'cool' },
                { name: 'Violeta Eléctrico', hex: '#8B00FF', type: 'cool' },
                { name: 'Amarillo Limón', hex: '#FFF700', type: 'cool' },
                { name: 'Azul Turquesa', hex: '#00F5FF', type: 'cool' },
                { name: 'Gris Platino', hex: '#E5E5E5', type: 'neutral' },
                { name: 'Gris Carbón Oscuro', hex: '#2B2B2B', type: 'neutral' },
                { name: 'Frambuesa Brillante', hex: '#E30B5C', type: 'cool' },
                { name: 'Púrpura Imperial', hex: '#6A0DAD', type: 'cool' },
                { name: 'Azul Ultramar', hex: '#120A8F', type: 'cool' },
                { name: 'Verde Jade Vivo', hex: '#00CC99', type: 'cool' },
                { name: 'Plateado Brillante', hex: '#C0C0C0', type: 'neutral' },
                { name: 'Pizarra', hex: '#3E424B', type: 'neutral' },
                { name: 'Cereza', hex: '#DE3163', type: 'cool' },
                { name: 'Ciruela Eléctrico', hex: '#8E1C87', type: 'cool' },
                { name: 'Azul Zafiro', hex: '#0F52BA', type: 'cool' },
                { name: 'Verde Menta Brillante', hex: '#16F529', type: 'cool' },
                { name: 'Blanco Hielo', hex: '#F0F8FF', type: 'neutral' },
                { name: 'Humo Oscuro', hex: '#555555', type: 'neutral' },
                { name: 'Rojo Rubí', hex: '#E0115F', type: 'cool' },
                { name: 'Orquídea Brillante', hex: '#DA70D6', type: 'cool' },
                { name: 'Azul Marino Eléctrico', hex: '#000080', type: 'cool' },
                { name: 'Verde Kelly', hex: '#4CBB17', type: 'cool' },
                { name: 'Plata', hex: '#D7D7D7', type: 'neutral' },
                { name: 'Negro Noche', hex: '#0A0B0C', type: 'neutral' }
            ],
            makeup: [
                { category: 'Labial (Lipstick)', brand: 'M·A·C Cosmetics', name: 'Retro Matte (Tono Ruby Woo - Rojo azulado)' },
                { category: 'Iluminador', brand: 'Fenty Beauty', name: 'Killawatt Liquid Stylist (Tono Metal Foil)' },
                { category: 'Máscara de Pestañas', brand: 'Lancôme', name: 'Lash Idôle (Negro Intenso)' },
                { category: 'Sombras', brand: 'Dior', name: '5 Couleurs Couture (Tono 079 Black Bow)' }
            ],
            jewelry: {
                metals: ['Plata Pulida', 'Platino', 'Oro Blanco Brillante'],
                desc: 'Te favorecen los contrastes muy marcados y los metales con brillo de espejo. Evita metales envejecidos u opacos.'
            }
        },
        'deep-autumn': {
            name: 'Otoño Oscuro (Deep Autumn)',
            subtitle: 'Estación Cálida, Oscura y Suave',
            desc: 'Tu colorimetría está regida por la calidez y la profundidad. Los colores ricos de la tierra forestal, el cobre, el verde oliva y los marrones chocolate armonizan mágicamente con tu tono de piel.',
            powerTrio: [
                { name: 'Forest Green', hex: '#1E352F' },
                { name: 'Burnt Orange', hex: '#C05C2E' },
                { name: 'Chocolate', hex: '#482D20' }
            ],
            palette: [
                { name: 'Terracota', hex: '#D35400', type: 'warm' },
                { name: 'Verde Bosque', hex: '#1E3F20', type: 'warm' },
                { name: 'Mostaza Oscuro', hex: '#B78D12', type: 'warm' },
                { name: 'Rojo Quemado', hex: '#7D0510', type: 'warm' },
                { name: 'Marrón Chocolate', hex: '#3E2723', type: 'neutral' },
                { name: 'Crema Cálido', hex: '#FDF5E6', type: 'neutral' },
                { name: 'Cobre', hex: '#B87333', type: 'warm' },
                { name: 'Verde Oliva', hex: '#556B2F', type: 'warm' },
                { name: 'Calabaza', hex: '#E67E22', type: 'warm' },
                { name: 'Berenjena', hex: '#3B0935', type: 'warm' },
                { name: 'Marrón Café', hex: '#4E3629', type: 'neutral' },
                { name: 'Camel', hex: '#C19A6B', type: 'neutral' },
                { name: 'Rojo Teja', hex: '#8B4513', type: 'warm' },
                { name: 'Verde Musgo', hex: '#4A5D4E', type: 'warm' },
                { name: 'Amarillo Ocre', hex: '#D4A373', type: 'warm' },
                { name: 'Mora Oscuro', hex: '#5C2751', type: 'warm' },
                { name: 'Marrón Castaño', hex: '#795548', type: 'neutral' },
                { name: 'Marfil', hex: '#FFFFF0', type: 'neutral' },
                { name: 'Verde Militar', hex: '#4B5320', type: 'warm' },
                { name: 'Oro Viejo', hex: '#CFB53B', type: 'warm' },
                { name: 'Tomate Seco', hex: '#A03033', type: 'warm' },
                { name: 'Ciruela Profundo', hex: '#4A154B', type: 'warm' },
                { name: 'Bronce', hex: '#CD7F32', type: 'neutral' },
                { name: 'Marrón Tabaco', hex: '#5C4033', type: 'neutral' },
                { name: 'Rojo Caoba', hex: '#671C1E', type: 'warm' },
                { name: 'Verde Ciprés', hex: '#2E3D30', type: 'warm' },
                { name: 'Ámbar', hex: '#FFBF00', type: 'warm' },
                { name: 'Pesto', hex: '#7A8B7B', type: 'warm' },
                { name: 'Gris Cálido', hex: '#8E8D8A', type: 'neutral' },
                { name: 'Trigo', hex: '#F5DEB3', type: 'neutral' }
            ],
            makeup: [
                { category: 'Base/Glow', brand: 'Chanel', name: 'Les Beiges Water-Fresh Tint (Subtonos dorados)' },
                { category: 'Labial (Lipstick)', brand: 'Dior', name: 'Rouge Dior (Tono 844 Trafalgar - Rojo cálido)' },
                { category: 'Paleta de Ojos', brand: 'Sephora Collection', name: 'Pocket Palette (Tono Sun-baked Copper)' },
                { category: 'Rubor (Blush)', brand: 'NARS', name: 'Blush (Tono Taj Mahal - Naranja quemado con destellos)' }
            ],
            jewelry: {
                metals: ['Oro Amarillo Brillante', 'Cobre Pulido', 'Bronce Envejecido'],
                desc: 'La riqueza del oro amarillo tradicional resalta la calidez profunda de tu piel. La plata fría puede darte un aspecto fatigado.'
            }
        },
        'warm-spring': {
            name: 'Primavera Cálida (Warm Spring)',
            subtitle: 'Estación Cálida, Brillante y Clara',
            desc: 'Tu colorimetría vibra con energía, luz y calidez pura. Los tonos frutales brillantes, melocotón dorado, corales encendidos y verdes primaverales iluminan tu rostro instantáneamente.',
            powerTrio: [
                { name: 'Peach Glow', hex: '#FFB894' },
                { name: 'Coral', hex: '#FF6F59' },
                { name: 'Warm Turquoise', hex: '#2EC4B6' }
            ],
            palette: [
                { name: 'Melocotón', hex: '#FFCBA4', type: 'warm' },
                { name: 'Coral Claro', hex: '#FF7F50', type: 'warm' },
                { name: 'Turquesa Cálido', hex: '#40E0D0', type: 'warm' },
                { name: 'Amarillo Narciso', hex: '#FFDF00', type: 'warm' },
                { name: 'Crema Vainilla', hex: '#FFFDD0', type: 'neutral' },
                { name: 'Camel Claro', hex: '#D2B48C', type: 'neutral' },
                { name: 'Albaricoque', hex: '#FBCEB1', type: 'warm' },
                { name: 'Salmón Vivo', hex: '#FF8C69', type: 'warm' },
                { name: 'Verde Manzana', hex: '#8DB600', type: 'warm' },
                { name: 'Oro Claro', hex: '#EEDC82', type: 'warm' },
                { name: 'Beige Cálido', hex: '#F5F5DC', type: 'neutral' },
                { name: 'Marrón Dorado', hex: '#966F33', type: 'neutral' },
                { name: 'Naranja Mandarina', hex: '#FF8000', type: 'warm' },
                { name: 'Rosa Coral', hex: '#F88379', type: 'warm' },
                { name: 'Verde Jade Brillante', hex: '#00C853', type: 'warm' },
                { name: 'Agua Marina', hex: '#7FFFD4', type: 'warm' },
                { name: 'Gris Arena', hex: '#EAE6DF', type: 'neutral' },
                { name: 'Marrón Caramelo', hex: '#C68E17', type: 'neutral' },
                { name: 'Mango', hex: '#F4BB44', type: 'warm' },
                { name: 'Coral Flamenco', hex: '#FC6C85', type: 'warm' },
                { name: 'Verde Menta Cálido', hex: '#AAF0D1', type: 'warm' },
                { name: 'Azul Caribe', hex: '#4DD0E1', type: 'warm' },
                { name: 'Champagne', hex: '#F0E6D2', type: 'neutral' },
                { name: 'Marrón Canela', hex: '#C58917', type: 'neutral' },
                { name: 'Rojo Amapola', hex: '#E23D28', type: 'warm' },
                { name: 'Caléndula', hex: '#FFA000', type: 'warm' },
                { name: 'Verde Esmeralda Claro', hex: '#50C878', type: 'warm' },
                { name: 'Azul Huevo de Pájaro', hex: '#81D4FA', type: 'warm' },
                { name: 'Arena Dorada', hex: '#F3E5AB', type: 'neutral' },
                { name: 'Bronce Claro', hex: '#CD7F32', type: 'neutral' }
            ],
            makeup: [
                { category: 'Lip Glow (Lipstick)', brand: 'Dior Addict', name: 'Lip Glow (Tono 004 Coral - Melocotón translúcido)' },
                { category: 'Rubor Líquido', brand: 'Rare Beauty', name: 'Soft Pinch Liquid Blush (Tono Joy - Coral vibrante)' },
                { category: 'Iluminador', brand: 'Charlotte Tilbury', name: 'Beauty Light Wand (Tono Peachgasm)' },
                { category: 'Sombra', brand: 'Glossier', name: 'Monochromes (Tono Prairie - Tonos oliva y arena cálida)' }
            ],
            jewelry: {
                metals: ['Oro Amarillo Claro', 'Oro Rosa Pulido', 'Latón Brillante'],
                desc: 'Los metales pulidos, brillantes y en tonos dorados cálidos sutiles realzan la vitalidad natural de tu cutis.'
            }
        }
    };

    // Synthesize data for the other 8 sub-stations dynamically based on the 4 masters to keep code compact but functional!
    const allStations = { ...stationsData };
    
    // Add cool-summer (similar to soft-summer but cooler)
    allStations['cool-summer'] = {
        name: 'Verano Frío (Cool Summer)',
        subtitle: 'Estación Fría, Clara y Muted',
        desc: 'Tu colorimetría es decididamente fría y suave. Los tonos azules glaciales, rosas orquídea y grises azulados se funden de manera perfecta con tu piel de base rosada.',
        powerTrio: [
            { name: 'Ice Blue', hex: '#98B4D4' },
            { name: 'Orchid Pink', hex: '#F1A7C4' },
            { name: 'Slate Gray', hex: '#708090' }
        ],
        palette: stationsData['soft-summer'].palette.map(c => c.type === 'cool' ? { ...c, hex: adjustColorBrightness(c.hex, 10) } : c),
        makeup: [
            { category: 'Labial', brand: 'Clinique', name: 'Almost Lipstick (Tono Black Honey)' },
            { category: 'Blush', brand: 'Benefit Cosmetics', name: 'Wanderful World Blush (Tono Dandelion - Rosa frío)' }
        ],
        jewelry: { metals: ['Plata Brillante', 'Platino'], desc: 'El subtono completamente frío de tu piel se complementa exclusivamente con metales plateados.' }
    };

    // Add cool-winter (similar to bright-winter but deeper)
    allStations['cool-winter'] = {
        name: 'Invierno Frío (Cool Winter)',
        subtitle: 'Estación Fría, Oscura y Brillante',
        desc: 'El contraste alto y el subtono frío puro definen tu estación. Los tonos azul marino profundo, rojo cereza y plata líquida son tus mejores aliados.',
        powerTrio: [
            { name: 'Cereza', hex: '#C21E56' },
            { name: 'Azul Marino', hex: '#1F3A52' },
            { name: 'Plata Líquida', hex: '#EAEAEA' }
        ],
        palette: stationsData['bright-winter'].palette.map(c => c.type === 'cool' ? { ...c, hex: adjustColorBrightness(c.hex, -15) } : c),
        makeup: [
            { category: 'Labial', brand: 'Dior', name: 'Rouge Dior (Tono 999 Velvet - Rojo frío universal)' },
            { category: 'Sombra', brand: 'M·A·C', name: 'Dazzleshadow Extreme (Tono Discotheque - Plata cromado)' }
        ],
        jewelry: { metals: ['Plata Pulida', 'Platino'], desc: 'Metales de alto brillo sin notas cálidas. El contraste con tu piel genera elegancia instantánea.' }
    };

    // Add warm-autumn (similar to deep-autumn but warmer and more medium)
    allStations['warm-autumn'] = {
        name: 'Otoño Cálido (Warm Autumn)',
        subtitle: 'Estación Cálida, Muted y Mediana',
        desc: 'Vibras en tonos cálidos y especiados de saturación media. El óxido, la calabaza y los marrones de arcilla son tu máxima representación.',
        powerTrio: [
            { name: 'Pumpkin Spice', hex: '#D35400' },
            { name: 'Golden Olive', hex: '#808000' },
            { name: 'Rust', hex: '#B7410E' }
        ],
        palette: stationsData['deep-autumn'].palette.map(c => c.type === 'warm' ? { ...c, hex: adjustColorBrightness(c.hex, 15) } : c),
        makeup: [
            { category: 'Labial', brand: 'Charlotte Tilbury', name: 'Matte Revolution (Tono Walk of No Shame - Rojo ladrillo)' },
            { category: 'Bronzer', brand: 'Fenty Beauty', name: 'Sun Stalk\'r Instant Warmth (Tono Shady Biz)' }
        ],
        jewelry: { metals: ['Oro Amarillo Rico', 'Cobre Envejecido'], desc: 'Favorece los destellos dorados profundos y texturas orgánicas como metales cepillados o rústicos.' }
    };

    // Add light-spring (similar to warm-spring but lighter/softer)
    allStations['light-spring'] = {
        name: 'Primavera Clara (Light Spring)',
        subtitle: 'Estación Cálida, Clara y Brillante',
        desc: 'Tu paleta es alegre, cálida y de valor muy claro. El melocotón pastel, amarillo sol suave y menta acuosa aportan una frescura etérea a tu imagen.',
        powerTrio: [
            { name: 'Sun Yellow', hex: '#FFEB7A' },
            { name: 'Peach Sorbet', hex: '#FFC8A2' },
            { name: 'Mint Cream', hex: '#D2F8E7' }
        ],
        palette: stationsData['warm-spring'].palette.map(c => ({ ...c, hex: adjustColorBrightness(c.hex, 25) })),
        makeup: [
            { category: 'Glow', brand: 'Glossier', name: 'Futuredew (Aceite hidratante de brillo natural)' },
            { category: 'Lip Oil', brand: 'Gisou', name: 'Honey Infused Lip Oil (Tono Watermelon Hibiscus)' }
        ],
        jewelry: { metals: ['Oro Amarillo Suave', 'Oro Rosa'], desc: 'Los metales delicados y muy finos con acabados pulidos aportan luz sin sobrecargar tu fisionomía clara.' }
    };

    // Add light-summer (similar to soft-summer but lighter and cleaner)
    allStations['light-summer'] = {
        name: 'Verano Claro (Light Summer)',
        subtitle: 'Estación Fría, Clara y Brillante',
        desc: 'Tu colorimetría está dominada por tonos claros y fríos. El rosa bebé, el azul cielo y el verde agua te aportan frescura y juventud.',
        powerTrio: [
            { name: 'Sky Blue', hex: '#87CEEB' },
            { name: 'Baby Pink', hex: '#FFB6C1' },
            { name: 'Aqua', hex: '#00FFFF' }
        ],
        palette: stationsData['soft-summer'].palette.map(c => ({ ...c, hex: adjustColorBrightness(c.hex, 25) })),
        makeup: [
            { category: 'Blush', brand: 'Rare Beauty', name: 'Soft Pinch Liquid Blush (Tono Hope - Rosa malva claro)' },
            { category: 'Gloss', brand: 'Fenty Beauty', name: 'Gloss Bomb Ice (Brillo voluminizador cristalino)' }
        ],
        jewelry: { metals: ['Plata Pulida', 'Oro Blanco Delicado'], desc: 'Joyería fina y luminosa que complementa tu aspecto etéreo.' }
    };

    // Add deep-winter (similar to bright-winter but much darker/blacker)
    allStations['deep-winter'] = {
        name: 'Invierno Oscuro (Deep Winter)',
        subtitle: 'Estación Fría, Oscura y Muted',
        desc: 'Tu colorimetría se define por la profundidad y el subtono frío. Los tonos vino, azul medianoche y negro carbón son tu mejor declaración de estilo.',
        powerTrio: [
            { name: 'Burgundy', hex: '#800020' },
            { name: 'Midnight Blue', hex: '#191970' },
            { name: 'Black Plum', hex: '#301934' }
        ],
        palette: stationsData['bright-winter'].palette.map(c => ({ ...c, hex: adjustColorBrightness(c.hex, -30) })),
        makeup: [
            { category: 'Labial', brand: 'Dior', name: 'Rouge Dior Forever (Tono 100 Forever Nude o 999 Forever Diorella)' },
            { category: 'Lápiz de Ojos', brand: 'Chanel', name: 'Stylo Yeux Waterproof (Tono Noir Intense)' }
        ],
        jewelry: { metals: ['Oro Blanco Bruñido', 'Peltre Pulido', 'Plata Oscura'], desc: 'Los metales con pátinas oscurecidas o de alta pureza aportan un aire de misterio y sofisticación.' }
    };

    // Add soft-autumn (similar to deep-autumn but softer and lighter)
    allStations['soft-autumn'] = {
        name: 'Otoño Suave (Soft Autumn)',
        subtitle: 'Estación Cálida, Muted y Clara',
        desc: 'Los tonos suaves, neutros-cálidos y terrosos te sientan de maravilla. La avena, el verde oliva apagado y el melocotón viejo son ideales.',
        powerTrio: [
            { name: 'Warm Oat', hex: '#EED9C4' },
            { name: 'Olive Drab', hex: '#6B8E23' },
            { name: 'Dusty Rose Gold', hex: '#D8A096' }
        ],
        palette: stationsData['deep-autumn'].palette.map(c => ({ ...c, hex: adjustColorBrightness(c.hex, 20) })),
        makeup: [
            { category: 'Labial', brand: 'Merit Beauty', name: 'Signature Lip (Tono L\'Avenue - Café suave)' },
            { category: 'Blush', brand: 'Glossier', name: 'Cloud Paint (Tono Dusk - Nude cálido)' }
        ],
        jewelry: { metals: ['Oro Rosa Satinado', 'Oro de 14k', 'Latón Mate'], desc: 'Joyería mate y orgánica. Los metales con destellos cobrizos suaves se funden perfectamente con tu tono de piel.' }
    };

    // Add bright-spring (similar to warm-spring but brighter/cooler border)
    allStations['bright-spring'] = {
        name: 'Primavera Brillante (Bright Spring)',
        subtitle: 'Estación Cálida, Brillante y Mediana',
        desc: 'El contraste alto y la calidez luminosa te guían. Los tonos lima vibrantes, mandarina y azul piscina te aportan vitalidad.',
        powerTrio: [
            { name: 'Lime Green', hex: '#32CD32' },
            { name: 'Tangerine', hex: '#FF6347' },
            { name: 'Electric Teal', hex: '#00D2C4' }
        ],
        palette: stationsData['warm-spring'].palette.map(c => c.type === 'warm' ? { ...c, hex: adjustColorBrightness(c.hex, -10) } : c),
        makeup: [
            { category: 'Labial', brand: 'YSL Beauty', name: 'Candy Glaze Lip Gloss Stick (Tono 08 Scenic Peach)' },
            { category: 'Mascara', brand: 'Benefit Cosmetics', name: 'They\'re Real! Magnetic Mascara' }
        ],
        jewelry: { metals: ['Oro Amarillo Pulido', 'Oro Rosa de Alto Brillo'], desc: 'Joyería con alta reflectividad y piedras de colores vivos que destaquen junto a tu contrastado cutis.' }
    };

    // Helper function to shift brightness of hex color (to programmatically create variations)
    function adjustColorBrightness(hex, percent) {
        let R = parseInt(hex.substring(1, 3), 16);
        let G = parseInt(hex.substring(3, 5), 16);
        let B = parseInt(hex.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        R = (R > 0) ? R : 0;
        G = (G > 0) ? G : 0;
        B = (B > 0) ? B : 0;

        const rHex = R.toString(16).padStart(2, '0');
        const gHex = G.toString(16).padStart(2, '0');
        const bHex = B.toString(16).padStart(2, '0');

        return `#${rHex}${gHex}${bHex}`;
    }

    // --- 5. INITIALIZE DASHBOARD POPULATION ---
    function updateDashboard(stationKey) {
        state.activeStation = stationKey;
        const data = allStations[stationKey];
        if (!data) return;

        // Update Subtitle & Title
        dashboardSubtitle.textContent = data.subtitle;
        dashboardTitleText.textContent = data.name;

        // Render Power Trio
        powerTrioDisplay.innerHTML = '';
        data.powerTrio.forEach(color => {
            const card = document.createElement('div');
            card.className = 'power-color-card';
            card.innerHTML = `
                <div class="power-color-preview" style="background-color: ${color.hex};"></div>
                <div class="power-color-info">
                    <span class="power-color-name">${color.name}</span>
                    <span class="power-color-hex">${color.hex.toUpperCase()}</span>
                </div>
            `;
            powerTrioDisplay.appendChild(card);
        });

        // Render Master Palette Grid (30 Colors)
        colorPaletteGrid.innerHTML = '';
        data.palette.forEach(color => {
            const dot = document.createElement('div');
            dot.className = 'palette-color-dot';
            dot.style.backgroundColor = color.hex;
            dot.setAttribute('data-color-name', `${color.name} (${color.hex.toUpperCase()})`);
            
            // Allow clicking palette color to set as drape background
            dot.addEventListener('click', () => {
                setDrapeColor(color.hex);
            });
            
            colorPaletteGrid.appendChild(dot);
        });

        // Render Draping Tray (Use the 8 first colors of the palette)
        drapeColorTray.innerHTML = '';
        const drapeColors = data.palette.slice(0, 8);
        drapeColors.forEach((color, index) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `drape-color-btn ${index === 0 ? 'active' : ''}`;
            btn.style.backgroundColor = color.hex;
            btn.title = color.name;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.drape-color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                setDrapeColor(color.hex);
            });
            drapeColorTray.appendChild(btn);
        });

        // Set default drape backdrop color
        if (drapeColors.length > 0) {
            setDrapeColor(drapeColors[0].hex);
        }

        // Render Makeup Recommendations
        makeupRecommendationList.innerHTML = '';
        data.makeup.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.category}:</strong> ${item.brand} - <span>${item.name}</span>
            `;
            makeupRecommendationList.appendChild(li);
        });

        // Render Jewelry Suggestions
        jewelryRecommendationDisplay.innerHTML = '';
        
        // Badges container
        const badgeContainer = document.createElement('div');
        badgeContainer.style.display = 'flex';
        badgeContainer.style.gap = '0.8rem';
        badgeContainer.style.flexWrap = 'wrap';
        badgeContainer.style.marginBottom = '1rem';
        
        data.jewelry.metals.forEach(metal => {
            const badge = document.createElement('span');
            badge.className = 'metal-badge';
            
            // Assign sub-style based on metal name
            if (metal.includes('Oro Amarillo')) {
                badge.className += ' metal-gold';
                badge.innerHTML = `<i class="fa-solid fa-ring"></i> ${metal}`;
            } else if (metal.includes('Oro Rosa')) {
                badge.className += ' metal-rose-gold';
                badge.innerHTML = `<i class="fa-solid fa-ring"></i> ${metal}`;
            } else {
                badge.className += ' metal-silver';
                badge.innerHTML = `<i class="fa-solid fa-gem"></i> ${metal}`;
            }
            badgeContainer.appendChild(badge);
        });
        
        jewelryRecommendationDisplay.appendChild(badgeContainer);

        // Text explanation
        const descPara = document.createElement('p');
        descPara.className = 'finish-text';
        descPara.textContent = data.jewelry.desc;
        jewelryRecommendationDisplay.appendChild(descPara);

        // Update Aura Glow Bar Top color to first Power Trio color
        if (data.powerTrio.length > 0) {
            auraGlowBar.style.background = `linear-gradient(90deg, var(--color-bg-beige), ${data.powerTrio[0].hex}, ${data.powerTrio[1].hex}, var(--color-bg-cream))`;
        }
    }

    // Set drape backdrop color helper
    function setDrapeColor(hex) {
        drapingBackdrop.style.backgroundColor = hex;
    }

    // --- 6. HANDLE SCANNING SIMULATION FLOW ---
    btnStartAnalysis.addEventListener('click', async () => {
        if (state.isScanning) return;
        
        // Si no subió foto, procesamos según los presets locales
        if (state.activeModel !== 'custom' || !selectedFile) {
            state.isScanning = true;
            btnStartAnalysis.disabled = true;
            btnStartAnalysis.querySelector('span').textContent = 'Analizando...';
            
            // Reset and Show Overlay
            scanningOverlay.style.display = 'flex';
            metricFillTemp.style.width = '0%';
            metricValTemp.textContent = '0%';
            metricFillVal.style.width = '0%';
            metricValVal.textContent = '0%';
            metricFillCroma.style.width = '0%';
            metricValCroma.textContent = '0%';

            // Dynamic targets based on selected model
            let targetTemp = 0; // percentage warm (low is cool)
            let targetVal = 0;  // percentage clarity (low is dark)
            let targetCroma = 0;// percentage saturation (low is muted)
            let targetStation = 'soft-summer';

            if (state.activeModel === 'cool') {
                targetTemp = 24; // Cool
                targetVal = 62;  // Medium-Light
                targetCroma = 35; // Muted (Soft)
                targetStation = 'soft-summer';
            } else if (state.activeModel === 'warm') {
                targetTemp = 86; // Warm
                targetVal = 28;  // Dark
                targetCroma = 45; // Medium Muted
                targetStation = 'deep-autumn';
            }

            // Progress bar animation loop
            let currentProgress = 0;
            const scanInterval = setInterval(() => {
                currentProgress += 2;
                
                // Calculate current slider levels
                const tempVal = Math.min(Math.floor((currentProgress / 100) * targetTemp), targetTemp);
                const valVal = Math.min(Math.floor((currentProgress / 100) * targetVal), targetVal);
                const cromaVal = Math.min(Math.floor((currentProgress / 100) * targetCroma), targetCroma);

                // Update UI Widths
                metricFillTemp.style.width = `${tempVal}%`;
                metricValTemp.textContent = tempVal < 40 ? `Frío (${100 - tempVal * 2}%)` : `Cálido (${tempVal}%)`;
                
                metricFillVal.style.width = `${valVal}%`;
                metricValVal.textContent = valVal < 50 ? `Claro (${100 - valVal * 2}%)` : `Oscuro (${valVal}%)`;
                
                metricFillCroma.style.width = `${cromaVal}%`;
                metricValCroma.textContent = cromaVal < 50 ? `Suave (${100 - cromaVal * 2}%)` : `Brillante (${cromaVal}%)`;

                if (currentProgress >= 100) {
                    clearInterval(scanInterval);
                    
                    // End Analysis
                    setTimeout(() => {
                        scanningOverlay.style.display = 'none';
                        state.isScanning = false;
                        btnStartAnalysis.disabled = false;
                        btnStartAnalysis.querySelector('span').textContent = 'Iniciar Análisis de IA';
                        
                        // Activate corresponding tab in dashboard
                        stationTabs.forEach(tab => {
                            if (tab.getAttribute('data-station') === targetStation) {
                                tab.classList.add('active');
                                tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                            } else {
                                tab.classList.remove('active');
                            }
                        });

                        // Update contents
                        updateDashboard(targetStation);

                        // Scroll to Dashboard smoothly
                        dashboardSection.scrollIntoView({ behavior: 'smooth' });
                    }, 800);
                }
            }, 50);
            return;
        }

        // Real API flow for custom uploads
        state.isScanning = true;
        btnStartAnalysis.disabled = true;
        scanningOverlay.style.display = 'flex';

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Petición al Backend Python
            const response = await fetch('http://localhost:8000/api/analyze-color', {
                method: 'POST',
                body: formData
            });

            const resData = await response.json();

            if (resData.status === 'success') {
                const { temperature, value, chroma, station_key } = resData.data;

                // Actualizar la interfaz gráfica con datos reales obtenidos
                metricFillTemp.style.width = `${temperature}%`;
                metricValTemp.textContent = temperature < 50 ? `Frío (${100 - temperature}%)` : `Cálido (${temperature}%)`;

                metricFillVal.style.width = `${value}%`;
                metricValVal.textContent = value > 50 ? `Claro (${value}%)` : `Oscuro (${100 - value}%)`;

                metricFillCroma.style.width = `${chroma}%`;
                metricValCroma.textContent = chroma < 50 ? `Suave (${100 - chroma}%)` : `Brillante (${chroma}%)`;

                setTimeout(() => {
                    scanningOverlay.style.display = 'none';
                    state.isScanning = false;
                    btnStartAnalysis.disabled = false;

                    // Seleccionar tab y renderizar estación
                    stationTabs.forEach(tab => {
                        if (tab.getAttribute('data-station') === station_key) {
                            tab.classList.add('active');
                            tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        } else {
                            tab.classList.remove('active');
                        }
                    });

                    updateDashboard(station_key);
                    dashboardSection.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            } else {
                throw new Error(resData.detail || "Error en el análisis de color");
            }
        } catch (error) {
            console.error("Error analizando la imagen:", error);
            alert("Ocurrió un error al procesar la imagen en el servidor.");
            scanningOverlay.style.display = 'none';
            state.isScanning = false;
            btnStartAnalysis.disabled = false;
        }
    });

    // --- 7. STATION TAB CHANGING EVENT ---
    stationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (state.isScanning) return;

            stationTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const stationKey = tab.getAttribute('data-station');
            
            // If viewing a different model station, automatically switch the portraits to match Undertones to be premium!
            if (stationKey.includes('autumn') || stationKey.includes('spring')) {
                // Warm Undertones
                drapingPortraitImg.src = state.customImageSrc ? state.customImageSrc : 'assets/model_warm.png';
            } else {
                // Cool Undertones
                drapingPortraitImg.src = state.customImageSrc ? state.customImageSrc : 'assets/model_cool.png';
            }

            updateDashboard(stationKey);
        });
    });

    // Initialize with default dashboard details (Soft Summer)
    updateDashboard('soft-summer');
});
