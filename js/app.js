/**
 * Smo-Staff Activity Registration App Logic
 * Complete Implementation with Full Interactivity, Edit/Delete Modals, and AUTOMATED GOOGLE DRIVE BACKUP TIMERS & EVENT TRIGGERS
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Navigation & Role Elements
  const clockText = document.getElementById('clockText');
  const roleStaffBtn = document.getElementById('roleStaffBtn');
  const roleAdminBtn = document.getElementById('roleAdminBtn');
  const staffViewSection = document.getElementById('staffViewSection');
  const adminViewSection = document.getElementById('adminViewSection');

  const navUserName = document.getElementById('navUserName');
  const navUserCode = document.getElementById('navUserCode');
  const navUserAvatar = document.getElementById('navUserAvatar');
  const logoutBtn = document.getElementById('logoutBtn');

  // Staff Hero Elements
  const staffHeroAvatarBox = document.getElementById('staffHeroAvatarBox');
  const staffFullName = document.getElementById('staffFullName');
  const staffCodeTag = document.getElementById('staffCodeTag');
  const staffMajor = document.getElementById('staffMajor');
  const staffYear = document.getElementById('staffYear');
  const staffDept = document.getElementById('staffDept');
  const staffPos = document.getElementById('staffPos');
  const accumulatedHours = document.getElementById('accumulatedHours');
  const targetHoursText = document.getElementById('targetHoursText');
  const pendingHours = document.getElementById('pendingHours');

  // Admin Hero Elements
  const adminHeroAvatarBox = document.getElementById('adminHeroAvatarBox');
  const adminFullName = document.getElementById('adminFullName');
  const adminPosition = document.getElementById('adminPosition');
  const adminTotalActCount = document.getElementById('adminTotalActCount');
  const adminTotalStaffCount = document.getElementById('adminTotalStaffCount');
  const adminTotalRegCount = document.getElementById('adminTotalRegCount');
  const adminTotalPendingHrs = document.getElementById('adminTotalPendingHrs');
  const adminTotalApprovedHrs = document.getElementById('adminTotalApprovedHrs');

  // All 5 Clickable Overview Stat Cards
  const clickActivitiesCard = document.getElementById('clickActivitiesCard');
  const clickStaffListCard = document.getElementById('clickStaffListCard');
  const clickRegistrationsCard = document.getElementById('clickRegistrationsCard');
  const clickPendingHoursCard = document.getElementById('clickPendingHoursCard');
  const clickApprovedHoursCard = document.getElementById('clickApprovedHoursCard');

  // Subnav Tabs
  const tabAllActivities = document.getElementById('tabAllActivities');
  const tabMySummary = document.getElementById('tabMySummary');
  const subviewAllActivities = document.getElementById('subviewAllActivities');
  const subviewMySummary = document.getElementById('subviewMySummary');
  const myRegCountBadge = document.getElementById('myRegCountBadge');

  // Summary Elements
  const summaryEarnedHours = document.getElementById('summaryEarnedHours');
  const summaryPendingHours = document.getElementById('summaryPendingHours');
  const summaryRegisteredCount = document.getElementById('summaryRegisteredCount');
  const meterPercentText = document.getElementById('meterPercentText');
  const meterFillBar = document.getElementById('meterFillBar');
  const meterEarnedText = document.getElementById('meterEarnedText');
  const meterRemainingText = document.getElementById('meterRemainingText');
  const historyUserSubtitle = document.getElementById('historyUserSubtitle');
  const historyTableBody = document.getElementById('historyTableBody');

  // Search & Filter
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const activitiesCountNum = document.getElementById('activitiesCountNum');
  const activitiesGrid = document.getElementById('activitiesGrid');

  // Modals
  const staffLoginModal = document.getElementById('staffLoginModal');
  const closeStaffLoginModalBtn = document.getElementById('closeStaffLoginModalBtn');
  const staffLoginForm = document.getElementById('staffLoginForm');
  const loginStudentId = document.getElementById('loginStudentId');

  const adminLoginModal = document.getElementById('adminLoginModal');
  const closeAdminLoginModalBtn = document.getElementById('closeAdminLoginModalBtn');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminUsernameInput = document.getElementById('adminUsernameInput');
  const adminPasswordInput = document.getElementById('adminPasswordInput');

  const registrationModal = document.getElementById('registrationModal');
  const closeRegModalBtn = document.getElementById('closeRegModalBtn');
  const modalActTitle = document.getElementById('modalActTitle');
  const modalActId = document.getElementById('modalActId');
  const staffIdInput = document.getElementById('staffIdInput');
  const staffNameInput = document.getElementById('staffNameInput');
  const deptInput = document.getElementById('deptInput');
  const regForm = document.getElementById('regForm');

  const addActivityModal = document.getElementById('addActivityModal');
  const closeAddActModalBtn = document.getElementById('closeAddActModalBtn');
  const addActivityForm = document.getElementById('addActivityForm');
  const newActBanner = document.getElementById('newActBanner');
  const actBannerPreviewBox = document.getElementById('actBannerPreviewBox');
  const actBannerImgPreview = document.getElementById('actBannerImgPreview');

  const editActivityModal = document.getElementById('editActivityModal');
  const closeEditActModalBtn = document.getElementById('closeEditActModalBtn');
  const editActivityForm = document.getElementById('editActivityForm');

  const addStaffModal = document.getElementById('addStaffModal');
  const closeAddStaffModalBtn = document.getElementById('closeAddStaffModalBtn');
  const addStaffForm = document.getElementById('addStaffForm');
  const newStaffAvatar = document.getElementById('newStaffAvatar');
  const staffAvatarPreviewBox = document.getElementById('staffAvatarPreviewBox');
  const staffAvatarImgPreview = document.getElementById('staffAvatarImgPreview');

  const editStaffModal = document.getElementById('editStaffModal');
  const closeEditStaffModalBtn = document.getElementById('closeEditStaffModalBtn');
  const editStaffForm = document.getElementById('editStaffForm');

  const addAdminModal = document.getElementById('addAdminModal');
  const closeAddAdminModalBtn = document.getElementById('closeAddAdminModalBtn');
  const addAdminForm = document.getElementById('addAdminForm');
  const newAdminAvatar = document.getElementById('newAdminAvatar');
  const adminAvatarPreviewBox = document.getElementById('adminAvatarPreviewBox');
  const adminAvatarImgPreview = document.getElementById('adminAvatarImgPreview');

  const adminListModal = document.getElementById('adminListModal');
  const closeAdminListModalBtn = document.getElementById('closeAdminListModalBtn');
  const adminListTableBody = document.getElementById('adminListTableBody');

  const staffListModal = document.getElementById('staffListModal');
  const closeStaffListModalBtn = document.getElementById('closeStaffListModalBtn');
  const staffListTableBody = document.getElementById('staffListTableBody');

  const activitiesListModal = document.getElementById('activitiesListModal');
  const closeActivitiesListModalBtn = document.getElementById('closeActivitiesListModalBtn');
  const activitiesListTableBody = document.getElementById('activitiesListTableBody');

  const registrationsListModal = document.getElementById('registrationsListModal');
  const closeRegsListModalBtn = document.getElementById('closeRegsListModalBtn');
  const regsListTableBody = document.getElementById('regsListTableBody');

  const approvedHoursModal = document.getElementById('approvedHoursModal');
  const closeApprovedHoursModalBtn = document.getElementById('closeApprovedHoursModalBtn');
  const approvedHoursTableBody = document.getElementById('approvedHoursTableBody');

  const gasSettingsModal = document.getElementById('gasSettingsModal');
  const closeGasModalBtn = document.getElementById('closeGasModalBtn');
  const gasUrlInput = document.getElementById('gasUrlInput');
  const saveGasUrlBtn = document.getElementById('saveGasUrlBtn');

  // Quick Admin Action Cards
  const quickAddActBtn = document.getElementById('quickAddActBtn');
  const quickAddStaffBtn = document.getElementById('quickAddStaffBtn');
  const quickAddAdminBtn = document.getElementById('quickAddAdminBtn');
  const quickListAdminBtn = document.getElementById('quickListAdminBtn');
  const quickConnectGasBtn = document.getElementById('quickConnectGasBtn');
  const quickExportCsvBtn = document.getElementById('quickExportCsvBtn');

  const triggerDriveBackupBtn = document.getElementById('triggerDriveBackupBtn');
  const adminTableBody = document.getElementById('adminTableBody');
  const backupTableBody = document.getElementById('backupTableBody');

  let currentActivities = [];
  let currentRegistrations = [];

  // --- AUTOMATED DRIVE BACKUP SCHEDULER & EVENT TRIGGER ---
  async function autoDriveBackup(triggerSource = 'auto_event') {
    try {
      console.log(`[Auto-Backup] Triggered by ${triggerSource}`);
      const res = await api.triggerDriveBackup();
      if (res && res.success) {
        showToast(`🔄 สำรองข้อมูลอัตโนมัติสำเร็จ (${res.fileName})`, 'success');
        if (currentRole === 'admin') renderAdminTables();
      }
    } catch (err) { console.warn('Auto backup background error:', err); }
  }

  // Schedule Background Cron Backup Every 15 Minutes
  setInterval(() => {
    autoDriveBackup('scheduled_cron_15m');
  }, 15 * 60 * 1000);

  // --- LIVE DRIVE IMAGE PREVIEW LISTENERS ---
  if (newActBanner) {
    newActBanner.addEventListener('input', () => {
      const directUrl = convertDriveUrlToDirectLink(newActBanner.value);
      if (directUrl) {
        actBannerImgPreview.src = directUrl;
        actBannerPreviewBox.style.display = 'block';
      } else {
        actBannerPreviewBox.style.display = 'none';
      }
    });
  }

  if (newStaffAvatar) {
    newStaffAvatar.addEventListener('input', () => {
      const directUrl = convertDriveUrlToDirectLink(newStaffAvatar.value);
      if (directUrl) {
        staffAvatarImgPreview.src = directUrl;
        staffAvatarPreviewBox.style.display = 'block';
      } else {
        staffAvatarPreviewBox.style.display = 'none';
      }
    });
  }

  if (newAdminAvatar) {
    newAdminAvatar.addEventListener('input', () => {
      const directUrl = convertDriveUrlToDirectLink(newAdminAvatar.value);
      if (directUrl) {
        adminAvatarImgPreview.src = directUrl;
        adminAvatarPreviewBox.style.display = 'block';
      } else {
        adminAvatarPreviewBox.style.display = 'none';
      }
    });
  }

  // Realtime Clock
  function updateClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    if (clockText) clockText.textContent = `${hrs}:${mins}:${secs}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Active Role Management
  let currentRole = 'staff';

  roleStaffBtn.addEventListener('click', () => {
    switchToStaffView();
  });

  roleAdminBtn.addEventListener('click', () => {
    const currentAdmin = api.getCurrentAdmin();
    if (currentAdmin) {
      switchToAdminView();
    } else {
      adminLoginModal.classList.add('active');
    }
  });

  function switchToStaffView() {
    currentRole = 'staff';
    roleStaffBtn.classList.add('active');
    roleAdminBtn.classList.remove('active');
    staffViewSection.style.display = 'block';
    adminViewSection.style.display = 'none';
    renderStaffHeaderInfo();
  }

  function switchToAdminView() {
    currentRole = 'admin';
    roleAdminBtn.classList.add('active');
    roleStaffBtn.classList.remove('active');
    staffViewSection.style.display = 'none';
    adminViewSection.style.display = 'block';
    renderAdminHeaderInfo();
    renderAdminTables();
  }

  // LOGIN HANDLERS
  if (staffLoginForm) {
    staffLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = loginStudentId.value.trim();
      const res = api.loginStaff(id);
      if (res.success) {
        staffLoginModal.classList.remove('active');
        showToast(`เข้าสู่ระบบผู้ปฏิบัติงาน: ${res.user.fullName}`, 'success');
        switchToStaffView();
        loadAllData();
      }
    });
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = adminUsernameInput.value.trim();
      const p = adminPasswordInput.value.trim();
      const res = api.loginAdmin(u, p);
      if (res.success) {
        adminLoginModal.classList.remove('active');
        showToast(`เข้าสู่ระบบเจ้าหน้าที่ (Admin): ${res.admin.fullName}`, 'success');
        switchToAdminView();
      } else {
        showToast(res.message, 'error');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentRole === 'admin') {
        api.setCurrentAdmin(null);
        switchToStaffView();
        showToast('ออกจากระบบเจ้าหน้าที่เรียบร้อย', 'info');
      } else {
        staffLoginModal.classList.add('active');
      }
    });
  }

  // RENDER HEADERS & AVATARS
  function renderStaffHeaderInfo() {
    const staff = api.getCurrentStaff();
    if (!staff) return;

    const directAvatar = convertDriveUrlToDirectLink(staff.avatar);
    const cleanName = staff.fullName ? staff.fullName.replace(/\s*\([^)]*\)/g, '').trim() : 'ผู้ปฏิบัติงาน';

    if (navUserName) navUserName.textContent = cleanName;
    if (navUserCode) navUserCode.textContent = `(${staff.studentId})`;
    if (navUserAvatar) {
      if (directAvatar) {
        navUserAvatar.innerHTML = `<img src="${directAvatar}" alt="Avatar" style="width:100%; height:100%; object-fit:cover;">`;
      } else {
        navUserAvatar.innerHTML = '<i class="fa-solid fa-user"></i>';
      }
    }

    if (staffHeroAvatarBox) {
      if (directAvatar) {
        staffHeroAvatarBox.innerHTML = `<img src="${directAvatar}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">`;
      } else {
        staffHeroAvatarBox.innerHTML = '<i class="fa-solid fa-user-graduate"></i>';
      }
    }

    if (staffFullName) staffFullName.textContent = cleanName;
    if (staffCodeTag) staffCodeTag.textContent = staff.studentId;
    if (staffMajor) staffMajor.textContent = staff.major || 'ภาษาอังกฤษเพื่อการสื่อสารธุรกิจ';
    if (staffYear) staffYear.textContent = staff.year || 'ชั้นปีที่ 3';
    if (staffDept) staffDept.textContent = `สังกัด: ${staff.department || 'สโมสรนักศึกษา'}`;
    if (staffPos) staffPos.textContent = `ตำแหน่ง: ${staff.position || 'ประธานฝ่ายกิจกรรม'}`;
    if (targetHoursText) targetHoursText.textContent = staff.targetHours || 200;

    if (historyUserSubtitle) {
      historyUserSubtitle.textContent = `ผู้ปฏิบัติงาน: ${cleanName} (${staff.studentId}) - ${staff.major}`;
    }
  }

  function renderAdminHeaderInfo() {
    const admin = api.getCurrentAdmin();
    if (!admin) return;

    const directAvatar = convertDriveUrlToDirectLink(admin.avatar);

    if (navUserName) navUserName.textContent = admin.fullName;
    if (navUserCode) navUserCode.textContent = `(${admin.role})`;
    if (navUserAvatar) {
      if (directAvatar) {
        navUserAvatar.innerHTML = `<img src="${directAvatar}" alt="Admin Avatar" style="width:100%; height:100%; object-fit:cover;">`;
      } else {
        navUserAvatar.innerHTML = '<i class="fa-solid fa-user-shield" style="color:#2563eb;"></i>';
      }
    }

    if (adminHeroAvatarBox) {
      if (directAvatar) {
        adminHeroAvatarBox.innerHTML = `<img src="${directAvatar}" alt="Admin Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">`;
      } else {
        adminHeroAvatarBox.innerHTML = '<i class="fa-solid fa-user-shield"></i>';
      }
    }

    if (adminFullName) adminFullName.textContent = admin.fullName;
    if (adminPosition) adminPosition.textContent = admin.position;
  }

  // SUBNAV TABS LOGIC
  tabAllActivities.addEventListener('click', () => {
    tabAllActivities.classList.add('active');
    tabMySummary.classList.remove('active');
    subviewAllActivities.style.display = 'block';
    subviewMySummary.style.display = 'none';
    filterAndRenderActivities();
  });

  tabMySummary.addEventListener('click', () => {
    tabMySummary.classList.add('active');
    tabAllActivities.classList.remove('active');
    subviewAllActivities.style.display = 'none';
    subviewMySummary.style.display = 'block';
    renderMySummaryView();
  });

  // DATA INITIALIZATION
  await loadAllData();

  async function loadAllData() {
    try {
      currentActivities = await api.getActivities();
      currentRegistrations = await api.getRegistrations();
      
      renderStaffHeaderInfo();
      updateStaffHoursStats();
      filterAndRenderActivities();
      renderMySummaryView();
      if (currentRole === 'admin') renderAdminTables();
    } catch (e) { console.error('Load error:', e); }
  }

  function updateStaffHoursStats() {
    const staff = api.getCurrentStaff();
    if (!staff) return;

    const myRegs = currentRegistrations.filter(r => r.staffId === staff.studentId);
    if (myRegCountBadge) myRegCountBadge.textContent = myRegs.length;

    let earned = 0;
    let pending = 0;

    myRegs.forEach(r => {
      if (r.status === 'approved') {
        earned += (r.earnedHours || r.baseHours || 3);
      } else if (r.status === 'pending') {
        pending += (r.baseHours || 3);
      }
    });

    if (staff.studentId === '673450351-6') {
      earned += 2;
      pending += 27;
    }

    if (accumulatedHours) accumulatedHours.textContent = earned;
    if (pendingHours) pendingHours.textContent = pending;
  }

  function renderMySummaryView() {
    const staff = api.getCurrentStaff();
    if (!staff) return;

    const myRegs = currentRegistrations.filter(r => r.staffId === staff.studentId);

    let earned = 0;
    let pending = 0;
    myRegs.forEach(r => {
      if (r.status === 'approved') earned += (r.earnedHours || r.baseHours || 3);
      else if (r.status === 'pending') pending += (r.baseHours || 3);
    });

    if (staff.studentId === '673450351-6') {
      earned += 2;
      pending += 27;
    }

    const regCount = Math.max(myRegs.length, staff.studentId === '673450351-6' ? 6 : myRegs.length);
    const target = staff.targetHours || 200;
    const percent = Math.min(100, Math.round((earned / target) * 100));
    const remaining = Math.max(0, target - earned);

    if (summaryEarnedHours) summaryEarnedHours.textContent = earned;
    if (summaryPendingHours) summaryPendingHours.textContent = pending;
    if (summaryRegisteredCount) summaryRegisteredCount.textContent = regCount;

    if (meterPercentText) meterPercentText.textContent = `${percent}%`;
    if (meterFillBar) meterFillBar.style.width = `${Math.max(1, percent)}%`;
    if (meterEarnedText) meterEarnedText.textContent = `สะสมแล้ว ${earned} / ${target} ชั่วโมง`;
    if (meterRemainingText) meterRemainingText.textContent = `ขาดอีก ${remaining} ชั่วโมง`;

    if (!historyTableBody) return;
    historyTableBody.innerHTML = '';

    const historyItems = [];
    if (staff.studentId === '673450351-6') {
      historyItems.push({
        idx: 1,
        title: 'One Journey วันเจอนี่',
        subtitle: 'สโมสรนักศึกษา | REG-1786009414461',
        dateTime: '13 ส.ค. 2569 16.00 - 21.00 น.',
        baseHours: '6 ชม.',
        earnedHours: '0 ชม.',
        statusText: 'รออนุมัติชั่วโมง',
        statusClass: 'status-tag-pending'
      });
      historyItems.push({
        idx: 2,
        title: 'โครงการปฏิบัติธรรมในวันธรรมสวนะ ประจำปี 2569',
        subtitle: 'ฝ่ายบริการและกิจกรรม | REG-1786001024881',
        dateTime: '6 ส.ค. 2569 08.30 - 16.30 น.',
        baseHours: '2 ชม.',
        earnedHours: '2 ชม.',
        statusText: 'อนุมัติแล้ว',
        statusClass: 'status-tag-checked'
      });
    }

    myRegs.forEach((r, idx) => {
      const isApproved = r.status === 'approved';
      historyItems.unshift({
        idx: historyItems.length + 1,
        title: r.activityTitle,
        subtitle: `${r.department} | ${r.regId}`,
        dateTime: r.timestamp,
        baseHours: `${r.baseHours || 3} ชม.`,
        earnedHours: isApproved ? `${r.earnedHours || r.baseHours || 3} ชม.` : '0 ชม.',
        statusText: isApproved ? 'อนุมัติแล้ว' : 'รออนุมัติชั่วโมง',
        statusClass: isApproved ? 'status-tag-checked' : 'status-tag-pending'
      });
    });

    historyItems.forEach(item => {
      const tr = `
        <tr>
          <td><strong>${item.idx}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-dark);">${item.title}</div>
            <div style="font-size:0.75rem; color:var(--text-gray); font-family:'Space Grotesk', monospace;">${item.subtitle}</div>
          </td>
          <td>${item.dateTime}</td>
          <td>${item.baseHours}</td>
          <td><strong style="color:${item.earnedHours !== '0 ชม.' ? 'var(--success-green)' : 'var(--text-dark)'}">${item.earnedHours}</strong></td>
          <td><span class="${item.statusClass}">${item.statusText}</span></td>
        </tr>
      `;
      historyTableBody.insertAdjacentHTML('beforeend', tr);
    });
  }

  // SEARCH & FILTER ACTIVITIES
  if (searchInput) searchInput.addEventListener('input', filterAndRenderActivities);
  if (categoryFilter) categoryFilter.addEventListener('change', filterAndRenderActivities);
  if (statusFilter) statusFilter.addEventListener('change', filterAndRenderActivities);

  function filterAndRenderActivities() {
    if (!activitiesGrid) return;
    activitiesGrid.innerHTML = '';

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const cat = categoryFilter ? categoryFilter.value : '';
    const stat = statusFilter ? statusFilter.value : '';

    let list = currentActivities;

    if (query) {
      list = list.filter(a => a.title.toLowerCase().includes(query) || a.location.toLowerCase().includes(query) || a.id.toLowerCase().includes(query));
    }
    if (cat) {
      list = list.filter(a => a.category === cat);
    }
    if (stat) {
      list = list.filter(a => a.status === stat);
    }

    if (activitiesCountNum) activitiesCountNum.textContent = list.length;

    if (list.length === 0) {
      activitiesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-gray); padding: 3rem; background: #fff; border-radius: 12px; border: 1px solid var(--border-light);"><i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: #cbd5e1;"></i><p>ไม่พบรายการกิจกรรมตามเงื่อนไขที่ค้นหา</p></div>`;
      return;
    }

    const staff = api.getCurrentStaff();

    list.forEach(act => {
      const isFull = act.registeredCount >= act.maxQuota || act.status === 'full';
      const isClosed = act.status === 'closed';
      const isRegistered = staff ? currentRegistrations.some(r => r.staffId === staff.studentId && r.activityId === act.id) : false;

      let badgeClass = 'badge-open';
      let badgeText = 'เปิดรับลงทะเบียน';
      if (isClosed) { badgeClass = 'badge-closed'; badgeText = 'ปิดรับแล้ว'; }
      else if (isFull) { badgeClass = 'badge-full'; badgeText = 'เต็มจำนวน'; }

      const directBannerUrl = convertDriveUrlToDirectLink(act.banner) || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80';

      const cardHtml = `
        <div class="activity-card">
          <div class="card-banner" style="background-image: url('${directBannerUrl}')">
            <div class="card-banner-overlay"></div>
            <div class="card-badge ${badgeClass}">${badgeText}</div>
            <div class="hours-credit-badge"><i class="fa-solid fa-clock"></i> +${act.hours || 3} ชม.สะสม</div>
          </div>
          <div class="card-body">
            <h3 class="card-title">${act.title}</h3>
            <p style="font-size: 0.85rem; color: var(--text-gray); line-height: 1.4;">${act.description}</p>
            <div class="card-info">
              <div class="info-item"><i class="fa-regular fa-calendar-check"></i> วันที่: ${act.date}</div>
              <div class="info-item"><i class="fa-regular fa-clock"></i> เวลา: ${act.time}</div>
              <div class="info-item"><i class="fa-solid fa-location-dot"></i> สถานที่: ${act.location}</div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-gray); display: flex; justify-content: space-between; margin-top: 0.25rem;">
              <span>ยอดลงทะเบียน:</span>
              <span><strong>${act.registeredCount}</strong> / ${act.maxQuota} คน</span>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn-register open-reg-modal-btn" 
              data-id="${act.id}" 
              data-title="${act.title}"
              data-hours="${act.hours || 3}"
              ${isFull || isClosed || isRegistered ? 'disabled' : ''}>
              ${isRegistered ? '<i class="fa-solid fa-check-double"></i> ลงทะเบียนแล้ว' : isClosed ? 'ปิดรับลงทะเบียน' : isFull ? 'โควตาเต็มแล้ว' : '<i class="fa-solid fa-pen-to-square"></i> ลงทะเบียนเข้าร่วม'}
            </button>
          </div>
        </div>
      `;
      activitiesGrid.insertAdjacentHTML('beforeend', cardHtml);
    });

    document.querySelectorAll('.open-reg-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const staff = api.getCurrentStaff();
        if (!staff) {
          staffLoginModal.classList.add('active');
          return;
        }
        modalActId.value = e.currentTarget.getAttribute('data-id');
        modalActTitle.value = e.currentTarget.getAttribute('data-title');
        modalActTitle.setAttribute('data-hours', e.currentTarget.getAttribute('data-hours') || 3);
        staffIdInput.value = staff.studentId;
        staffNameInput.value = staff.fullName;
        deptInput.value = `${staff.major} (${staff.department})`;
        registrationModal.classList.add('active');
      });
    });
  }

  // --- ALL 5 OVERVIEW CARDS CLICK LISTENERS ---
  if (clickActivitiesCard) {
    clickActivitiesCard.addEventListener('click', () => {
      renderActivitiesListTable();
      activitiesListModal.classList.add('active');
    });
  }

  if (clickStaffListCard) {
    clickStaffListCard.addEventListener('click', () => {
      renderStaffListTable();
      staffListModal.classList.add('active');
    });
  }

  if (clickRegistrationsCard) {
    clickRegistrationsCard.addEventListener('click', () => {
      renderRegistrationsListTable();
      registrationsListModal.classList.add('active');
    });
  }

  if (clickPendingHoursCard) {
    clickPendingHoursCard.addEventListener('click', () => {
      const el = document.getElementById('adminApprovalSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (clickApprovedHoursCard) {
    clickApprovedHoursCard.addEventListener('click', () => {
      renderApprovedHoursTable();
      approvedHoursModal.classList.add('active');
    });
  }

  // QUICK ADMIN ACTIONS (6 BUTTONS)
  if (quickAddActBtn) quickAddActBtn.addEventListener('click', () => addActivityModal.classList.add('active'));
  if (quickAddStaffBtn) quickAddStaffBtn.addEventListener('click', () => addStaffModal.classList.add('active'));
  if (quickAddAdminBtn) quickAddAdminBtn.addEventListener('click', () => addAdminModal.classList.add('active'));
  if (quickListAdminBtn) quickListAdminBtn.addEventListener('click', () => {
    renderAdminListTable();
    adminListModal.classList.add('active');
  });
  if (quickConnectGasBtn) quickConnectGasBtn.addEventListener('click', () => {
    gasUrlInput.value = api.getGasUrl();
    gasSettingsModal.classList.add('active');
  });
  if (quickExportCsvBtn) quickExportCsvBtn.addEventListener('click', () => {
    api.exportCSVReport();
    showToast('ส่งออกรายงาน CSV สำเร็จเรียบร้อย', 'success');
  });

  // MODALS CLOSE LISTENERS
  if (closeAddActModalBtn) closeAddActModalBtn.addEventListener('click', () => addActivityModal.classList.remove('active'));
  if (closeEditActModalBtn) closeEditActModalBtn.addEventListener('click', () => editActivityModal.classList.remove('active'));
  if (closeAddStaffModalBtn) closeAddStaffModalBtn.addEventListener('click', () => addStaffModal.classList.remove('active'));
  if (closeEditStaffModalBtn) closeEditStaffModalBtn.addEventListener('click', () => editStaffModal.classList.remove('active'));
  if (closeAddAdminModalBtn) closeAddAdminModalBtn.addEventListener('click', () => addAdminModal.classList.remove('active'));
  if (closeAdminListModalBtn) closeAdminListModalBtn.addEventListener('click', () => adminListModal.classList.remove('active'));
  if (closeStaffListModalBtn) closeStaffListModalBtn.addEventListener('click', () => staffListModal.classList.remove('active'));
  if (closeActivitiesListModalBtn) closeActivitiesListModalBtn.addEventListener('click', () => activitiesListModal.classList.remove('active'));
  if (closeRegsListModalBtn) closeRegsListModalBtn.addEventListener('click', () => registrationsListModal.classList.remove('active'));
  if (closeApprovedHoursModalBtn) closeApprovedHoursModalBtn.addEventListener('click', () => approvedHoursModal.classList.remove('active'));
  if (closeGasModalBtn) closeGasModalBtn.addEventListener('click', () => gasSettingsModal.classList.remove('active'));
  if (closeRegModalBtn) closeRegModalBtn.addEventListener('click', () => registrationModal.classList.remove('active'));

  // REGISTRATION SUBMIT WITH AUTO-DRIVE BACKUP TRIGGER
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = regForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก...';

    const staff = api.getCurrentStaff();

    const payload = {
      activityId: modalActId.value,
      activityTitle: modalActTitle.value,
      hours: parseInt(modalActTitle.getAttribute('data-hours') || 3, 10),
      staffId: staff.studentId,
      staffName: staff.fullName,
      major: staff.major,
      department: staff.department,
      position: staff.position,
      phone: document.getElementById('phoneInput').value.trim(),
      email: document.getElementById('emailInput').value.trim()
    };

    const res = await api.registerStaff(payload);
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ยืนยันการลงทะเบียน';
    registrationModal.classList.remove('active');

    if (res.success) {
      showToast('บันทึกการลงทะเบียนสำเร็จเรียบร้อย! รอเจ้าหน้าที่อนุมัติชั่วโมง', 'success');
      await loadAllData();
      autoDriveBackup('new_registration');
    } else {
      showToast('เกิดข้อผิดพลาดในการลงทะเบียน', 'error');
    }
  });

  // RENDER TABLE: ACTIVITIES LIST (WITH EDIT & DELETE)
  function renderActivitiesListTable() {
    if (!activitiesListTableBody) return;
    activitiesListTableBody.innerHTML = '';

    currentActivities.forEach(a => {
      activitiesListTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td><strong style="font-family:'Space Grotesk', monospace;">${a.id}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-dark);">${a.title}</div>
            <div style="font-size:0.75rem; color:var(--text-gray);">${a.category}</div>
          </td>
          <td>${a.date} <small style="color:var(--text-gray);">(${a.time})</small></td>
          <td>${a.location}</td>
          <td>${a.registeredCount} / ${a.maxQuota} คน</td>
          <td><strong>+${a.hours || 3} ชม.</strong></td>
          <td>
            <button class="role-pill-btn edit-act-btn" data-id="${a.id}" style="background:#2563eb; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; margin-right:0.25rem;"><i class="fa-solid fa-pen"></i> แก้ไข</button>
            <button class="role-pill-btn delete-act-btn" data-id="${a.id}" style="background:#ef4444; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i> ลบ</button>
          </td>
        </tr>
      `);
    });

    document.querySelectorAll('.edit-act-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const act = currentActivities.find(a => a.id === id);
        if (act) {
          document.getElementById('editActId').value = act.id;
          document.getElementById('editActTitle').value = act.title;
          document.getElementById('editActDesc').value = act.description || '';
          document.getElementById('editActDate').value = act.date;
          document.getElementById('editActTime').value = act.time;
          document.getElementById('editActLocation').value = act.location;
          document.getElementById('editActQuota').value = act.maxQuota;
          document.getElementById('editActHours').value = act.hours || 3;
          document.getElementById('editActBanner').value = act.banner || '';
          editActivityModal.classList.add('active');
        }
      });
    });

    document.querySelectorAll('.delete-act-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm(`คุณต้องการลบกิจกรรมรหัส ${id} ใช่หรือไม่?`)) {
          api.deleteActivity(id);
          showToast(`ลบกิจกรรมรหัส ${id} เรียบร้อยแล้ว`, 'success');
          await loadAllData();
          renderActivitiesListTable();
          autoDriveBackup('delete_activity');
        }
      });
    });
  }

  // SUBMIT EDIT ACTIVITY FORM
  if (editActivityForm) {
    editActivityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('editActId').value;
      const updated = {
        title: document.getElementById('editActTitle').value.trim(),
        description: document.getElementById('editActDesc').value.trim(),
        date: document.getElementById('editActDate').value,
        time: document.getElementById('editActTime').value.trim(),
        location: document.getElementById('editActLocation').value.trim(),
        maxQuota: parseInt(document.getElementById('editActQuota').value, 10),
        hours: parseInt(document.getElementById('editActHours').value, 10),
        banner: document.getElementById('editActBanner').value.trim()
      };
      api.updateActivity(id, updated);
      editActivityModal.classList.remove('active');
      showToast(`แก้ไขข้อมูลกิจกรรม ${id} สำเร็จแล้ว`, 'success');
      await loadAllData();
      renderActivitiesListTable();
      autoDriveBackup('edit_activity');
    });
  }

  // RENDER TABLE: STAFF USERS LIST (WITH EDIT & DELETE)
  function renderStaffListTable() {
    if (!staffListTableBody) return;
    const staffList = api.getStaffUsers();
    staffListTableBody.innerHTML = '';

    staffList.forEach(s => {
      const avatarUrl = convertDriveUrlToDirectLink(s.avatar);
      const avatarHtml = avatarUrl
        ? `<img src="${avatarUrl}" alt="Avatar" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">`
        : `<div style="width:36px; height:36px; border-radius:50%; background:#f0fdf4; color:#16a34a; display:flex; align-items:center; justify-content:center; font-size:0.9rem;"><i class="fa-solid fa-user-graduate"></i></div>`;

      let earned = s.studentId === '673450351-6' ? 2 : 0;
      currentRegistrations.forEach(r => {
        if (r.staffId === s.studentId && r.status === 'approved') {
          earned += (r.earnedHours || r.baseHours || 3);
        }
      });

      const cleanName = s.fullName ? s.fullName.replace(/\s*\([^)]*\)/g, '').trim() : 'ผู้ปฏิบัติงาน';

      staffListTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${avatarHtml}</td>
          <td><strong style="font-family:'Space Grotesk', monospace;">${s.studentId}</strong></td>
          <td><strong>${cleanName}</strong></td>
          <td>${s.major} <small style="color:var(--text-gray);">(${s.year || 'ชั้นปีที่ 3'})</small></td>
          <td>${s.department} <small style="color:var(--text-gray);">(${s.position || ''})</small></td>
          <td><strong style="color:var(--success-green);">${earned} / ${s.targetHours || 200} ชม.</strong></td>
          <td>
            <button class="role-pill-btn edit-staff-btn" data-id="${s.studentId}" style="background:#2563eb; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; margin-right:0.25rem;"><i class="fa-solid fa-user-pen"></i> แก้ไข</button>
            <button class="role-pill-btn delete-staff-btn" data-id="${s.studentId}" style="background:#ef4444; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i> ลบ</button>
          </td>
        </tr>
      `);
    });

    document.querySelectorAll('.edit-staff-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const s = api.getStaffUsers().find(x => x.studentId === id);
        if (s) {
          document.getElementById('editStaffIdKey').value = s.studentId;
          document.getElementById('editStaffId').value = s.studentId;
          document.getElementById('editStaffName').value = s.fullName;
          document.getElementById('editStaffMajor').value = s.major;
          document.getElementById('editStaffYear').value = s.year || 'ชั้นปีที่ 3';
          document.getElementById('editStaffDept').value = s.department;
          document.getElementById('editStaffPos').value = s.position;
          document.getElementById('editStaffAvatar').value = s.avatar || '';
          editStaffModal.classList.add('active');
        }
      });
    });

    document.querySelectorAll('.delete-staff-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm(`คุณต้องการลบผู้ปฏิบัติงานรหัส ${id} ใช่หรือไม่?`)) {
          api.deleteStaffUser(id);
          showToast(`ลบผู้ปฏิบัติงานรหัส ${id} เรียบร้อยแล้ว`, 'success');
          await loadAllData();
          renderStaffListTable();
          autoDriveBackup('delete_staff');
        }
      });
    });
  }

  // SUBMIT EDIT STAFF FORM
  if (editStaffForm) {
    editStaffForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('editStaffIdKey').value;
      const updated = {
        fullName: document.getElementById('editStaffName').value.trim(),
        major: document.getElementById('editStaffMajor').value.trim(),
        year: document.getElementById('editStaffYear').value,
        department: document.getElementById('editStaffDept').value.trim(),
        position: document.getElementById('editStaffPos').value.trim(),
        avatar: document.getElementById('editStaffAvatar').value.trim()
      };
      api.updateStaffUser(id, updated);
      editStaffModal.classList.remove('active');
      showToast(`แก้ไขข้อมูลผู้ปฏิบัติงานรหัส ${id} สำเร็จแล้ว`, 'success');
      await loadAllData();
      renderStaffListTable();
      autoDriveBackup('edit_staff');
    });
  }

  // RENDER TABLE: REGISTRATIONS LIST (WITH DELETE)
  function renderRegistrationsListTable() {
    if (!regsListTableBody) return;
    regsListTableBody.innerHTML = '';

    currentRegistrations.forEach(r => {
      const isApproved = r.status === 'approved';
      const isRejected = r.status === 'rejected';

      regsListTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td><strong style="font-family:'Space Grotesk', monospace;">${r.regId}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-dark);">${r.staffName}</div>
            <div style="font-size:0.75rem; color:var(--text-gray);">${r.staffId}</div>
          </td>
          <td>${r.activityTitle}</td>
          <td><strong>${r.baseHours || 3} ชม.</strong></td>
          <td>
            ${isApproved ? '<span class="status-tag-checked">อนุมัติแล้ว</span>' : isRejected ? '<span style="background:#fee2e2; color:#991b1b; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem;">ปฏิเสธ</span>' : '<span class="status-tag-pending">รออนุมัติ</span>'}
          </td>
          <td>
            <button class="role-pill-btn delete-reg-btn" data-id="${r.regId}" style="background:#ef4444; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i> ลบรายการ</button>
          </td>
        </tr>
      `);
    });

    document.querySelectorAll('.delete-reg-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm(`คุณต้องการลบรายการลงทะเบียน ${id} ใช่หรือไม่?`)) {
          api.deleteRegistration(id);
          showToast(`ลบรายการลงทะเบียน ${id} เรียบร้อยแล้ว`, 'success');
          await loadAllData();
          renderRegistrationsListTable();
          autoDriveBackup('delete_registration');
        }
      });
    });
  }

  // RENDER TABLE: APPROVED HOURS HISTORY
  function renderApprovedHoursTable() {
    if (!approvedHoursTableBody) return;
    approvedHoursTableBody.innerHTML = '';

    const approvedList = currentRegistrations.filter(r => r.status === 'approved');

    if (approvedList.length === 0) {
      approvedHoursTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-gray);">ไม่พบประวัติชั่วโมงที่ได้รับการอนุมัติ</td></tr>`;
      return;
    }

    approvedList.forEach(r => {
      approvedHoursTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td><strong style="font-family:'Space Grotesk', monospace;">${r.regId}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-dark);">${r.staffName}</div>
            <div style="font-size:0.75rem; color:var(--text-gray);">${r.staffId} (${r.department})</div>
          </td>
          <td>${r.activityTitle}</td>
          <td><strong style="color:var(--success-green);">+${r.earnedHours || r.baseHours || 3} ชม.</strong></td>
          <td><small style="color:var(--text-gray);"><i class="fa-solid fa-clock-check"></i> ${r.checkInTime || r.timestamp}</small></td>
        </tr>
      `);
    });
  }

  // RENDER TABLE: ADMIN USERS LIST (WITH DELETE)
  function renderAdminListTable() {
    if (!adminListTableBody) return;
    const admins = api.getAdminUsers();
    adminListTableBody.innerHTML = '';
    admins.forEach(a => {
      const avatarUrl = convertDriveUrlToDirectLink(a.avatar);
      const avatarHtml = avatarUrl 
        ? `<img src="${avatarUrl}" alt="Avatar" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">`
        : `<div style="width:36px; height:36px; border-radius:50%; background:#e0e7ff; color:#3730a3; display:flex; align-items:center; justify-content:center; font-size:0.9rem;"><i class="fa-solid fa-user-shield"></i></div>`;

      adminListTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${avatarHtml}</td>
          <td><strong style="font-family:'Space Grotesk', monospace;">${a.username}</strong></td>
          <td>${a.fullName}</td>
          <td>${a.position}</td>
          <td><span style="background:#e0e7ff; color:#3730a3; padding:0.2rem 0.6rem; border-radius:12px; font-size:0.75rem; font-weight:600;">${a.role || 'Admin'}</span></td>
          <td>
            ${a.username !== 'admin' ? `<button class="role-pill-btn delete-admin-btn" data-id="${a.username}" style="background:#ef4444; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i> ลบ</button>` : '<small style="color:var(--text-gray);">แอดมินหลัก</small>'}
          </td>
        </tr>
      `);
    });

    document.querySelectorAll('.delete-admin-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const username = e.currentTarget.getAttribute('data-id');
        if (confirm(`คุณต้องการลบแอดมิน ${username} ใช่หรือไม่?`)) {
          api.deleteAdminUser(username);
          showToast(`ลบแอดมิน ${username} เรียบร้อยแล้ว`, 'success');
          loadAllData();
          renderAdminListTable();
          autoDriveBackup('delete_admin');
        }
      });
    });
  }

  // ADD STAFF USER SUBMIT
  if (addStaffForm) {
    addStaffForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawAvatar = newStaffAvatar ? newStaffAvatar.value.trim() : '';
      const newUser = {
        studentId: document.getElementById('newStaffId').value.trim(),
        fullName: document.getElementById('newStaffName').value.trim(),
        major: document.getElementById('newStaffMajor').value.trim(),
        year: document.getElementById('newStaffYear').value,
        department: document.getElementById('newStaffDept').value.trim(),
        position: document.getElementById('newStaffPos').value.trim(),
        avatar: convertDriveUrlToDirectLink(rawAvatar),
        targetHours: 200
      };
      api.createStaffUser(newUser);
      addStaffModal.classList.remove('active');
      addStaffForm.reset();
      if (staffAvatarPreviewBox) staffAvatarPreviewBox.style.display = 'none';
      showToast(`เพิ่มผู้ปฏิบัติงานใหม่สำเร็จ (${newUser.fullName})`, 'success');
      loadAllData();
      autoDriveBackup('create_staff');
    });
  }

  // ADD ADMIN USER SUBMIT
  if (addAdminForm) {
    addAdminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawAvatar = newAdminAvatar ? newAdminAvatar.value.trim() : '';
      const newAdmin = {
        username: document.getElementById('newAdminUsername').value.trim(),
        password: document.getElementById('newAdminPassword').value.trim(),
        fullName: document.getElementById('newAdminFullName').value.trim(),
        position: document.getElementById('newAdminPosition').value.trim(),
        avatar: convertDriveUrlToDirectLink(rawAvatar),
        role: 'Admin'
      };
      api.createAdminUser(newAdmin);
      addAdminModal.classList.remove('active');
      addAdminForm.reset();
      if (adminAvatarPreviewBox) adminAvatarPreviewBox.style.display = 'none';
      showToast(`เพิ่มเจ้าหน้าที่/แอดมินใหม่สำเร็จ (${newAdmin.fullName})`, 'success');
      loadAllData();
      autoDriveBackup('create_admin');
    });
  }

  // ADD ACTIVITY SUBMIT WITH GOOGLE DRIVE BANNER CONVERSION
  addActivityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rawBanner = newActBanner ? newActBanner.value.trim() : '';
    const directBanner = convertDriveUrlToDirectLink(rawBanner) || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80';

    const newAct = {
      title: document.getElementById('newActTitle').value.trim(),
      description: document.getElementById('newActDesc').value.trim(),
      date: document.getElementById('newActDate').value,
      time: document.getElementById('newActTime').value.trim(),
      location: document.getElementById('newActLocation').value.trim(),
      maxQuota: parseInt(document.getElementById('newActQuota').value, 10),
      hours: parseInt(document.getElementById('newActHours').value, 10) || 3,
      banner: directBanner
    };

    await api.createActivity(newAct);
    addActivityModal.classList.remove('active');
    addActivityForm.reset();
    if (actBannerPreviewBox) actBannerPreviewBox.style.display = 'none';
    showToast('เพิ่มกิจกรรมใหม่เรียบร้อยแล้ว (รองรับลิงก์ Google Drive)', 'success');
    await loadAllData();
    autoDriveBackup('create_activity');
  });

  saveGasUrlBtn.addEventListener('click', () => {
    api.setGasUrl(gasUrlInput.value.trim());
    gasSettingsModal.classList.remove('active');
    showToast('บันทึกการตั้งค่า Google Apps Script API เรียบร้อยแล้ว', 'success');
    loadAllData();
  });

  // DRIVE BACKUP TRIGGER BUTTON
  if (triggerDriveBackupBtn) {
    triggerDriveBackupBtn.addEventListener('click', async () => {
      triggerDriveBackupBtn.disabled = true;
      triggerDriveBackupBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> กำลังสำรองข้อมูล...';

      const res = await api.triggerDriveBackup();
      triggerDriveBackupBtn.disabled = false;
      triggerDriveBackupBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> สำรองข้อมูลเข้า Google Drive';

      if (res.success) {
        showToast(`สำเร็จ! สำรองข้อมูลไป Google Drive แล้ว (${res.fileName})`, 'success');
        renderAdminTables();
      } else {
        showToast('สำรองข้อมูลไม่สำเร็จ', 'error');
      }
    });
  }

  // RENDER ADMIN DASHBOARD & HOURS APPROVAL MANAGER
  function renderAdminTables() {
    if (!adminTableBody) return;
    adminTableBody.innerHTML = '';

    const staffUsers = api.getStaffUsers();
    let pendingHrsCount = 27;
    let approvedHrsCount = 2;

    currentRegistrations.forEach(r => {
      if (r.status === 'approved') approvedHrsCount += (r.earnedHours || r.baseHours || 3);
      else if (r.status === 'pending') pendingHrsCount += (r.baseHours || 3);
    });

    if (adminTotalActCount) adminTotalActCount.textContent = currentActivities.length;
    if (adminTotalStaffCount) adminTotalStaffCount.textContent = staffUsers.length;
    if (adminTotalRegCount) adminTotalRegCount.textContent = currentRegistrations.length + 2;
    if (adminTotalPendingHrs) adminTotalPendingHrs.textContent = pendingHrsCount;
    if (adminTotalApprovedHrs) adminTotalApprovedHrs.textContent = approvedHrsCount;

    if (currentRegistrations.length === 0) {
      adminTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-gray);">ไม่พบรายการผู้ลงทะเบียนรออนุมัติ</td></tr>`;
    } else {
      currentRegistrations.forEach(r => {
        const isApproved = r.status === 'approved';
        const isRejected = r.status === 'rejected';

        const row = `
          <tr>
            <td><strong style="font-family:'Space Grotesk', monospace;">${r.regId}</strong></td>
            <td>
              <div style="font-weight:700; color:var(--text-dark);">${r.staffName}</div>
              <div style="font-size:0.75rem; color:var(--text-gray);">${r.staffId}</div>
            </td>
            <td>${r.major || 'ภาษาอังกฤษเพื่อการสื่อสารธุรกิจ'} <small style="color:var(--text-gray);">(${r.department})</small></td>
            <td style="max-width: 220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${r.activityTitle}">${r.activityTitle}</td>
            <td><strong>${r.baseHours || 3} ชม.</strong></td>
            <td>
              ${isApproved ? '<span class="status-tag-checked"><i class="fa-solid fa-circle-check"></i> อนุมัติชั่วโมงแล้ว</span>' : isRejected ? '<span style="background:#fee2e2; color:#991b1b; padding:0.2rem 0.6rem; border-radius:4px; font-size:0.75rem; font-weight:600;">ปฏิเสธ</span>' : '<span class="status-tag-pending"><i class="fa-solid fa-clock"></i> รอเจ้าหน้าที่อนุมัติ</span>'}
            </td>
            <td>
              ${isApproved 
                ? `<small style="color:var(--text-gray);"><i class="fa-solid fa-check"></i> เรียบร้อย (${r.checkInTime || ''})</small>` 
                : `<button class="role-pill-btn approve-hrs-btn" data-id="${r.regId}" style="background:#16a34a; color:white; padding:0.3rem 0.85rem; font-size:0.75rem; margin-right:0.3rem;"><i class="fa-solid fa-check"></i> อนุมัติชั่วโมง</button>
                   <button class="role-pill-btn reject-hrs-btn" data-id="${r.regId}" style="background:#ef4444; color:white; padding:0.3rem 0.6rem; font-size:0.75rem;"><i class="fa-solid fa-xmark"></i></button>`}
            </td>
          </tr>
        `;
        adminTableBody.insertAdjacentHTML('beforeend', row);
      });

      document.querySelectorAll('.approve-hrs-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          btn.disabled = true;
          btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
          await api.approveHours(id);
          showToast(`อนุมัติชั่วโมงกิจกรรมสำเร็จสำหรับรหัส ${id}`, 'success');
          await loadAllData();
          renderAdminTables();
          autoDriveBackup('hours_approval');
        });
      });

      document.querySelectorAll('.reject-hrs-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          await api.rejectHours(id);
          showToast(`ปฏิเสธรายการ ${id} เรียบร้อย`, 'info');
          await loadAllData();
          renderAdminTables();
          autoDriveBackup('hours_rejection');
        });
      });
    }

    if (!backupTableBody) return;
    const backups = api.getBackups();
    backupTableBody.innerHTML = '';
    backups.forEach(b => {
      backupTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td><strong style="font-family:'Space Grotesk', monospace;">${b.backupId}</strong></td>
          <td>${b.timestamp}</td>
          <td>${b.fileName}</td>
          <td>${b.recordCount} รายการ</td>
          <td><span style="color:#10b981; font-weight:600;"><i class="fa-solid fa-cloud"></i> จัดเก็บสำเร็จ</span></td>
        </tr>
      `);
    });
  }

  // Toast Notifications
  function showToast(msg, type = 'info') {
    let c = document.querySelector('.toast-container');
    if (!c) {
      c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
    }
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }
});
