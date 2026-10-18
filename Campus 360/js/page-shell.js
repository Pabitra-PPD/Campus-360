/**
 * Campus 360 — Universal Dark-Tech Navigation Shell & Component Engine
 * Handles dynamic topbar rendering, role switching, search palette, notifications drawer,
 * and Lucide icon rendering across all pages.
 */

(function () {
  'use strict';

  function resolvePath(target) {
    if (!target) return '#';
    if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('#')) {
      return target;
    }
    const isInsidePages = window.location.pathname.includes('/pages/');
    if (!isInsidePages) {
      return target;
    } else {
      if (target === 'index.html') return '../index.html';
      if (target === 'login.html') return '../login.html';
      if (target.startsWith('pages/')) return target.replace(/^pages\//, '');
      return target;
    }
  }

  function initPageShell() {
    const user = (window.CampusDB && window.CampusDB.getCurrentUser()) || {
      name: 'Alex Turner',
      role: 'student',
      department: 'Computer Science & Engineering',
      avatar: 'AT'
    };

    const isAdmin = user && user.role === 'admin';
    const activePage = document.body.dataset.page || 'home';
    const unreadCount = (window.CampusDB && window.CampusDB.getUnreadCount()) || 0;

    // 1. Render Fast Demo Topbar
    let demoBar = document.getElementById('demo-topbar-root');
    if (!demoBar) {
      demoBar = document.createElement('div');
      demoBar.id = 'demo-topbar-root';
      document.body.prepend(demoBar);
    }

    demoBar.innerHTML = `
      <div class="demo-topbar">
        <div class="container">
          <div class="demo-topbar-left">
            <span class="demo-pulse-dot"></span>
            <span><strong>Campus 360 OS v2.4</strong> — Unified College Management Platform</span>
            <span style="opacity: 0.5;">|</span>
            <span>Active Session: <strong style="color: ${isAdmin ? '#c084fc' : 'var(--cyan-primary)'};">${user.name} (${isAdmin ? 'Administrator' : 'Student'})</strong></span>
          </div>
          <div class="demo-switch-actions">
            <span>Fast Role Switch:</span>
            <button type="button" class="role-quick-btn student" id="quick-switch-student" title="Switch to Student Demo Role">
              🎓 Student Mode
            </button>
            <button type="button" class="role-quick-btn admin" id="quick-switch-admin" title="Switch to Administrator Demo Role">
              🛡️ Admin Console
            </button>
            <button type="button" class="role-quick-btn" style="background: rgba(255,255,255,0.06); color: var(--text-secondary);" id="quick-reset-db" title="Reset all demo data to initial state">
              🔄 Reset Demo
            </button>
          </div>
        </div>
      </div>
    `;

    // 2. Render Main Navigation Topbar
    let mainNav = document.getElementById('main-nav-root');
    if (!mainNav) {
      mainNav = document.createElement('header');
      mainNav.id = 'main-nav-root';
      mainNav.className = 'main-topbar';
      demoBar.insertAdjacentElement('afterend', mainNav);
    }

    mainNav.innerHTML = `
      <div class="container">
        <div class="nav-wrap">
          <div style="display: flex; align-items: center; gap: 24px;">
            <a href="${resolvePath('index.html')}" class="brand-group" aria-label="Campus 360 Home">
              <div class="brand-hexagon">C</div>
              <div>
                <span class="brand-title">CAMPUS 360</span>
                <span class="brand-badge">OS</span>
              </div>
            </a>

            <nav class="nav-links" aria-label="Primary Navigation">
              <a href="${resolvePath('index.html')}" class="nav-item ${activePage === 'home' ? 'active' : ''}">
                <i data-lucide="home" style="width: 16px; height: 16px;"></i>
                <span>Home</span>
              </a>
              <a href="${resolvePath('pages/dashboard.html')}" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
                <i data-lucide="layout-dashboard" style="width: 16px; height: 16px;"></i>
                <span>Dashboard</span>
              </a>
              <a href="${resolvePath('pages/academics.html')}" class="nav-item ${activePage === 'academics' ? 'active' : ''}">
                <i data-lucide="graduation-cap" style="width: 16px; height: 16px;"></i>
                <span>Academics</span>
              </a>
              <a href="${resolvePath('pages/notices.html')}" class="nav-item ${activePage === 'notices' ? 'active' : ''}">
                <i data-lucide="bell" style="width: 16px; height: 16px;"></i>
                <span>Noticeboard</span>
              </a>
              <a href="${resolvePath('pages/campus-life.html')}" class="nav-item ${activePage === 'campus-life' ? 'active' : ''}">
                <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
                <span>Campus Life</span>
              </a>
              <a href="${resolvePath('pages/opportunities.html')}" class="nav-item ${activePage === 'opportunities' ? 'active' : ''}">
                <i data-lucide="briefcase" style="width: 16px; height: 16px;"></i>
                <span>Opportunities</span>
              </a>
              <a href="${resolvePath('pages/marketplace.html')}" class="nav-item ${activePage === 'marketplace' ? 'active' : ''}">
                <i data-lucide="shopping-bag" style="width: 16px; height: 16px;"></i>
                <span>Marketplace</span>
              </a>
            </nav>
          </div>

          <div class="nav-actions">
            <button type="button" class="nav-search-trigger" id="global-search-trigger" aria-label="Search Campus 360">
              <i data-lucide="search" style="width: 15px; height: 15px;"></i>
              <span>Quick Search...</span>
              <span class="kbd-shortcut">Ctrl+K</span>
            </button>

            <!-- Campus AI Topbar Trigger -->
            <button type="button" class="btn btn-sm btn-secondary" id="ai-topbar-trigger" style="border-color: rgba(0, 240, 255, 0.3); color: var(--cyan-primary); padding: 6px 12px; gap: 6px;">
              <i data-lucide="bot" style="width: 15px; height: 15px;"></i>
              <span>Campus AI</span>
            </button>

            <button type="button" class="icon-action-btn" id="notif-toggle-btn" aria-label="View notifications">
              <i data-lucide="bell" style="width: 18px; height: 18px;"></i>
              ${unreadCount > 0 ? `<span class="icon-badge" id="shell-notif-badge">${unreadCount}</span>` : ''}
            </button>

            <div class="user-pill" id="user-profile-btn" role="button" tabindex="0">
              <div class="user-avatar ${isAdmin ? 'admin-avatar' : ''}">
                ${user.avatar || (user.name ? user.name.slice(0, 2).toUpperCase() : 'U')}
              </div>
              <div class="user-details">
                <span class="user-name">${user.name ? user.name.split(' ')[0] : 'User'}</span>
                <span class="user-role-label ${isAdmin ? 'admin-role' : ''}">
                  ${isAdmin ? '🛡️ Admin' : '🎓 Student'}
                </span>
              </div>
            </div>

            <button type="button" class="mobile-nav-toggle" id="mobile-menu-btn" aria-label="Toggle navigation menu">
              <i data-lucide="menu" style="width: 20px; height: 20px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // 3. Inject Omnipresent Floating AI Launcher
    injectFloatingAILauncher();

    // 4. Inject Campus AI Assistant Chat Terminal Modal
    injectAIAssistantModal();

    // 5. Inject Notification Slideout Drawer
    injectNotificationDrawer();

    // 6. Inject Global Search Command Palette
    injectSearchPalette();

    // 7. Inject User Profile Dropdown Menu
    injectProfileMenu();

    // 8. Bind Shell Events
    bindShellEvents();

    // 9. Refresh Lucide Icons
    refreshLucideIcons();
  }

  function injectFloatingAILauncher() {
    let launcher = document.getElementById('floating-ai-launcher');
    if (!launcher) {
      launcher = document.createElement('button');
      launcher.id = 'floating-ai-launcher';
      launcher.className = 'floating-ai-launcher';
      launcher.type = 'button';
      launcher.title = 'Ask Campus 360 AI Assistant';
      launcher.innerHTML = `
        <div class="ai-icon-pulse">
          <i data-lucide="bot" style="width: 16px; height: 16px;"></i>
        </div>
        <span>Ask Campus AI</span>
      `;
      document.body.appendChild(launcher);
    }
  }

  function injectAIAssistantModal() {
    let aiModal = document.getElementById('cyber-ai-assistant-modal');
    if (!aiModal) {
      aiModal = document.createElement('div');
      aiModal.id = 'cyber-ai-assistant-modal';
      document.body.appendChild(aiModal);
    }

    aiModal.innerHTML = `
      <div class="modal-backdrop-custom" id="ai-modal-backdrop">
        <div class="modal-container-custom" style="max-width: 660px;">
          <div class="modal-header-custom">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="ai-icon-pulse" style="width: 28px; height: 28px;">
                <i data-lucide="bot" style="width: 16px; height: 16px;"></i>
              </div>
              <div>
                <h3 style="font-size: 1.15rem; line-height: 1.2;">Campus 360 AI Assistant</h3>
                <span style="font-size: 0.72rem; color: var(--cyan-primary); font-family: var(--font-mono);">● Grounded Strictly on Verified Campus Records</span>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button type="button" class="btn btn-secondary btn-sm" id="clear-ai-chat-btn" style="font-size: 0.75rem;">Clear Chat</button>
              <button type="button" class="btn btn-secondary btn-sm" id="close-ai-modal-btn">✕</button>
            </div>
          </div>

          <div class="ai-chat-container">
            <div class="ai-chat-messages" id="ai-chat-messages-log">
              <div class="chat-bubble ai">
                👋 <strong>Hello!</strong> I am your <strong>Campus 360 AI Assistant</strong>. Ask me anything about your daily schedule, upcoming exams, assignment deadlines, attendance margins, lost & found items, or campus navigation.
              </div>
            </div>

            <div class="ai-quick-prompts">
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Prompts:</span>
              <button type="button" class="prompt-chip" data-query="What is my timetable today?">📅 Today's Classes</button>
              <button type="button" class="prompt-chip" data-query="Show urgent examination notices">🚨 Urgent Notices</button>
              <button type="button" class="prompt-chip" data-query="What assignments are due soon?">📝 Due Tasks</button>
              <button type="button" class="prompt-chip" data-query="How is my attendance in DBMS?">📊 Attendance Check</button>
              <button type="button" class="prompt-chip" data-query="Where is the HPC Lab / Room L-201?">🗺️ HPC Lab Location</button>
            </div>

            <form id="ai-chat-form" class="ai-chat-input-row">
              <input type="text" class="ai-chat-input" id="ai-user-input" placeholder="Ask about timetable, notices, exams, or labs..." autocomplete="off" />
              <button type="submit" class="btn btn-primary btn-sm" style="padding: 10px 18px; gap: 6px;">
                <i data-lucide="send" style="width: 15px; height: 15px;"></i>
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  function injectNotificationDrawer() {
    let notifDrawer = document.getElementById('cyber-notif-drawer');
    if (!notifDrawer) {
      notifDrawer = document.createElement('div');
      notifDrawer.id = 'cyber-notif-drawer';
      document.body.appendChild(notifDrawer);
    }

    const notifs = (window.CampusDB && window.CampusDB.getNotifications()) || [];

    notifDrawer.innerHTML = `
      <div class="modal-backdrop-custom" id="notif-backdrop">
        <div class="modal-container-custom" style="max-width: 440px; margin-right: 20px; margin-left: auto;">
          <div class="modal-header-custom">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i data-lucide="bell" style="width: 18px; height: 18px; color: var(--cyan-primary);"></i>
              <h3 style="font-size: 1.1rem;">Live Notifications</h3>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button type="button" class="btn btn-secondary btn-sm" id="mark-all-read-btn" style="font-size: 0.75rem;">Mark all read</button>
              <button type="button" class="btn btn-secondary btn-sm" id="close-notif-btn" style="padding: 4px 8px;">✕</button>
            </div>
          </div>
          <div class="modal-body-custom" style="padding: 16px; max-height: 480px; overflow-y: auto;">
            ${notifs.length === 0 ? `
              <div style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
                <i data-lucide="bell-off" style="width: 32px; height: 32px; margin-bottom: 8px; opacity: 0.5;"></i>
                <p>No notifications right now.</p>
              </div>
            ` : notifs.map(n => `
              <div class="notif-item-cyber ${n.read ? 'read' : 'unread'}" data-id="${n.id}" style="
                padding: 12px 14px;
                border-radius: var(--radius-sm);
                background: ${n.read ? 'transparent' : 'rgba(0, 240, 255, 0.05)'};
                border: 1px solid ${n.read ? 'var(--border-subtle)' : 'rgba(0, 240, 255, 0.25)'};
                margin-bottom: 10px;
                cursor: pointer;
                transition: all 0.2s ease;
              ">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
                  <strong style="font-size: 0.85rem; color: ${n.read ? 'var(--text-primary)' : 'var(--cyan-primary)'};">${n.title}</strong>
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono); white-space: nowrap;">${n.timestamp}</span>
                </div>
                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">${n.message}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function injectSearchPalette() {
    let searchEl = document.getElementById('cyber-search-palette');
    if (!searchEl) {
      searchEl = document.createElement('div');
      searchEl.id = 'cyber-search-palette';
      document.body.appendChild(searchEl);
    }

    searchEl.innerHTML = `
      <div class="modal-backdrop-custom" id="search-palette-backdrop">
        <div class="modal-container-custom" style="max-width: 620px;">
          <div style="padding: 16px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 12px;">
            <i data-lucide="search" style="width: 20px; height: 20px; color: var(--cyan-primary);"></i>
            <input type="text" id="palette-input" placeholder="Search notices, events, timetable, materials, or marketplace..." style="
              width: 100%;
              background: none;
              border: none;
              outline: none;
              color: var(--text-primary);
              font-size: 1rem;
              font-family: inherit;
            " />
            <button type="button" id="close-search-palette-btn" style="color: var(--text-muted); padding: 4px 8px;">✕</button>
          </div>
          <div id="palette-results" style="padding: 16px; max-height: 400px; overflow-y: auto;">
            <div style="color: var(--text-muted); font-size: 0.8rem; padding: 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">Suggested Links</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <a href="${resolvePath('pages/dashboard.html')}" style="padding: 10px 14px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.88rem; font-weight: 500;">📊 Smart Dashboard</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Attendance & Schedule</span>
              </a>
              <a href="${resolvePath('pages/notices.html')}" style="padding: 10px 14px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.88rem; font-weight: 500;">🚨 Mid-Term Examination Schedule</span>
                <span class="badge badge-rose">Urgent Notice</span>
              </a>
              <a href="${resolvePath('pages/campus-life.html')}" style="padding: 10px 14px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.88rem; font-weight: 500;">🎉 Technova 2026 Tech Fest</span>
                <span class="badge badge-cyan">Registrations Open</span>
              </a>
              <a href="${resolvePath('pages/academics.html')}" style="padding: 10px 14px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.88rem; font-weight: 500;">📚 Operating Systems & DSA Notes</span>
                <span class="badge badge-violet">Study Materials</span>
              </a>
              <a href="${resolvePath('pages/dashboard.html#feedback')}" style="padding: 10px 14px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.88rem; font-weight: 500;">💬 Student Feedback & Grievance Portal</span>
                <span class="badge badge-amber">Report Issue / Ticket</span>
              </a>
              <a href="${resolvePath('pages/opportunities.html')}" style="padding: 10px 14px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.88rem; font-weight: 500;">💼 Google Summer of Code & DRDO</span>
                <span class="badge badge-emerald">Internships</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function injectProfileMenu() {
    let profileModal = document.getElementById('cyber-profile-modal');
    if (!profileModal) {
      profileModal = document.createElement('div');
      profileModal.id = 'cyber-profile-modal';
      document.body.appendChild(profileModal);
    }

    const user = (window.CampusDB && window.CampusDB.getCurrentUser()) || {};
    const isAdmin = user.role === 'admin';

    profileModal.innerHTML = `
      <div class="modal-backdrop-custom" id="profile-backdrop">
        <div class="modal-container-custom" style="max-width: 420px;">
          <div class="modal-header-custom">
            <h3 style="font-size: 1.1rem;">Account & Role Profile</h3>
            <button type="button" class="btn btn-secondary btn-sm" id="close-profile-btn">✕</button>
          </div>
          <div class="modal-body-custom" style="text-align: center;">
            <div class="user-avatar ${isAdmin ? 'admin-avatar' : ''}" style="width: 64px; height: 64px; font-size: 1.5rem; margin: 0 auto 16px;">
              ${user.avatar || 'U'}
            </div>
            <h3 style="margin-bottom: 4px;">${user.name}</h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 14px;">${user.email}</p>
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: var(--radius-full); background: ${isAdmin ? 'rgba(168, 85, 247, 0.15)' : 'rgba(0, 240, 255, 0.12)'}; border: 1px solid ${isAdmin ? 'rgba(168, 85, 247, 0.3)' : 'rgba(0, 240, 255, 0.3)'}; color: ${isAdmin ? '#c084fc' : 'var(--cyan-primary)'}; font-size: 0.82rem; font-weight: 600; margin-bottom: 24px;">
              <span>${isAdmin ? '🛡️ Administrator Access' : '🎓 Enrolled Student'}</span>
              <span>•</span>
              <span>${user.department}</span>
            </div>

            <div style="text-align: left; background: var(--bg-deep); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 24px; font-size: 0.82rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Identifier / ID:</span>
                <strong style="font-family: var(--font-mono); color: var(--text-primary);">${user.id}</strong>
              </div>
              ${user.rollNo ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Roll Number:</span>
                <strong style="color: var(--text-primary);">${user.rollNo}</strong>
              </div>` : ''}
              ${user.cgpa ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Cumulative CGPA:</span>
                <strong style="color: var(--cyan-primary);">${user.cgpa} / 10.0</strong>
              </div>` : ''}
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Registered Phone:</span>
                <span style="color: var(--text-secondary);">${user.phone || '+91 98765 43210'}</span>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${isAdmin ? `
                <button type="button" class="btn btn-primary" id="switch-role-modal-btn">
                  🎓 Switch to Student Role
                </button>
              ` : `
                <button type="button" class="btn btn-violet" id="switch-role-modal-btn">
                  🛡️ Switch to Administrator Role
                </button>
              `}
              <a href="${resolvePath('login.html')}" class="btn btn-secondary" style="width: 100%;">
                Log Out to Login Screen
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function bindShellEvents() {
    // 1-Click Role Switchers
    const btnStudent = document.getElementById('quick-switch-student');
    const btnAdmin = document.getElementById('quick-switch-admin');
    const btnReset = document.getElementById('quick-reset-db');

    if (btnStudent) {
      btnStudent.addEventListener('click', () => {
        window.CampusDB.loginAs('student');
        window.showToast('Switched to Student mode (Alex Turner)', 'info');
        setTimeout(() => window.location.reload(), 300);
      });
    }

    if (btnAdmin) {
      btnAdmin.addEventListener('click', () => {
        window.CampusDB.loginAs('admin');
        window.showToast('Switched to Administrator console (Dr. Vikram Malhotra)', 'info');
        setTimeout(() => window.location.reload(), 300);
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Reset Campus 360 database back to initial seed data?')) {
          window.CampusDB.resetDatabase();
          window.showToast('Database reset to clean demo state', 'success');
          setTimeout(() => window.location.reload(), 400);
        }
      });
    }

    // Notification Panel
    const notifBtn = document.getElementById('notif-toggle-btn');
    const notifBackdrop = document.getElementById('notif-backdrop');
    const closeNotifBtn = document.getElementById('close-notif-btn');
    const markAllReadBtn = document.getElementById('mark-all-read-btn');

    if (notifBtn && notifBackdrop) {
      notifBtn.addEventListener('click', () => {
        notifBackdrop.classList.add('active');
        refreshLucideIcons();
      });
    }
    if (closeNotifBtn && notifBackdrop) {
      closeNotifBtn.addEventListener('click', () => notifBackdrop.classList.remove('active'));
    }
    if (notifBackdrop) {
      notifBackdrop.addEventListener('click', (e) => {
        if (e.target === notifBackdrop) notifBackdrop.classList.remove('active');
      });
    }
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', () => {
        window.CampusDB.markAllNotificationsRead();
        window.showToast('All notifications marked as read', 'info');
        initPageShell();
      });
    }

    // Search Palette
    const searchTrigger = document.getElementById('global-search-trigger');
    const searchBackdrop = document.getElementById('search-palette-backdrop');
    const closeSearchBtn = document.getElementById('close-search-palette-btn');
    const paletteInput = document.getElementById('palette-input');

    const openSearch = () => {
      if (searchBackdrop) {
        searchBackdrop.classList.add('active');
        if (paletteInput) paletteInput.focus();
        refreshLucideIcons();
      }
    };
    const closeSearch = () => {
      if (searchBackdrop) searchBackdrop.classList.remove('active');
    };

    if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
    if (searchBackdrop) {
      searchBackdrop.addEventListener('click', (e) => {
        if (e.target === searchBackdrop) closeSearch();
      });
    }
    if (paletteInput) {
      paletteInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const resultsBox = document.getElementById('palette-results');
        if (!resultsBox) return;

        const allItems = [
          { title: '📊 Smart Dashboard', sub: 'Attendance, Schedule & Fast Actions', url: resolvePath('pages/dashboard.html'), badge: 'Portal' },
          { title: '💬 Student Feedback & Grievance Portal', sub: 'Report campus issues, infrastructure, Wi-Fi or canteen tickets', url: resolvePath('pages/dashboard.html#feedback'), badge: 'Help Desk' },
          { title: '🔍 Lost & Found Center', sub: 'Report lost/found items or claim ownership', url: resolvePath('pages/campus-life.html#lost-found'), badge: 'Campus Life' },
          { title: '🗺️ Campus Navigation & Directory', sub: 'Classroom & laboratory directions finder', url: resolvePath('pages/campus-life.html#map'), badge: 'Map' },
          { title: '🚌 Bus Transport Routes & Timings', sub: 'Daily morning and evening routes', url: resolvePath('pages/dashboard.html#transport'), badge: 'Transport' },
          { title: '☕ Food Court & Canteen Menu', sub: 'Daily specials, prices & operating hours', url: resolvePath('pages/dashboard.html#canteen'), badge: 'Canteen' },
          { title: '🚨 Emergency Contacts', sub: '24/7 Security Desk, Ambulance & Health Clinic', url: resolvePath('pages/dashboard.html#emergency'), badge: 'Safety' },
          { title: '👥 Student Clubs & Societies', sub: 'Join technical, arts and athletics chapters', url: resolvePath('pages/campus-life.html#clubs'), badge: 'Clubs' },
          { title: '📢 Official Circulars & Notices', sub: 'Dean notices and mid-term exam schedule', url: resolvePath('pages/notices.html'), badge: 'Noticeboard' },
          { title: '📚 Academics Hub & Lecture Notes', sub: 'Course materials, assignments & timetable', url: resolvePath('pages/academics.html'), badge: 'Academics' },
          { title: '💼 Internships & Opportunities', sub: 'Research fellowships and company hiring', url: resolvePath('pages/opportunities.html'), badge: 'Careers' },
          { title: '🛒 Peer-to-Peer Marketplace', sub: 'Buy and sell textbooks, calculators & dorm items', url: resolvePath('pages/marketplace.html'), badge: 'Exchange' }
        ];

        const filtered = query ? allItems.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.sub.toLowerCase().includes(query) ||
          item.badge.toLowerCase().includes(query)
        ) : allItems.slice(0, 6);

        if (filtered.length === 0) {
          resultsBox.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              No matching pages or tools found for "<strong>${e.target.value}</strong>".
            </div>
          `;
          return;
        }

        resultsBox.innerHTML = `
          <div style="color: var(--text-muted); font-size: 0.8rem; padding: 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">
            ${query ? `Matching Results (${filtered.length})` : 'Suggested Links'}
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${filtered.map(item => `
              <a href="${item.url}" style="padding: 10px 14px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: space-between; text-decoration: none;">
                <div>
                  <span style="font-size: 0.88rem; font-weight: 500; color: var(--text-primary); display: block;">${item.title}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${item.sub}</span>
                </div>
                <span class="badge badge-cyan">${item.badge}</span>
              </a>
            `).join('')}
          </div>
        `;
      });
    }

    // Ctrl+K Shortcut
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') {
        closeSearch();
        if (notifBackdrop) notifBackdrop.classList.remove('active');
        const profBackdrop = document.getElementById('profile-backdrop');
        if (profBackdrop) profBackdrop.classList.remove('active');
      }
    });

    // Profile Dropdown
    const profBtn = document.getElementById('user-profile-btn');
    const profBackdrop = document.getElementById('profile-backdrop');
    const closeProfBtn = document.getElementById('close-profile-btn');
    const switchRoleModalBtn = document.getElementById('switch-role-modal-btn');

    if (profBtn && profBackdrop) {
      profBtn.addEventListener('click', () => profBackdrop.classList.add('active'));
    }
    if (closeProfBtn && profBackdrop) {
      closeProfBtn.addEventListener('click', () => profBackdrop.classList.remove('active'));
    }
    if (profBackdrop) {
      profBackdrop.addEventListener('click', (e) => {
        if (e.target === profBackdrop) profBackdrop.classList.remove('active');
      });
    }
    if (switchRoleModalBtn) {
      switchRoleModalBtn.addEventListener('click', () => {
        const currentUser = window.CampusDB.getCurrentUser();
        if (currentUser && currentUser.role === 'admin') {
          window.CampusDB.loginAs('student');
        } else {
          window.CampusDB.loginAs('admin');
        }
        window.location.reload();
      });
    }

    // AI Assistant Launcher & Modal Interaction
    const aiLauncher = document.getElementById('floating-ai-launcher');
    const aiTopbarTrigger = document.getElementById('ai-topbar-trigger');
    const aiModalBackdrop = document.getElementById('ai-modal-backdrop');
    const closeAIBtn = document.getElementById('close-ai-modal-btn');
    const clearAIChatBtn = document.getElementById('clear-ai-chat-btn');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiUserInput = document.getElementById('ai-user-input');
    const aiMessagesLog = document.getElementById('ai-chat-messages-log');

    const openAIModal = () => {
      if (aiModalBackdrop) {
        aiModalBackdrop.classList.add('active');
        if (aiUserInput) aiUserInput.focus();
        refreshLucideIcons();
      }
    };
    const closeAIModal = () => {
      if (aiModalBackdrop) aiModalBackdrop.classList.remove('active');
    };

    if (aiLauncher) aiLauncher.addEventListener('click', openAIModal);
    if (aiTopbarTrigger) aiTopbarTrigger.addEventListener('click', openAIModal);
    if (closeAIBtn) closeAIBtn.addEventListener('click', closeAIModal);
    if (aiModalBackdrop) {
      aiModalBackdrop.addEventListener('click', (e) => {
        if (e.target === aiModalBackdrop) closeAIModal();
      });
    }

    // Send AI Query Function
    const handleAISend = (queryText) => {
      const q = (queryText || (aiUserInput ? aiUserInput.value : '')).trim();
      if (!q || !aiMessagesLog) return;

      // 1. Append User Message Bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = q;
      aiMessagesLog.appendChild(userBubble);

      if (aiUserInput) aiUserInput.value = '';

      // 2. Typing Indicator Bubble
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble ai';
      typingBubble.id = 'ai-typing-temp';
      typingBubble.innerHTML = '<span style="color: var(--cyan-primary);">Campus AI is querying database records...</span>';
      aiMessagesLog.appendChild(typingBubble);
      aiMessagesLog.scrollTop = aiMessagesLog.scrollHeight;

      setTimeout(() => {
        if (typingBubble) typingBubble.remove();

        const response = window.CampusDB.queryAI(q);
        const aiBubble = document.createElement('div');
        aiBubble.className = 'chat-bubble ai';

        // Convert simple markdown lists and bolding to formatted HTML
        let formatted = response.answer
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\n\n/g, '<br><br>')
          .replace(/\n• /g, '<br>• ');

        let refsHtml = '';
        if (response.references && response.references.length > 0) {
          refsHtml = `
            <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border-subtle); display: flex; flex-wrap: wrap; gap: 6px;">
              <span style="font-size: 0.72rem; color: var(--text-muted); width: 100%;">Verified Source Links:</span>
              ${response.references.map(r => `
                <a href="${resolvePath(r.link)}" class="badge badge-cyan" style="text-decoration: none; font-size: 0.75rem;">
                  ${r.title} →
                </a>
              `).join('')}
            </div>
          `;
        }

        aiBubble.innerHTML = formatted + refsHtml;
        aiMessagesLog.appendChild(aiBubble);
        aiMessagesLog.scrollTop = aiMessagesLog.scrollHeight;
        refreshLucideIcons();
      }, 350);
    };

    if (aiChatForm) {
      aiChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAISend();
      });
    }

    // Prompt Chips
    document.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.query;
        handleAISend(query);
      });
    });

    if (clearAIChatBtn && aiMessagesLog) {
      clearAIChatBtn.addEventListener('click', () => {
        aiMessagesLog.innerHTML = `
          <div class="chat-bubble ai">
            👋 <strong>Chat history cleared.</strong> What else can I look up for you?
          </div>
        `;
      });
    }
  }

  function refreshLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Toast System
  window.showToast = function (message, type = 'info', iconName = null) {
    let stack = document.getElementById('cyber-toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'cyber-toast-stack';
      stack.className = 'toast-container-cyber';
      document.body.appendChild(stack);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-cyber';
    if (type === 'success') toast.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    if (type === 'error') toast.style.borderColor = 'rgba(244, 63, 94, 0.5)';

    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info';
    toast.innerHTML = `
      <i data-lucide="${iconName || icon}" style="width: 18px; height: 18px; color: ${type === 'success' ? '#34d399' : type === 'error' ? '#f43f5e' : 'var(--cyan-primary)'}; flex-shrink: 0;"></i>
      <span style="flex: 1;">${message}</span>
    `;

    stack.appendChild(toast);
    refreshLucideIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  window.refreshLucideIcons = refreshLucideIcons;
  window.initPageShell = initPageShell;

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageShell);
  } else {
    initPageShell();
  }

})();
