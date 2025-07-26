// --- Evento que se ejecuta cuando el contenido del HTML ha sido cargado ---
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Definición de Datos de la Carrera ---
    // Almacena toda la información de los ramos y sus requisitos.
    // Es mucho más fácil de mantener aquí que directamente en el HTML.
    const ramosData = [
        // 1er Año
        { id: '1276', nombre: 'Introducción al Diseño Gráfico', año: 1, requisitos: [] },
        { id: '1277', nombre: 'Diseño Gráfico Digital I', año: 1, requisitos: [] },
        { id: '1278', nombre: 'Tecnología Gráfica I', año: 1, requisitos: [] },
        { id: '1279', nombre: 'Elementos del Diseño I', año: 1, requisitos: [] },
        { id: '1280', nombre: 'Diseño Gráfico I', año: 1, requisitos: [] },
        { id: '1281', nombre: 'Introducción a la Historia del Diseño', año: 1, requisitos: [] },
        { id: '1282', nombre: 'Diseño Gráfico Digital II', año: 1, requisitos: ['1277'] },
        { id: '1283', nombre: 'Tipografía I', año: 1, requisitos: [] },
        { id: '1284', nombre: 'Fotografía', año: 1, requisitos: [] },
        // 2do Año
        { id: '1285', nombre: 'Diseño Gráfico II', año: 2, requisitos: ['1276', '1280'] },
        { id: '1286', nombre: 'Historia del Diseño I', año: 2, requisitos: [] },
        { id: '1287', nombre: 'Teoría de la Comunicación', año: 2, requisitos: [] },
        { id: '1288', nombre: 'Elementos del Diseño II', año: 2, requisitos: ['1279'] },
        { id: '1289', nombre: 'Diseño Gráfico III', año: 2, requisitos: ['1285'] },
        { id: '1290', nombre: 'Tipografía II', año: 2, requisitos: ['1283'] },
        { id: '1291', nombre: 'Tecnología Gráfica II', año: 2, requisitos: ['1278'] },
        { id: '1292', nombre: 'Diseño Gráfico Digital III', año: 2, requisitos: ['1282'] },
        { id: '1293', nombre: 'Estructuras Publicitarias', año: 2, requisitos: [] },
        // 3er Año
        { id: '1294', nombre: 'Diseño Gráfico IV', año: 3, requisitos: ['1288'] },
        { id: '1295', nombre: 'Historia del Diseño II', año: 3, requisitos: ['1286'] },
        { id: '1297', nombre: 'Diseño Gráfico V', año: 3, requisitos: ['1294'] },
        { id: '1298', nombre: 'Legislación', año: 3, requisitos: [] },
        { id: '1300', nombre: 'Semiótica del Lenguaje Publicitario', año: 3, requisitos: [] },
        { id: '1301', nombre: 'Editorial', año: 3, requisitos: [] },
        { id: '1302', nombre: 'Diseño de Imagen Audiovisual', año: 3, requisitos: [] },
        { id: '1304', nombre: 'Promoción de Ventas', año: 3, requisitos: [] },
        { id: '1305', nombre: 'Diseño de Productor y Envases', año: 3, requisitos: [] },
        { id: '1306', nombre: 'Atención de Cuentas', año: 3, requisitos: [] },
        // 4to Año
        { id: '1307', nombre: 'CREACIÓN SONORA', año: 4, requisitos: [] },
        { id: '1308', nombre: 'PLANIFICACIÓN Y GESTIÓN DE PROYECTOS COMUNICACIONALES', año: 4, requisitos: [] },
        { id: '1309', nombre: 'MÉTODOS Y TÉCNICOS DE INVESTIGACIÓN Y DOCUMENTACIÓN', año: 4, requisitos: [] },
        { id: '1310', nombre: 'PRÁCTICA PROFESIONAL', año: 4, requisitos: [] },
        { id: '1311', nombre: 'PROYECTO FINAL DE TESIS', año: 4, requisitos: ['42-ramos'] }, // Requisito especial
        // Optativas
        { id: '1313', nombre: 'ESTÉTICA', año: 'optativa', requisitos: [] },
        { id: '1314', nombre: 'PSICOLOGÍA DE LA COMUNICACIÓN', año: 'optativa', requisitos: [] },
        { id: '1315', nombre: 'ARTE CONTEMPORÁNEO Y EXPERIMENTACIÓN', año: 'optativa', requisitos: [] },
        { id: '90501', nombre: 'INGLÉS I', año: 'optativa', requisitos: [] },
        { id: '1316', nombre: 'GUIÓN', año: 'optativa', requisitos: [] },
        { id: '1317', nombre: 'REALIZACIÓN MULTIMEDIAL', año: 'optativa', requisitos: [] },
        { id: '1318', nombre: 'ILUMINACIÓN Y CÁMARA', año: 'optativa', requisitos: [] },
        { id: '1319', nombre: 'EDICIÓN AUDIOVISUAL', año: 'optativa', requisitos: [] },
        { id: '1320', nombre: 'EFECTOS ESPECIALES Y ANIMACIÓN', año: 'optativa', requisitos: [] },
        { id: '1321', nombre: 'LABORATORIO - TRATAMIENTO DIGITAL DE IMAGEN', año: 'optativa', requisitos: [] },
        { id: '1322', nombre: 'ANIMACIÓN DIGITAL', año: 'optativa', requisitos: [] },
        { id: '91008', nombre: 'PRINCIPIOS DE MARKETING', año: 'optativa', requisitos: [] },
        { id: '1323', nombre: 'PLANIFICACIÓN DE MEDIOS', año: 'optativa', requisitos: [] },
        { id: '1324', nombre: 'OPINIÓN PÚBLICA Y AUDIENCIAS', año: 'optativa', requisitos: [] },
        { id: '1325', nombre: 'REDACCIÓN PUBLICITARIA', año: 'optativa', requisitos: [] },
        { id: '1326', nombre: 'TEORÍA DE LA PERSUACIÓN', año: 'optativa', requisitos: [] },
        { id: '1327', nombre: 'PROMOCIÓN Y COMUNICACIONES DIRECTAS', año: 'optativa', requisitos: [] }
    ];

    // --- 2. Estado de la Aplicación ---
    // Carga los ramos aprobados desde localStorage. Si no hay, empieza con un array vacío.
    let aprobados = JSON.parse(localStorage.getItem('ramosAprobadosDG')) || [];
    const mallaContainer = document.getElementById('malla-curricular');

    // --- 3. Funciones Principales ---

    /**
     * Guarda el array de ramos aprobados en el localStorage del navegador.
     */
    const guardarEstado = () => {
        localStorage.setItem('ramosAprobadosDG', JSON.stringify(aprobados));
    };

    /**
     * Dibuja la malla curricular en la página, creando las columnas y tarjetas de ramos.
     */
    const dibujarMalla = () => {
        mallaContainer.innerHTML = ''; // Limpia la malla antes de redibujar.
        const años = [1, 2, 3, 4, 'optativa']; // Define el orden de las columnas.

        años.forEach(año => {
            const columna = document.createElement('div');
            columna.className = 'año-columna';
            
            const titulo = document.createElement('h2');
            titulo.textContent = (typeof año === 'number') ? `${año}° Año` : 'Materias Optativas';
            columna.appendChild(titulo);

            // Filtra los ramos que pertenecen a esta columna.
            const ramosDelAño = ramosData.filter(ramo => ramo.año === año);
            
            ramosDelAño.forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.className = 'ramo';
                ramoDiv.dataset.id = ramo.id; // Asigna el ID para identificarlo.
                
                ramoDiv.innerHTML = `
                    <div class="ramo-codigo">${ramo.id}</div>
                    <div class="ramo-nombre">${ramo.nombre}</div>
                `;
                columna.appendChild(ramoDiv);
            });
            mallaContainer.appendChild(columna);
        });

        actualizarEstadoVisual(); // Aplica los estilos iniciales (aprobado, bloqueado, etc.).
    };

    /**
     * Actualiza la apariencia de todos los ramos según su estado.
     */
    const actualizarEstadoVisual = () => {
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            const id = ramoDiv.dataset.id;
            
            ramoDiv.classList.remove('aprobado', 'bloqueado'); // Resetea las clases.

            if (aprobados.includes(id)) {
                ramoDiv.classList.add('aprobado');
            } else {
                const { cumplido } = verificarRequisitos(id);
                if (!cumplido) {
                    ramoDiv.classList.add('bloqueado');
                }
            }
        });
    };

    /**
     * Verifica si un ramo cumple con sus requisitos.
     * @param {string} id - El ID del ramo a verificar.
     * @returns {{cumplido: boolean, faltantes: object[]}} Objeto que indica si se cumplió y qué ramos faltan.
     */
    const verificarRequisitos = (id) => {
        const ramo = getRamoData(id);
        const faltantes = [];

        // Caso especial: PROYECTO FINAL DE TESIS.
        if (ramo.requisitos.includes('42-ramos')) {
            if (aprobados.length < 42) {
                faltantes.push({ nombre: `Necesitas 42 ramos aprobados (tienes ${aprobados.length})` });
            }
        }

        // Verifica el resto de los requisitos.
        ramo.requisitos.forEach(reqId => {
            if (reqId !== '42-ramos' && !aprobados.includes(reqId)) {
                faltantes.push(getRamoData(reqId));
            }
        });

        return { cumplido: faltantes.length === 0, faltantes };
    };

    /**
     * Busca los datos de un ramo por su ID en el array principal.
     * @param {string} id - El ID del ramo.
     * @returns {object|undefined} El objeto del ramo o undefined si no lo encuentra.
     */
    const getRamoData = (id) => ramosData.find(r => r.id === id);

    /**
     * Maneja el evento de clic sobre cualquier ramo de la malla.
     * @param {Event} e - El objeto del evento de clic.
     */
    const manejarClicRamo = (e) => {
        const ramoDiv = e.target.closest('.ramo');
        if (!ramoDiv) return; // Si no se hizo clic en un ramo, no hace nada.

        const id = ramoDiv.dataset.id;
        
        // Si el ramo ya está aprobado, permite des-aprobarlo.
        if (ramoDiv.classList.contains('aprobado')) {
            aprobados = aprobados.filter(aprobadoId => aprobadoId !== id);
        } else {
            // Si está bloqueado, muestra una alerta con los requisitos que faltan.
            const { cumplido, faltantes } = verificarRequisitos(id);
            if (!cumplido) {
                const nombresFaltantes = faltantes.map(r => r.nombre).join('\n • ');
                alert(`Para cursar esta materia, primero necesitas aprobar:\n\n • ${nombresFaltantes}`);
                return;
            }
            // Si cumple los requisitos, lo aprueba.
            aprobados.push(id);
        }

        // Guarda el nuevo estado y actualiza la interfaz.
        guardarEstado();
        actualizarEstadoVisual();
    };

    // --- 4. Inicialización ---
    dibujarMalla(); // Dibuja la malla al cargar la página.
    mallaContainer.addEventListener('click', manejarClicRamo); // Asigna un único listener de eventos para toda la malla.
});
