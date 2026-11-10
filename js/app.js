document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app-container');
    const scheduleView = document.getElementById('schedule-view');
    const aboutView = document.getElementById('about-view');
    const scheduleTimeline = document.getElementById('schedule-timeline');
    const siteHeader = document.getElementById('site-header');

    const burgerBtn = document.getElementById('burger-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    const logoHome = document.getElementById('logo-home');

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 20) {
            siteHeader.classList.remove('header-hidden');
            return;
        }
        if (currentScroll > lastScroll && currentScroll > 80) {
            siteHeader.classList.add('header-hidden');
        } else if (currentScroll < lastScroll) {
            siteHeader.classList.remove('header-hidden');
        }
        lastScroll = currentScroll;
    });

    const ICONS = {
        matan: `<svg aria-hidden="true" class="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
        algem: `<svg aria-hidden="true" class="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>`,
        proga: `<svg aria-hidden="true" class="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
        file: `<svg aria-hidden="true" class="w-4 h-4 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
        heart: `<svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`
    };

    const savedTheme = localStorage.getItem('mekhmat_theme') || 'space';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.setTheme === savedTheme);
    });

    function isEventArchived(ev) {
        const now = new Date();
        const eventDate = new Date(ev.date);
        eventDate.setHours(23, 59, 59, 999);
        return eventDate < now;
    }

    function toggleSidebar(forceState) {
        const isOpen = typeof forceState === 'boolean' ? forceState : !sidebar.classList.contains('active');
        sidebar.classList.toggle('active', isOpen);
        sidebarOverlay.classList.toggle('active', isOpen);
    }

    burgerBtn.addEventListener('click', () => toggleSidebar());
    sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
    sidebarClose.addEventListener('click', () => toggleSidebar(false));

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.setTheme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('mekhmat_theme', theme);
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b === btn));
        });
    });

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
        } catch (err) {}
    });

    async function fetchInitialLikes(events) {
        const promises = events.map(ev =>
            fetch(`https://abacus.jasoncameron.dev/get/hedredds/mekhmat-help-${ev.id}`)
                .then(res => res.json())
                .then(data => {
                    const countSpan = document.getElementById(`like-count-${ev.id}`);
                    if (countSpan) countSpan.innerText = data.value || 0;
                }).catch(() => {})
        );
        await Promise.allSettled(promises);
    }

    function getThemeStyles(theme) {
        if (theme === 'cyan') {
            return {
                glowClass: 'glow-cyan',
                bgIcon: 'bg-cyan-500/20',
                badgeClass: 'bg-cyan-500/20 text-cyan-300',
                recClass: 'recommended-algem',
                iconColor: 'text-cyan-400',
                iconSvg: ICONS.algem
            };
        }
        if (theme === 'emerald') {
            return {
                glowClass: 'glow-emerald',
                bgIcon: 'bg-emerald-500/20',
                badgeClass: 'bg-emerald-500/20 text-emerald-300',
                recClass: 'recommended-proga',
                iconColor: 'text-emerald-400',
                iconSvg: ICONS.proga
            };
        }
        return {
            glowClass: 'glow-purple',
            bgIcon: 'bg-purple-500/20',
            badgeClass: 'bg-purple-500/20 text-purple-300',
            recClass: 'recommended-matan',
            iconColor: 'text-purple-400',
            iconSvg: ICONS.matan
        };
    }

    function createCard(ev) {
        const t = getThemeStyles(ev.theme);
        const archived = isEventArchived(ev);
        const isLiked = localStorage.getItem(`mekhmat_liked_${ev.id}`) ? 'liked' : '';
        const archiveBadge = archived ? `<span class="badge bg-gray-500/30 text-gray-300 ml-1">Архив</span>` : '';

        const card = document.createElement('div');
        card.className = 'glass card-hover';
        card.id = `card-${ev.id}`;

        card.innerHTML = `
            <div class="bg-glow-orb ${t.glowClass}"></div>
            <div class="card-header">
                <div class="p-2.5 sm:p-3 ${t.bgIcon} rounded-2xl flex-shrink-0">${t.iconSvg}</div>
                <div class="card-title-wrapper">
                    <div class="title-text">${ev.title}</div>
                    <div class="flex items-center gap-1">
                        <span class="badge ${t.badgeClass}">${ev.type}</span>
                        ${archiveBadge}
                    </div>
                </div>
            </div>
            <div class="info-list">
                ${ev.details.map(d => `
                    <div class="info-row ${d.borderNone ? 'border-b-0 pb-0' : ''}">
                        <span class="info-label">${d.label}</span>
                        <span class="info-value ${d.class || ''}">
                            ${d.value}
                            ${d.sub ? `<div class="text-indigo-400 text-[11px] sm:text-xs mt-1 font-normal">${d.sub}</div>` : ''}
                        </span>
                    </div>
                `).join('')}
            </div>
            <div class="info-block">${ev.rules}</div>
            <div class="action-row">
                <a href="${ev.tgLink}" target="_blank" rel="noopener noreferrer" class="tg-post-btn">подробнее в тг</a>
                <button class="like-btn ${isLiked}" data-id="${ev.id}">
                    ${ICONS.heart}
                    <span id="like-count-${ev.id}" class="like-count">...</span>
                </button>
            </div>
            <div class="grid-buttons">
                ${ev.files.map(f => `
                    <a href="${f.href}" target="_blank" rel="noopener noreferrer" class="btn-file ${f.recommended ? t.recClass : ''}" aria-label="Открыть ${f.name}">
                        <span class="${t.iconColor}">${ICONS.file}</span>
                        ${f.name}
                    </a>
                `).join('')}
            </div>
        `;
        return card;
    }

    function renderFeed(filter = 'active') {
        container.innerHTML = '';
        const sorted = [...EVENT_DATA].sort((a, b) => new Date(a.date) - new Date(b.date));

        const filtered = sorted.filter(ev => {
            const archived = isEventArchived(ev);
            if (filter === 'active') return !archived;
            if (filter === 'archive') return archived;
            return ev.subject === filter;
        });

        if (filtered.length === 0) {
            const emptyMsg = filter === 'archive'
                ? 'В архиве пока нет прошедших работ.'
                : 'Актуальных работ в этом разделе пока нет.';
            container.innerHTML = `<div class="glass col-span-full text-center py-10 text-gray-400">${emptyMsg}</div>`;
            return;
        }

        const fragment = document.createDocumentFragment();
        filtered.forEach(ev => fragment.appendChild(createCard(ev)));
        container.appendChild(fragment);
        fetchInitialLikes(filtered);
    }

    function renderScheduleWindow() {
        const sorted = [...EVENT_DATA].sort((a, b) => new Date(a.date) - new Date(b.date));

        scheduleTimeline.innerHTML = sorted.map((ev) => {
            const archived = isEventArchived(ev);
            const dateText = ev.details.find(d => d.label === 'Дата')?.value || ev.date;
            const subText = ev.details.find(d => d.label === 'Дата')?.sub || '';
            const statusBadge = archived
                ? `<span class="badge bg-gray-500/30 text-gray-300">Архив</span>`
                : `<span class="badge bg-emerald-500/20 text-emerald-400">Актуально</span>`;

            return `
                <div class="schedule-card relative overflow-hidden">
                    <div class="flex flex-col gap-1 z-10 relative">
                        <div class="flex items-center gap-2 mb-1">
                            ${statusBadge}
                            <span class="text-xs text-indigo-400 font-bold">${dateText}</span>
                        </div>
                        <div class="font-bold text-base sm:text-lg text-white">
                            ${ev.title} <span class="text-gray-400 font-normal ml-1">(${ev.type})</span>
                        </div>
                        ${subText ? `<div class="text-xs text-gray-500 mt-1">${subText}</div>` : ''}
                    </div>
                    <button type="button" class="tg-post-btn open-subject-btn w-full sm:w-auto text-center z-10 relative mt-2 sm:mt-0" data-subject="${ev.subject}">Открыть материалы</button>
                </div>
            `;
        }).join('');

        scheduleTimeline.querySelectorAll('.open-subject-btn').forEach(btn => {
            btn.addEventListener('click', () => switchView('feed', btn.dataset.subject));
        });
    }

    function triggerViewAnimation() {
        document.querySelectorAll('.view-anim').forEach(el => {
            if (!el.classList.contains('hidden')) {
                el.style.animation = 'none';
                void el.offsetWidth;
                el.style.animation = 'fadeInSlide 0.25s ease-out forwards';
            }
        });
    }

    function updateActiveControls(view, filter) {
        document.querySelectorAll('.filter-chip').forEach(chip => {
            const match = chip.dataset.view === view && (!chip.dataset.filter || chip.dataset.filter === filter);
            chip.classList.toggle('active', match);
            if (match) {
                chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        });

        document.querySelectorAll('.sidebar-link').forEach(link => {
            const match = link.dataset.view === view && (!link.dataset.filter || link.dataset.filter === filter);
            link.classList.toggle('active', match);
        });
    }

    function switchView(view, filter = 'active') {
        container.classList.toggle('hidden', view !== 'feed');
        scheduleView.classList.toggle('hidden', view !== 'schedule');
        aboutView.classList.toggle('hidden', view !== 'about');

        updateActiveControls(view, filter);

        if (view === 'feed') renderFeed(filter);
        else if (view === 'schedule') renderScheduleWindow();
        
        triggerViewAnimation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.filter-chip, .sidebar-link').forEach(el => {
        el.addEventListener('click', () => {
            toggleSidebar(false);
            switchView(el.dataset.view, el.dataset.filter || 'active');
        });
    });

    logoHome.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('feed', 'active');
    });

    switchView('feed', 'active');
});
