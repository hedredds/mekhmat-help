
$rootPath = Get-Location
New-Item -ItemType Directory -Force -Path "css", "js" | Out-Null
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# 1. СТИЛИ (css/style.css)
$cssContent = @'
* { box-sizing: border-box; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }
body { background-color: #050505; color: #ffffff; font-family: 'Inter', system-ui, -apple-system, sans-serif; margin: 0; min-height: 100vh; display: flex; flex-direction: column; background-image: radial-gradient(circle at 15% 50%, rgba(76, 29, 149, 0.3), transparent 30%), radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.15), transparent 30%); }
main { max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem 3rem; width: 100%; display: flex; flex-direction: column; gap: 1.5rem; }
@media (min-width: 1024px) { main { display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; gap: 2rem; padding: 4rem 1rem 3rem; } }
.glass { padding: 1.25rem; border-radius: 1.5rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); display: flex; flex-direction: column; position: relative; overflow: hidden; }
@media (min-width: 640px) { .glass { padding: 2rem; } }
.card-header { display: flex; align-items: flex-start; margin-bottom: 1.25rem; gap: 0.75rem; }
@media (min-width: 640px) { .card-header { margin-bottom: 1.5rem; gap: 1rem; } }
.card-title-wrapper { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; }
@media (min-width: 640px) { .card-title-wrapper { flex-direction: row; align-items: center; gap: 0.75rem; } }
.title-text { font-size: 1.25rem; font-weight: 700; line-height: 1.2; }
@media (min-width: 640px) { .title-text { font-size: 1.35rem; } }
.badge { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.25rem 0.5rem; border-radius: 0.375rem; display: inline-block; }
.info-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; flex-grow: 1; }
.info-row { display: flex; flex-direction: column; gap: 0.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem; font-size: 0.9rem; }
@media (min-width: 640px) { .info-row { flex-direction: row; justify-content: space-between; align-items: flex-start; font-size: 0.9375rem; } }
.info-row.border-b-0 { border-bottom: none; }
.info-row.pb-0 { padding-bottom: 0; }
.info-label { color: #9ca3af; }
.info-value { font-weight: 600; text-align: left; }
@media (min-width: 640px) { .info-value { text-align: right; } }
.info-block { font-size: 0.75rem; color: #d4d4d8; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.05); line-height: 1.5; margin-bottom: 1rem; }
.action-row { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 1.5rem; }
.tg-post-btn { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 600; color: #9ca3af; text-decoration: none; background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s; }
.tg-post-btn:hover { color: #ffffff; background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
.like-btn { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 600; color: #9ca3af; background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.08); cursor: pointer; transition: all 0.2s; }
.like-btn:hover { background: rgba(239, 68, 68, 0.1); color: #fca5a5; border-color: rgba(239, 68, 68, 0.3); }
.like-btn.liked { background: rgba(239, 68, 68, 0.15); color: #ef4444; border-color: rgba(239, 68, 68, 0.5); cursor: default; }
.like-btn.liked svg { fill: currentColor; }
.grid-buttons { display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-top: auto; }
@media (min-width: 640px) { .grid-buttons { grid-template-columns: 1fr 1fr; } }
.btn-file { position: relative; padding: 0.875rem; border-radius: 0.75rem; text-align: center; text-decoration: none; color: #d4d4d8; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 500; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); transition: all 0.2s; }
.btn-file.recommended-matan { border-color: rgba(168, 85, 247, 0.6); background: rgba(168, 85, 247, 0.08); color: #e9d5ff; box-shadow: 0 0 15px rgba(168, 85, 247, 0.15); }
.btn-file.recommended-algem { border-color: rgba(6, 182, 212, 0.6); background: rgba(6, 182, 212, 0.08); color: #cffafe; box-shadow: 0 0 15px rgba(6, 182, 212, 0.15); }
.card-hover { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.card-hover:hover { transform: translateY(-4px); border-color: rgba(167, 139, 250, 0.4); box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15); }
a:focus-visible, button:focus-visible { outline: none; box-shadow: 0 0 0 2px #050505, 0 0 0 4px #a855f7; }
[x-cloak] { display: none !important; }
'@
[System.IO.File]::WriteAllText((Join-Path $rootPath "css\style.css"), $cssContent, $utf8NoBom)

# 2. ЛОГИКА (js/app.js)
$jsContent = @'
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app-container');

    const ICONS = {
        matan: `<svg aria-hidden="true" class="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
        algem: `<svg aria-hidden="true" class="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>`,
        file: `<svg aria-hidden="true" class="w-4 h-4 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
        heart: `<svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`
    };

    container.addEventListener('click', async (e) => {
        const btn = e.target.closest('.like-btn');
        if (!btn || btn.classList.contains('liked')) return;

        const evId = btn.dataset.id;
        const now = Date.now();
        const lastLike = sessionStorage.getItem('last_like_time') || 0;

        if (now - lastLike < 2000) return; 

        try {
            const res = await fetch(`https://abacus.jasoncameron.dev/hit/hedredds/mekhmat-help-${evId}`);
            const data = await res.json();
            btn.querySelector('.like-count').innerText = data.value;
            
            localStorage.setItem(`mekhmat_liked_${evId}`, 'true');
            sessionStorage.setItem('last_like_time', now);
            btn.classList.add('liked');
        } catch(err) {
            console.error('API Error:', err);
        }
    });

    async function fetchInitialLikes(activeEvents) {
        const promises = activeEvents.map(ev => 
            fetch(`https://abacus.jasoncameron.dev/get/hedredds/mekhmat-help-${ev.id}`)
                .then(res => res.json())
                .then(data => {
                    const countSpan = document.getElementById(`like-count-${ev.id}`);
                    if (countSpan) countSpan.innerText = data.value || 0;
                }).catch(() => {})
        );
        await Promise.allSettled(promises);
    }

    async function loadData() {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to fetch config');
        return response.json();
    }

    function createCard(ev) {
        const isMatan = ev.theme === 'purple';
        const bgGlow = isMatan ? 'bg-purple-500' : 'bg-cyan-500';
        const bgIcon = isMatan ? 'bg-purple-500/20' : 'bg-cyan-500/20';
        const badgeClass = isMatan ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300';
        const btnClass = isMatan ? 'btn-file-matan' : 'btn-file-algem';
        const recClass = isMatan ? 'recommended-matan' : 'recommended-algem';
        const iconColor = isMatan ? 'text-purple-400' : 'text-cyan-400';
        const isLiked = localStorage.getItem(`mekhmat_liked_${ev.id}`) ? 'liked' : '';

        const card = document.createElement('div');
        card.className = 'glass card-hover';
        
        card.innerHTML = `
            <div class="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 ${bgGlow} rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
            <div class="card-header relative z-10">
                <div class="p-2.5 sm:p-3 ${bgIcon} rounded-2xl flex-shrink-0">${isMatan ? ICONS.matan : ICONS.algem}</div>
                <div class="card-title-wrapper">
                    <div class="title-text">${ev.title}</div>
                    <div><span class="badge ${badgeClass}">${ev.type}</span></div>
                </div>
            </div>
            <div class="info-list relative z-10">
                ${ev.details.map(d => `
                    <div class="info-row ${d.borderNone ? 'border-b-0 pb-0' : ''}">
                        <span class="info-label">${d.label}</span>
                        <span class="info-value ${d.class || 'text-white'}">
                            ${d.value}
                            ${d.sub ? `<div class="text-indigo-300 text-[11px] sm:text-xs mt-1 font-normal">${d.sub}</div>` : ''}
                        </span>
                    </div>
                `).join('')}
            </div>
            <div class="info-block relative z-10 text-[11px] sm:text-xs">${ev.rules}</div>
            <div class="action-row relative z-10">
                <a href="${ev.tgLink}" target="_blank" rel="noopener noreferrer" class="tg-post-btn">подробнее в тг</a>
                <button class="like-btn ${isLiked}" data-id="${ev.id}">
                    ${ICONS.heart}
                    <span id="like-count-${ev.id}" class="like-count">...</span>
                </button>
            </div>
            <div class="grid-buttons relative z-10">
                ${ev.files.map(f => `
                    <a href="${f.href}" target="_blank" rel="noopener noreferrer" class="btn-file ${btnClass} ${f.recommended ? recClass : ''}" aria-label="Скачать ${f.name}">
                        <span class="${iconColor}">${ICONS.file}</span>
                        ${f.name}
                    </a>
                `).join('')}
            </div>
        `;
        return card;
    }

    async function init() {
        try {
            const events = await loadData();
            const now = new Date();
            const activeEvents = events.filter(e => {
                const eventDate = new Date(e.date);
                eventDate.setHours(23, 59, 59, 999); 
                return e.active !== false && eventDate >= now;
            });

            if (activeEvents.length === 0) {
                container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">Ближайших событий пока нет. Отдыхай!</div>`;
                return;
            }

            const fragment = document.createDocumentFragment();
            activeEvents.forEach(ev => fragment.appendChild(createCard(ev)));
            container.appendChild(fragment);

            fetchInitialLikes(activeEvents);
        } catch (error) {
            container.innerHTML = `<div class="col-span-full text-center py-12 text-red-500">Ошибка загрузки расписания. Проверьте data.json</div>`;
        }
    }

    init();
});
'@
[System.IO.File]::WriteAllText((Join-Path $rootPath "js\app.js"), $jsContent, $utf8NoBom)

# 3. БАЗА (data.json)
$jsonContent = @'
[
  {
    "id": "matan",
    "type": "Коллоквиум",
    "date": "2026-11-10T08:50:00",
    "active": true,
    "theme": "purple",
    "title": "Математический анализ",
    "tgLink": "https://t.me/c/4359191970/32",
    "details": [
      { "label": "Дата", "value": "10 Ноября", "sub": "ММ-1: 8:50 | ММ-2: 9:50 | ММ-3: 10:40" },
      { "label": "Формат", "value": "4 вопроса (30 мин)" },
      { "label": "Структура", "value": "Без доказательств" },
      { "label": "Для зачета", "value": "10 баллов (11 БРС)", "class": "text-emerald-400", "borderNone": true }
    ],
    "rules": "<strong class='text-white block mb-1'>Строгие правила:</strong> Опоздание = осечка. Выходить нельзя. За телефон — удаление.",
    "files": [
      { "name": "Шпора", "href": "materials/matan/matan-shpora.pdf" },
      { "name": "Шпора +", "href": "materials/matan/matan-shpora-plus.pdf" },
      { "name": "Конспект", "href": "materials/matan/matan-konspekt.pdf" },
      { "name": "Письм. конспект", "href": "materials/matan/matan-konspekt-pismennyi.pdf" },
      { "name": "Методичка", "href": "materials/matan/matan-metodichka.pdf", "recommended": true },
      { "name": "Темы", "href": "materials/matan/matan-temy.pdf" }
    ]
  },
  {
    "id": "algem",
    "type": "Коллоквиум",
    "date": "2026-11-13T10:00:00",
    "active": true,
    "theme": "cyan",
    "title": "Алгебра и Геометрия",
    "tgLink": "https://t.me/c/4359191970/39",
    "details": [
      { "label": "Дата", "value": "13 Ноября (Пятница)" },
      { "label": "Формат", "value": "Письменно-устный", "class": "text-cyan-300" },
      { "label": "Структура", "value": "5 вопросов (2 с док-вом)" },
      { "label": "Максимум", "value": "20 баллов", "class": "text-emerald-400", "borderNone": true }
    ],
    "rules": "<strong class='text-white block mb-1'>Аудитории:</strong> Часть 1 (ММ-1 + 12 чел. ММ-2) — ауд. 311. Вторая часть — уточняется.",
    "files": [
      { "name": "Шпора", "href": "materials/algem/algem-shpora.pdf" },
      { "name": "Шпора +", "href": "materials/algem/algem-shpora-plus.pdf", "recommended": true },
      { "name": "Конспект", "href": "materials/algem/algem-konspekt.pdf" },
      { "name": "Письм. конспект", "href": "materials/algem/algem-konspekt-pismennyi.pdf" },
      { "name": "Методичка", "href": "materials/algem/algem-metodichka.pdf" },
      { "name": "Темы", "href": "materials/algem/algem-temy.pdf" }
    ]
  }
]
'@
[System.IO.File]::WriteAllText((Join-Path $rootPath "data.json"), $jsonContent, $utf8NoBom)

# 4. РАЗМЕТКА (index.html)
$htmlContent = @'
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Файлы к коллоквиумам | Mekhmat</title>
    <meta name="description" content="Шпоры, конспекты и методички для подготовки к коллоквиумам.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='25' fill='%23a855f7'/><text x='50' y='72' text-anchor='middle' font-size='64' font-family='sans-serif' font-weight='bold' fill='white'>M</text></svg>">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="js/app.js"></script>
</head>
<body class="antialiased selection:bg-purple-500 selection:text-white" x-cloak>
    <h1 class="sr-only">Расписание и файлы к коллоквиумам</h1>

    <main id="app-container"></main>

    <div class="text-center pb-8 relative z-10 mt-auto">
        <p class="text-gray-400 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase">создано нереализованным потенциалом</p>
    </div>

    <a href="https://t.me/+HqQ_vg0OIJpmMDQ6" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 text-gray-400 hover:text-white transition-colors duration-300" aria-label="Перейти в Telegram">
        <svg aria-hidden="true" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    </a>
</body>
</html>
'@
[System.IO.File]::WriteAllText((Join-Path $rootPath "index.html"), $htmlContent, $utf8NoBom)

# 5. GIT PUSH
git add .
git commit -m "Refactor: extracted logic and styles, optimized DOM rendering and API calls"
git push origin master

Write-Host "Успех! Файлы пересобраны и запушены." -ForegroundColor Green
