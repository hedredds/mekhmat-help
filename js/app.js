document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app-container');

    const ICONS = {
        matan: `<svg aria-hidden="true" class="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
        algem: `<svg aria-hidden="true" class="w-6 h-6 sm:w-7 sm:h-7 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>`,
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

    function createCard(ev) {
        const isMatan = ev.theme === 'purple';
        const bgGlow = isMatan ? 'bg-purple-500' : 'bg-orange-500';
        const bgIcon = isMatan ? 'bg-purple-500/20' : 'bg-orange-500/20';
        const badgeClass = isMatan ? 'bg-purple-500/20 text-purple-300' : 'bg-orange-500/20 text-orange-300';
        const btnClass = isMatan ? 'btn-file-matan' : 'btn-file-algem';
        const recClass = isMatan ? 'recommended-matan' : 'recommended-algem';
        const iconColor = isMatan ? 'text-purple-400' : 'text-orange-400';
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

    function init() {
        try {
            const now = new Date();
            const activeEvents = EVENT_DATA.filter(e => {
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
            console.error(error);
            container.innerHTML = `<div class="col-span-full text-center py-12 text-red-500">Системная ошибка рендера.</div>`;
        }
    }

    init();
});
