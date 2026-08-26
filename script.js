// CONFIGURACIÓN DE HORARIOS Y MODALIDADES FIJAS POR DÍA de la semana (1=Lun, 2=Mar, etc.)
const scheduleConfig = {
    1: { name: 'Base de Datos', time: '18:00 - 20:00 hs', type: 'Presencial', classCode: 'bd' },
    2: { name: 'Lógica Computacional', time: '18:30 - 22:00 hs', type: 'Zoom', classCode: 'lc' },
    3: { name: 'Base de Datos', time: '18:00 - 22:00 hs', type: 'Presencial', classCode: 'bd' },
    4: { name: 'Inglés', time: '18:00 - 22:00 hs', type: 'Zoom', classCode: 'in' },
    5: { name: 'Modelado y Diseño de Software', time: '18:00 - 20:00 hs', type: 'Presencial', classCode: 'md' }
};

// =========================================================================
// CONTENIDO PERSONALIZADO POR FECHA (Formato: 'AAAA-MM-DD')
// Modifica, agrega o elimina las fechas aquí abajo para cambiar el contenido manual.
// =========================================================================
// =========================================================================
// CONTENIDO PERSONALIZADO POR FECHA (Formato: 'AAAA-MM-DD')
// Modifica, agrega o elimina las fechas aquí abajo para cambiar el contenido manual.
// =========================================================================
const customContent = {
    // ---- CRONOGRAMA DE INGLÉS (Jueves) ----
    '2026-08-13': 'Presentación de la asignatura. Forma de trabajo. Lectocomprensión-Listening -Vocabulario relacionado con Desarrollo de Software y Gramática (Personal Pronouns/ Adjectives).',
    '2026-08-20': 'Lectocomprensión-Listening -Vocabulario relacionado con Análisis en Sistemas. y Gramática (Prepositions of Movement and Place - Present Simple (verb to be)).',
    '2026-08-27': 'Lectocomprensión-Listening -Vocabulario relacionado con Análisis en Sistemas. y Gramática (Present Continuous).',
    '2026-09-03': 'Lectocomprensión-Listening -Vocabulario relacionado con Análisis en Sistemas. y Gramática (Present Continuous vs Present Simple (verb to be)).',
    '2026-09-10': 'Lectocomprensión-Listening -Vocabulario relacionado con Análisis en Sistemas. y Gramática (Present Simple).',
    '2026-09-17': 'CIUDAD BILINGÜE (a confirmar).',
    '2026-09-24': 'Lectocomprensión-Listening -Vocabulario relacionado con Análisis en Sistemas. y Gramática (Present Simple vs Continuous).',
    '2026-10-01': 'Lectocomprensión-Listening -Vocabulario relacionado con D.S. y Gramática (Past Simple (was/were) and Past Continuous).',
    '2026-10-08': 'Lectocomprensión-Listening -Vocabulario relacionado con D.S. y Gramática (Past Simple Regular and Irregular verbs).',
    '2026-10-15': '⚠️ Parcial (a confirmar).',
    '2026-10-22': '🔄 Recuperatorio (a confirmar).',
    '2026-10-29': 'Lectocomprensión- Listening - Vocabulario relacionado con D.S. y Gramática (Present Perfect).',
    '2026-11-05': 'Lectocomprensión-Listening -Vocabulario relacionado con Análisis en Sistemas. y Gramática (Active and Passive Voice).',
    '2026-11-12': 'Lectocomprensión-Listening -Vocabulario relacionado con D.S. y Gramática (Modal Verbs).',
    '2026-11-19': '🚀 Presentación de Proyecto Integrador (a confirmar).',
    '2026-11-26': '📋 Cierre de notas.',

    // ---- OTRAS MATERIAS (Ejemplos anteriores) ----
    '2026-08-10': 'Presentación de la materia y configuración del entorno SQL.',
    '2026-08-11': 'Repaso de conjuntos numéricos y lógica proposicional básica.',
    '2026-08-12': 'Modelo Entidad-Relación: Entidades, atributos y relaciones.'
};


// Rango del ciclo lectivo
const startDate = new Date(2026, 7, 10); // 10 de Agosto 2026
const endDate = new Date(2026, 11, 6);   // 06 de Diciembre 2026

// Función para cambiar de vista (Semanal / Mensual)
function switchView(view) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.view-switcher .btn').forEach(el => el.classList.remove('active'));

    if (view === 'semanal') {
        document.getElementById('vista-semanal').classList.add('active');
        document.getElementById('btn-semanal').classList.add('active');
    } else {
        document.getElementById('vista-mensual').classList.add('active');
        document.getElementById('btn-mensual').classList.add('active');
    }
}

// Genera un string 'AAAA-MM-DD' compatible con las claves del objeto customContent
function getISODateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(date) {
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
}

function generateCalendar() {
    const weeklyContainer = document.getElementById('vista-semanal');
    let currentDataDate = new Date(startDate);
    let weekNumber = 1;

    // --- CONSTRUCCIÓN VISTA SEMANAL (FILTRADA DESDE LA SEMANA ACTUAL) ---
    const today = new Date();

    // Calcular el lunes de la semana actual para el filtro
    const currentWeekMonday = new Date(today);
    const dayOffset = currentWeekMonday.getDay() === 0 ? -6 : 1 - currentWeekMonday.getDay();
    currentWeekMonday.setDate(currentWeekMonday.getDate() + dayOffset);
    currentWeekMonday.setHours(0, 0, 0, 0);

    while (currentDataDate <= endDate) {
        let weekStart = new Date(currentDataDate);
        let weekEnd = new Date(currentDataDate);
        weekEnd.setDate(weekEnd.getDate() + 4); // Viernes

        // SI LA SEMANA YA PASÓ COMPLETAMENTE, SE SALTEA Y NO SE RENDERIZA
        if (weekEnd < currentWeekMonday) {
            currentDataDate.setDate(currentDataDate.getDate() + 7);
            weekNumber++;
            continue;
        }

        let weekCard = document.createElement('div');
        weekCard.className = 'week-card';

        // Resaltar visualmente si es la semana en curso
        if (today >= weekStart && today <= new Date(weekEnd.getTime() + 2 * 24 * 60 * 60 * 1000)) {
            weekCard.style.border = '2px solid var(--accent-blue)';
            weekCard.style.boxShadow = '0 0 15px rgba(76, 201, 240, 0.3)';
        }

        let header = document.createElement('div');
        header.className = 'week-header';
        header.innerText = `Semana ${weekNumber} (${formatDate(weekStart)} al ${formatDate(weekEnd)})`;
        weekCard.appendChild(header);

        let grid = document.createElement('div');
        grid.className = 'week-grid';

        for (let i = 0; i < 5; i++) {
            let dayDate = new Date(weekStart);
            dayDate.setDate(dayDate.getDate() + i);

            let dayCol = document.createElement('div');
            dayCol.className = 'day-column';

            // Resaltar el día de hoy si cae dentro de la semana
            if (dayDate.toDateString() === today.toDateString()) {
                dayCol.style.backgroundColor = 'rgba(76, 201, 240, 0.1)';
                dayCol.style.border = '1px solid var(--accent-blue)';
            }

            let dayName = document.createElement('div');
            dayName.className = 'day-name';
            dayName.innerText = dayDate.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric' });
            dayCol.appendChild(dayName);

            let dayOfWeek = dayDate.getDay();
            if (scheduleConfig[dayOfWeek] && dayDate <= endDate) {
                let course = scheduleConfig[dayOfWeek];
                let dateKey = getISODateString(dayDate);

                let textContent = customContent[dateKey] || 'Clase regular / Temario en desarrollo.';

                dayCol.innerHTML += `
                    <div class="subject-card ${course.classCode}">
                        <span class="subject-time">${course.time}</span>
                        <span class="subject-name">${course.name}</span>
                        <span class="subject-modality">${course.type}</span>
                        <div class="subject-content">${textContent}</div>
                    </div>
                `;
            }
            grid.appendChild(dayCol);
        }

        weekCard.appendChild(grid);
        weeklyContainer.appendChild(weekCard);

        currentDataDate.setDate(currentDataDate.getDate() + 7);
        weekNumber++;
    }


    // --- CONSTRUCCIÓN VISTA MENSUAL ---
    const monthlyContainer = document.getElementById('vista-mensual');
    const months = [7, 8, 9, 10, 11] // ÍNDICES CORREGIDOS: Agosto (7) a Diciembre (11)
    const monthNames = ['Agosto 2026', 'Septiembre 2026', 'Octubre 2026', 'Noviembre 2026', 'Diciembre 2026'];

    months.forEach((monthIdx, i) => {
        let monthSection = document.createElement('div');
        monthSection.className = 'month-section';

        let title = document.createElement('div');
        title.className = 'month-title';
        title.innerText = monthNames[i];
        monthSection.appendChild(title);

        let grid = document.createElement('div');
        grid.className = 'month-grid';

        const daysHeader = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
        daysHeader.forEach(h => {
            let hd = document.createElement('div');
            hd.className = 'month-day-header';
            hd.innerText = h;
            grid.appendChild(hd);
        });

        let firstDay = new Date(2026, monthIdx, 1);
        let lastDay = new Date(2026, monthIdx + 1, 0);

        for (let startSpace = 0; startSpace < firstDay.getDay(); startSpace++) {
            let emptyDiv = document.createElement('div');
            emptyDiv.className = 'month-day empty';
            grid.appendChild(emptyDiv);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            let loopDate = new Date(2026, monthIdx, day);
            let dayDiv = document.createElement('div');
            dayDiv.className = 'month-day';

            if (loopDate < startDate || loopDate > endDate) {
                dayDiv.style.opacity = '0.3';
            }

            let dayNum = document.createElement('span');
            dayNum.className = 'day-number';
            dayNum.innerText = day;
            dayDiv.appendChild(dayNum);

            let dayOfWeek = loopDate.getDay();
            if (loopDate >= startDate && loopDate <= endDate && scheduleConfig[dayOfWeek]) {
                let course = scheduleConfig[dayOfWeek];
                dayDiv.innerHTML += `
                    <div class="subject-card ${course.classCode}" style="font-size:11px; padding:4px; margin-bottom:2px;">
                        <span class="subject-name" style="font-size:11px;">${course.name}</span>
                        <span class="subject-modality" style="font-size:9px; padding:1px 3px;">${course.type}</span>
                    </div>
                `;
            }
            grid.appendChild(dayDiv);
        }
        monthSection.appendChild(grid);
        monthlyContainer.appendChild(monthSection);
    });
}

window.onload = generateCalendar;

// NUEVA FUNCIÓN PARA CONTROLAR EL MODO OSCURO
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const toggleBtn = document.getElementById('dark-mode-toggle');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleBtn.innerText = '🌙 Modo Oscuro';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleBtn.innerText = '☀️ Modo Día';
        localStorage.setItem('theme', 'dark');
    }
}

// Cargar preferencia guardada al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const toggleBtn = document.getElementById('dark-mode-toggle');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (toggleBtn) toggleBtn.innerText = '☀️ Modo Día';
    }
});

