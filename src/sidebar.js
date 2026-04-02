export const leftSidebarConfig = [
    { id: 'btn-random', icon: '🎲', label: 'RANDOM', action: 'openPanel', payload: 'random-panel' },
    { id: 'btn-vocab', icon: '📖', label: 'VOCABULARY', action: 'openPanel', payload: 'vocab-panel' },
    { id: 'btn-games', icon: '🎮', label: 'GAMES', action: 'openPanel', payload: 'games-panel' },
    { id: 'btn-info', icon: '📋', label: 'INFO', action: 'openPanel', payload: 'info-panel' },
];

export const rightSidebarConfig = [
    { id: 'btn-islands', icon: '🗺️', label: 'ISLANDS', action: 'resetGlobe' },
    { id: 'btn-settings', icon: '⚙️', label: 'SETTINGS', action: 'openPanel', payload: 'settings-panel' },
    { id: 'btn-archive', icon: '📚', label: 'ARCHIVE', action: 'openPanel', payload: 'archive-panel' },
    { id: 'btn-mission', icon: '🎯', label: 'MISSION', action: 'openPanel', payload: 'mission-panel' },
];

export function renderSidebars(onAction) {
    const leftNav = document.getElementById('sidebar-left');
    const rightNav = document.getElementById('sidebar-right');

    const renderBtn = (config) => {
        const btn = document.createElement('div');
        btn.className = 'sidebar-btn';
        btn.id = config.id;
        btn.innerHTML = `
            <div class="icon">${config.icon}</div>
            <div class="label">${config.label}</div>
        `;
        btn.onclick = () => onAction(config);
        return btn;
    };

    leftSidebarConfig.forEach(cfg => leftNav.appendChild(renderBtn(cfg)));
    rightSidebarConfig.forEach(cfg => rightNav.appendChild(renderBtn(cfg)));
}
