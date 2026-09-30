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

  const activityParticipantsModal = document.getElementById('activityParticipantsModal');
  const closeActPartModalBtn = document.getElementById('closeActPartModalBtn');
  const searchActPartInput = document.getElementById('searchActPartInput');
  const filterActPartStatus = document.getElementById('filterActPartStatus');
  const exportActPartCsvBtn = document.getElementById('exportActPartCsvBtn');
  const addStaffToCurrentActBtn = document.getElementById('addStaffToCurrentActBtn');
  let activeParticipantActId = null;

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

  // Auto-Sync Polling Every 10 Seconds for Instant Google Sheets Edits/Deletes/Adds
  setInterval(async () => {
    const synced = await api.syncDataFromGoogleSheets();
    if (synced) {
      currentActivities = api.getActivities();
      currentRegistrations = api.getRegistrations();
      renderStaffHeaderInfo();
      updateStaffHoursStats();
      filterAndRenderActivities();
      renderMySummaryView();
      if (currentRole === 'admin') renderAdminTables();
    }
  }, 10000);

  // Sync Data Instantly When Tab Focus Returns
  document.addEventListener('visibilitychange', async () => {
    if (!document.hidden) {
      const synced = await api.syncDataFromGoogleSheets();
      if (synced) {
        currentActivities = api.getActivities();
        currentRegistrations = api.getRegistrations();
        renderStaffHeaderInfo();
        updateStaffHoursStats();
        filterAndRenderActivities();
        renderMySummaryView();
        if (currentRole === 'admin') renderAdminTables();
      }
    }
  });

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

  // --- THEME TOGGLE BUTTON (DARK MODE) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i>' : '<i class="fa-solid fa-moon"></i>';
      showToast(isDark ? 'สลับเป็นธีมมืด (Dark Mode)' : 'สลับเป็นธีมสว่าง (Light Mode)', 'info');
    });
  }

  // --- PASSWORD VISIBILITY TOGGLE EYE BUTTON ---
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  if (togglePasswordBtn && adminPasswordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = adminPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      adminPasswordInput.setAttribute('type', type);
      togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
    });
  }

  // Active Role Management
  let currentRole = 'staff';

  if (roleStaffBtn) {
    roleStaffBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchToStaffView();
    });
  }

  if (roleAdminBtn) {
    roleAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentAdmin = api.getCurrentAdmin();
      if (currentAdmin) {
        switchToAdminView();
      } else {
        adminLoginModal.classList.add('active');
      }
    });
  }

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

  // --- STUDENT ID FORMATTER & VALIDATOR (9 digits - 1 digit, e.g. 123456789-0) ---
  function formatStudentIdInput(val) {
    if (!val) return '';
    const digits = String(val).replace(/[^0-9]/g, '').slice(0, 10);
    if (digits.length > 9) {
      return digits.slice(0, 9) + '-' + digits.slice(9, 10);
    } else if (digits.length === 9) {
      return digits + '-';
    }
    return digits;
  }

  function validateStudentIdFormat(val) {
    if (!val) return false;
    return /^\d{9}-\d{1}$/.test(String(val).trim());
  }

  const loginStudentIdInput = document.getElementById('loginStudentId');
  if (loginStudentIdInput) {
    loginStudentIdInput.addEventListener('input', (e) => {
      e.target.value = formatStudentIdInput(e.target.value);
    });
  }

  const newStaffIdInput = document.getElementById('newStaffId');
  if (newStaffIdInput) {
    newStaffIdInput.addEventListener('input', (e) => {
      e.target.value = formatStudentIdInput(e.target.value);
    });
  }

  // LOGIN HANDLERS
  if (staffLoginForm) {
    staffLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = loginStudentId.value.trim();
      if (!validateStudentIdFormat(id)) {
        showToast('รหัสนักศึกษาต้องเป็นตัวเลข 9 หลัก ตามด้วยขีด (-) และตัวเลข 1 หลัก (ตัวอย่าง: 123456789-0)', 'error');
        return;
      }
      const res = api.loginStaff(id);
      if (res.success) {
        staffLoginModal.classList.remove('active');
        showToast(`เข้าสู่ระบบผู้ปฏิบัติงาน: ${res.user.fullName}`, 'success');
        switchToStaffView();
        loadAllData();
      } else {
        showToast('ไม่พบข้อมูลรหัสนักศึกษานี้ในระบบ (กรุณาตรวจสอบรหัสนักศึกษาอีกครั้ง)', 'error');
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
        const admin = api.getCurrentAdmin();
        if (admin) {
          api.setCurrentAdmin(null);
          switchToStaffView();
          showToast('ออกจากระบบเจ้าหน้าที่ (Admin) เรียบร้อยแล้ว', 'info');
        } else {
          adminLoginModal.classList.add('active');
        }
      } else {
        const staff = api.getCurrentStaff();
        if (staff) {
          api.setCurrentStaff(null);
          loadAllData();
          showToast('ออกจากระบบผู้ปฏิบัติงานเรียบร้อยแล้ว', 'info');
        } else {
          staffLoginModal.classList.add('active');
        }
      }
    });
  }

  const openStaffLoginHeroBtn = document.getElementById('openStaffLoginHeroBtn');
  if (openStaffLoginHeroBtn) {
    openStaffLoginHeroBtn.addEventListener('click', () => {
      staffLoginModal.classList.add('active');
    });
  }

  // RENDER HEADERS & AVATARS
  function updateStaffActivityMeter() {
    const staff = api.getCurrentStaff();
    const targetHoursText = document.getElementById('targetHoursText');
    const meterSubtitleText = document.getElementById('meterSubtitleText');
    const meterPercentText = document.getElementById('meterPercentText');
    const meterFillBar = document.getElementById('meterFillBar');
    const meterEarnedText = document.getElementById('meterEarnedText');
    const meterRemainingText = document.getElementById('meterRemainingText');
    const summaryEarnedHours = document.getElementById('summaryEarnedHours');
    const summaryPendingHours = document.getElementById('summaryPendingHours');
    const summaryRegisteredCount = document.getElementById('summaryRegisteredCount');

    if (!staff) {
      // LOGGED OUT / GUEST STATE: Do NOT display numbers or target hours
      if (targetHoursText) targetHoursText.textContent = '-';
      if (meterSubtitleText) meterSubtitleText.textContent = 'เป้าหมายชั่วโมงกิจกรรม: - ชั่วโมงกิจกรรม';
      if (meterPercentText) meterPercentText.textContent = '-';
      if (meterFillBar) meterFillBar.style.width = '0%';
      if (meterEarnedText) meterEarnedText.textContent = 'สะสมแล้ว - / - ชั่วโมง';
      if (meterRemainingText) meterRemainingText.textContent = 'กรุณาเข้าสู่ระบบเพื่อดูข้อมูล';

      if (summaryEarnedHours) summaryEarnedHours.textContent = '-';
      if (summaryPendingHours) summaryPendingHours.textContent = '-';
      if (summaryRegisteredCount) summaryRegisteredCount.textContent = '-';
      return;
    }

    // LOGGED IN STATE: Calculate numbers dynamically for the logged-in staff
    const staffId = staff.studentId;
    const target = Number(staff.targetHours) || 200;

    // Filter registrations for logged in staff
    const userRegs = currentRegistrations.filter(r => String(r.staffId) === String(staffId));

    // Earned (approved) hours
    const earned = userRegs
      .filter(r => r.status === 'approved')
      .reduce((sum, r) => sum + (Number(r.earnedHours || r.hours) || 0), 0);

    // Pending hours
    const pending = userRegs
      .filter(r => r.status === 'pending')
      .reduce((sum, r) => sum + (Number(r.hours) || 0), 0);

    const remaining = Math.max(0, target - earned);
    const percent = Math.min(100, Math.round((earned / target) * 100));

    if (targetHoursText) targetHoursText.textContent = target;
    if (meterSubtitleText) meterSubtitleText.textContent = `เป้าหมายชั่วโมงกิจกรรม: ${target} ชั่วโมงกิจกรรม`;
    if (meterPercentText) meterPercentText.textContent = `${percent}%`;
    if (meterFillBar) meterFillBar.style.width = `${percent}%`;
    if (meterEarnedText) meterEarnedText.textContent = `สะสมแล้ว ${earned} / ${target} ชั่วโมง`;
    if (meterRemainingText) meterRemainingText.textContent = `ขาดอีก ${remaining} ชั่วโมง`;

    if (summaryEarnedHours) summaryEarnedHours.textContent = earned;
    if (summaryPendingHours) summaryPendingHours.textContent = pending;
    if (summaryRegisteredCount) summaryRegisteredCount.textContent = userRegs.length;
  }

  function renderStaffHeaderInfo() {
    const staff = api.getCurrentStaff();
    const staffLoggedOutHero = document.getElementById('staffLoggedOutHero');
    const staffLoggedInHero = document.getElementById('staffLoggedInHero');

    updateStaffActivityMeter();

    if (!staff) {
      // LOGGED OUT STATE
      if (staffLoggedOutHero) staffLoggedOutHero.style.display = 'flex';
      if (staffLoggedInHero) staffLoggedInHero.style.display = 'none';

      if (navUserName) navUserName.textContent = 'กรุณาเข้าสู่ระบบ';
      if (navUserCode) navUserCode.textContent = '';
      if (navUserAvatar) navUserAvatar.innerHTML = '<i class="fa-solid fa-user-slash"></i>';
      if (logoutBtn) logoutBtn.textContent = 'เข้าสู่ระบบ';
      if (historyUserSubtitle) historyUserSubtitle.textContent = '';
      return;
    }

    // LOGGED IN STATE
    if (staffLoggedOutHero) staffLoggedOutHero.style.display = 'none';
    if (staffLoggedInHero) staffLoggedInHero.style.display = 'flex';
    if (logoutBtn) logoutBtn.textContent = 'ออกจากระบบ';

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

    if (historyUserSubtitle) {
      historyUserSubtitle.textContent = `ผู้ปฏิบัติงาน: ${cleanName} (${staff.studentId}) - ${staff.major}`;
    }
  }

  function renderAdminHeaderInfo() {
    const admin = api.getCurrentAdmin();
    if (!admin) return;

    if (logoutBtn) logoutBtn.textContent = 'ออกจากระบบ';

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

    const adminRoleBadge = document.getElementById('adminRoleBadge');
    if (adminFullName) adminFullName.textContent = admin.fullName;
    if (adminRoleBadge) adminRoleBadge.textContent = admin.role || 'Admin';
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

  // MOBILE HAMBURGER MENU (☰) TOGGLE & DRAWER SYNC
  const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
  const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const drawerRoleStaffBtn = document.getElementById('drawerRoleStaffBtn');
  const drawerRoleAdminBtn = document.getElementById('drawerRoleAdminBtn');
  const drawerUserName = document.getElementById('drawerUserName');
  const drawerUserSub = document.getElementById('drawerUserSub');
  const drawerLogoutBtn = document.getElementById('drawerLogoutBtn');
  const drawerGasBtn = document.getElementById('drawerGasBtn');

  function openMobileDrawer() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      // Sync user profile status into drawer
      const staff = api.getCurrentStaff();
      const admin = api.getCurrentAdmin();
      if (currentRole === 'staff' && staff) {
        if (drawerUserName) drawerUserName.textContent = staff.fullName;
        if (drawerUserSub) drawerUserSub.textContent = `รหัส: ${staff.studentId}`;
        if (drawerLogoutBtn) {
          drawerLogoutBtn.textContent = 'ออกจากระบบ';
          drawerLogoutBtn.style.background = '#ef4444';
        }
      } else if (currentRole === 'admin' && admin) {
        if (drawerUserName) drawerUserName.textContent = admin.fullName;
        if (drawerUserSub) drawerUserSub.textContent = `ตำแหน่ง: ${admin.position || 'แอดมิน'}`;
        if (drawerLogoutBtn) {
          drawerLogoutBtn.textContent = 'ออกจากระบบ';
          drawerLogoutBtn.style.background = '#ef4444';
        }
      } else {
        if (drawerUserName) drawerUserName.textContent = 'กรุณาเข้าสู่ระบบ';
        if (drawerUserSub) drawerUserSub.textContent = 'สำหรับผู้ปฏิบัติงาน/แอดมิน';
        if (drawerLogoutBtn) {
          drawerLogoutBtn.textContent = 'เข้าสู่ระบบ';
          drawerLogoutBtn.style.background = '#2563eb';
        }
      }

      // Sync role switcher buttons active state
      if (drawerRoleStaffBtn && drawerRoleAdminBtn) {
        if (currentRole === 'staff') {
          drawerRoleStaffBtn.classList.add('active');
          drawerRoleAdminBtn.classList.remove('active');
        } else {
          drawerRoleAdminBtn.classList.add('active');
          drawerRoleStaffBtn.classList.remove('active');
        }
      }

      mobileNavDrawer.classList.add('active');
      mobileNavBackdrop.classList.add('active');
    }
  }

  function closeMobileDrawer() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      mobileNavDrawer.classList.remove('active');
      mobileNavBackdrop.classList.remove('active');
    }
  }

  if (mobileMenuToggleBtn) mobileMenuToggleBtn.addEventListener('click', openMobileDrawer);
  if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener('click', closeMobileDrawer);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileDrawer);

  if (drawerRoleStaffBtn) {
    drawerRoleStaffBtn.addEventListener('click', () => {
      if (roleStaffBtn) roleStaffBtn.click();
      closeMobileDrawer();
    });
  }

  if (drawerRoleAdminBtn) {
    drawerRoleAdminBtn.addEventListener('click', () => {
      if (roleAdminBtn) roleAdminBtn.click();
      closeMobileDrawer();
    });
  }

  if (drawerLogoutBtn) {
    drawerLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileDrawer();
      if (logoutBtn) logoutBtn.click();
    });
  }

  if (drawerGasBtn) {
    drawerGasBtn.addEventListener('click', () => {
      closeMobileDrawer();
      if (gasSettingsModal) gasSettingsModal.classList.add('active');
    });
  }

  // DATA INITIALIZATION & LIVE DATA SYNC
  renderStaffHeaderInfo();
  await loadAllData(true);

  if (!api.getGasUrl()) {
    setTimeout(() => {
      if (gasSettingsModal) {
        gasUrlInput.value = '';
        gasSettingsModal.classList.add('active');
      }
      showToast('⚠️ กรุณาเชื่อมต่อ Web App URL จาก Google Apps Script เพื่อดึงข้อมูลจริงจาก Google Sheets', 'warning');
    }, 600);
  }

  // Silent background auto-sync timer every 30 seconds for multi-user / multi-device live sync
  setInterval(async () => {
    await loadAllData(false);
  }, 30000);

  async function loadAllData(showLoadingModal = false) {
    const dataLoadingModal = document.getElementById('dataLoadingModal');

    // 1. Instant 0ms UI Render using local cached data
    currentActivities = api.getActivities();
    currentRegistrations = api.getRegistrations();

    renderStaffHeaderInfo();
    updateStaffHoursStats();
    filterAndRenderActivities();
    renderMySummaryView();
    if (currentRole === 'admin') renderAdminTables();
    checkAndOpenDeepLinkActivity();

    // Keep loading modal active while fetching live data from Google Sheets
    if (showLoadingModal && dataLoadingModal) {
      dataLoadingModal.classList.add('active');
    }

    // 2. Fast Parallel Background Live Refresh
    try {
      const synced = await api.syncDataFromGoogleSheets();
      if (synced) {
        currentActivities = api.getActivities();
        currentRegistrations = api.getRegistrations();
        renderStaffHeaderInfo();
        updateStaffHoursStats();
        filterAndRenderActivities();
        renderMySummaryView();
        if (currentRole === 'admin') renderAdminTables();
        checkAndOpenDeepLinkActivity();

        if (showLoadingModal) {
          showToast('⚡ โหลดและอัปเดตข้อมูลสดจากระบบเรียบร้อยแล้ว', 'success');
        }
      }
    } catch (e) {
      console.error('Load error:', e);
    } finally {
      if (showLoadingModal && dataLoadingModal) {
        dataLoadingModal.classList.remove('active');
      }
      setTimeout(() => {
        checkAndOpenDeepLinkActivity();
      }, 150);
    }
  }

  function updateStaffHoursStats() {
    const staff = api.getCurrentStaff();
    if (!staff) {
      if (myRegCountBadge) myRegCountBadge.textContent = '0';
      if (accumulatedHours) accumulatedHours.textContent = '0';
      if (pendingHours) pendingHours.textContent = '0';
      return;
    }

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

    if (accumulatedHours) accumulatedHours.textContent = earned;
    if (pendingHours) pendingHours.textContent = pending;
  }

  function renderMySummaryView() {
    const staff = api.getCurrentStaff();
    if (!staff) {
      if (summaryEarnedHours) summaryEarnedHours.textContent = '0';
      if (summaryPendingHours) summaryPendingHours.textContent = '0';
      if (summaryRegisteredCount) summaryRegisteredCount.textContent = '0';
      if (meterPercentText) meterPercentText.textContent = '0%';
      if (meterFillBar) meterFillBar.style.width = '0%';
      if (meterEarnedText) meterEarnedText.textContent = 'สะสมแล้ว - / - ชั่วโมง';
      if (meterRemainingText) meterRemainingText.textContent = 'กรุณาเข้าสู่ระบบ';
      if (historyTableBody) {
        historyTableBody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-gray);">
              <i class="fa-solid fa-lock" style="font-size: 2rem; margin-bottom: 0.5rem; color: #cbd5e1; display: block;"></i>
              <strong>กรุณาเข้าสู่ระบบผู้ปฏิบัติงานเพื่อดูสรุปชั่วโมงกิจกรรมและประวัติสะสมชั่วโมงส่วนบุคคล</strong>
              <div style="margin-top: 1rem;">
                <button class="btn-register" onclick="document.getElementById('staffLoginModal').classList.add('active')" style="display: inline-flex; width: auto; padding: 0.5rem 1.25rem;">
                  <i class="fa-solid fa-right-to-bracket"></i> เข้าสู่ระบบด้วยรหัสนักศึกษา
                </button>
              </div>
            </td>
          </tr>
        `;
      }
      return;
    }

    const myRegs = currentRegistrations.filter(r => r.staffId === staff.studentId);

    let earned = 0;
    let pending = 0;
    myRegs.forEach(r => {
      if (r.status === 'approved') earned += (r.earnedHours || r.baseHours || 3);
      else if (r.status === 'pending') pending += (r.baseHours || 3);
    });

    const regCount = myRegs.length;
    const target = Number(staff.targetHours) || 200;
    const percent = Math.min(100, Math.round((earned / target) * 100));
    const remaining = Math.max(0, target - earned);

    const targetHoursText = document.getElementById('targetHoursText');
    const meterSubtitleText = document.getElementById('meterSubtitleText');

    if (targetHoursText) targetHoursText.textContent = target;
    if (meterSubtitleText) meterSubtitleText.textContent = `เป้าหมายชั่วโมงกิจกรรม: ${target} ชั่วโมงกิจกรรม`;

    if (summaryEarnedHours) summaryEarnedHours.textContent = earned;
    if (summaryPendingHours) summaryPendingHours.textContent = pending;
    if (summaryRegisteredCount) summaryRegisteredCount.textContent = regCount;

    if (meterPercentText) meterPercentText.textContent = `${percent}%`;
    if (meterFillBar) meterFillBar.style.width = `${Math.max(1, percent)}%`;
    if (meterEarnedText) meterEarnedText.textContent = `สะสมแล้ว ${earned} / ${target} ชั่วโมง`;
    if (meterRemainingText) meterRemainingText.textContent = `ขาดอีก ${remaining} ชั่วโมง`;

    if (!historyTableBody) return;
    historyTableBody.innerHTML = '';

    if (myRegs.length === 0) {
      historyTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-gray);">
            <i class="fa-regular fa-folder-open" style="font-size: 1.8rem; color: #cbd5e1; margin-bottom: 0.5rem; display: block;"></i>
            ยังไม่มีประวัติการลงทะเบียนกิจกรรม
          </td>
        </tr>
      `;
      return;
    }

    myRegs.forEach((r, idx) => {
      const isApproved = r.status === 'approved';
      const tr = `
        <tr>
          <td><strong>${idx + 1}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-dark);">${r.activityTitle}</div>
            <div style="font-size:0.75rem; color:var(--text-gray); font-family:'Space Grotesk', monospace;">${r.department || 'สโมสรนักศึกษา'} | ${r.regId}</div>
          </td>
          <td>${r.timestamp}</td>
          <td>${r.baseHours || 3} ชม.</td>
          <td><strong style="color:${isApproved ? 'var(--success-green)' : 'var(--text-dark)'}">${isApproved ? (r.earnedHours || r.baseHours || 3) + ' ชม.' : '0 ชม.'}</strong></td>
          <td><span class="${isApproved ? 'status-tag-checked' : 'status-tag-pending'}">${isApproved ? 'อนุมัติแล้ว' : 'รออนุมัติชั่วโมง'}</span></td>
          <td>
            <button class="role-pill-btn cancel-hist-reg-btn" data-reg-id="${r.regId}" data-act-id="${r.activityId}" style="background:#ef4444; color:white; padding:0.25rem 0.6rem; font-size:0.75rem;"><i class="fa-solid fa-user-xmark"></i> ยกเลิก</button>
          </td>
        </tr>
      `;
      historyTableBody.insertAdjacentHTML('beforeend', tr);
    });

    // Attach History Table Cancel Registration Listener
    document.querySelectorAll('.cancel-hist-reg-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const regId = e.currentTarget.getAttribute('data-reg-id');
        const actId = e.currentTarget.getAttribute('data-act-id');
        const act = currentActivities.find(a => a.id === actId);

        if (confirm(`คุณต้องการยกเลิกการลงทะเบียนกิจกรรมนี้ใช่หรือไม่?\n(รายชื่อและข้อมูลจะถูกลบออกจากฐานข้อมูล Google Sheets อัตโนมัติ)`)) {
          btn.disabled = true;
          btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังยกเลิก...';

          api.deleteRegistration(regId);

          if (act) {
            act.registeredCount = Math.max(0, (act.registeredCount || 1) - 1);
            if (act.status === 'full' && act.registeredCount < act.maxQuota) {
              act.status = 'open';
            }
            api.updateActivity(act.id, act);
          }

          showToast('ยกเลิกการลงทะเบียนเรียบร้อยแล้ว รายชื่อถูกลบออกจากฐานข้อมูลแล้ว', 'success');
          await loadAllData();
          autoDriveBackup('cancel_registration');
        }
      });
    });
  }

  // SEARCH & FILTER ACTIVITIES
  if (searchInput) searchInput.addEventListener('input', filterAndRenderActivities);
  if (statusFilter) statusFilter.addEventListener('change', filterAndRenderActivities);

  function filterAndRenderActivities() {
    if (!activitiesGrid) return;
    activitiesGrid.innerHTML = '';

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const stat = statusFilter ? statusFilter.value : '';

    let list = [...currentActivities];

    // SORT BY NEAREST DATE FIRST (Ascending order of activity date YYYY-MM-DD)
    list.sort((a, b) => {
      const timeA = a.date ? new Date(a.date.trim()).getTime() : 9999999999999;
      const timeB = b.date ? new Date(b.date.trim()).getTime() : 9999999999999;
      return timeA - timeB;
    });

    if (query) {
      list = list.filter(a => a.title.toLowerCase().includes(query) || a.location.toLowerCase().includes(query) || a.id.toLowerCase().includes(query));
    }
    if (stat) {
      list = list.filter(a => a.status === stat);
    }

    if (list.length === 0) {
      if (currentActivities.length === 0) {
        activitiesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-gray); padding: 3.5rem 1rem; background: #fff; border-radius: 12px; border: 1px solid var(--border-light);"><i class="fa-solid fa-arrows-rotate fa-spin" style="font-size: 2.2rem; margin-bottom: 0.85rem; color: #2563eb;"></i><p style="font-size: 1rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.35rem;">กำลังเชื่อมต่อและดึงข้อมูลสดจากระบบ...</p><small style="color: var(--text-gray);">กรุณารอสักครู่ ระบบกำลังโหลดรายการกิจกรรมและข้อมูลล่าสุดจาก Google Sheets</small></div>`;
      } else {
        activitiesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-gray); padding: 3rem; background: #fff; border-radius: 12px; border: 1px solid var(--border-light);"><i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: #cbd5e1;"></i><p>ไม่พบรายการกิจกรรมตามเงื่อนไขที่ค้นหา</p></div>`;
      }
      return;
    }

    const staff = api.getCurrentStaff();

    // Group activities: Open vs Closed
    const openActivities = list.filter(a => a.status !== 'closed');
    const closedActivities = list.filter(a => a.status === 'closed');

    const renderCardHtml = (act) => {
      const realRegCount = currentRegistrations.filter(r => r.activityId === act.id).length;
      act.registeredCount = realRegCount;
      const isFull = act.registeredCount >= act.maxQuota || act.status === 'full';
      const isClosed = act.status === 'closed';
      const isRegistered = staff ? currentRegistrations.some(r => r.staffId === staff.studentId && r.activityId === act.id) : false;

      let badgeClass = 'badge-open';
      let badgeText = 'เปิดรับลงทะเบียน';
      if (isClosed) { badgeClass = 'badge-closed'; badgeText = '🔴 ปิดรับสมัครแล้ว'; }
      else if (isFull) { badgeClass = 'badge-full'; badgeText = 'เต็มจำนวน'; }

      const directBannerUrl = convertDriveUrlToDirectLink(act.banner) || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80';

      return `
        <div class="activity-card" style="${isClosed ? 'opacity: 0.88; border: 1px dashed #cbd5e1;' : ''}">
          <div class="card-banner act-click-trigger" data-act-id="${act.id}" style="background-image: url('${directBannerUrl}'); cursor: pointer;" title="คลิกเพื่อดูรายละเอียดและป้ายภาพกิจกรรมแบบเต็ม">
            <div class="card-banner-overlay"></div>
            <div class="card-badge ${badgeClass}">${badgeText}</div>
            <div class="hours-credit-badge"><i class="fa-solid fa-clock"></i> +${act.hours || 3} ชม.สะสม</div>
          </div>
          <div class="card-body">
            <h3 class="card-title act-click-trigger" data-act-id="${act.id}" style="cursor: pointer;" title="คลิกเพื่อดูรายละเอียดและรูปภาพแบบเต็ม">${act.title}</h3>
            <p style="font-size: 0.85rem; color: var(--text-gray); line-height: 1.4;">${act.description}</p>
            <div class="card-info">
              <div class="info-item"><i class="fa-regular fa-calendar-check"></i> วันที่: ${act.date}</div>
              <div class="info-item"><i class="fa-regular fa-clock"></i> เวลา: ${act.time}</div>
              <div class="info-item"><i class="fa-solid fa-location-dot"></i> สถานที่: ${act.location}</div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-gray); display: flex; justify-content: space-between; margin-top: 0.25rem; align-items: center;">
              <span>ยอดลงทะเบียน:</span>
              <span style="color: var(--primary-blue); font-weight: 700;">
                ${act.registeredCount} / ${act.maxQuota} คน <i class="fa-solid fa-users" style="font-size:0.75rem;"></i>
              </span>
            </div>
          </div>
          <div class="card-footer">
            ${isRegistered ? `
              <button class="btn-register cancel-reg-btn" data-act-id="${act.id}" style="background: #ef4444; color: white;">
                <i class="fa-solid fa-user-xmark"></i> ยกเลิกการลงทะเบียน
              </button>
            ` : `
              <button class="btn-register open-reg-modal-btn" 
                data-id="${act.id}" 
                data-title="${act.title}"
                data-hours="${act.hours || 3}"
                ${isFull || isClosed ? 'disabled style="background: #64748b; cursor: not-allowed; opacity: 0.8;"' : ''}>
                ${isClosed ? '<i class="fa-solid fa-lock"></i> ปิดรับสมัครแล้ว' : isFull ? 'โควตาเต็มแล้ว' : '<i class="fa-solid fa-pen-to-square"></i> ลงทะเบียนเข้าร่วม'}
              </button>
            `}
          </div>
        </div>
      `;
    };

    // 1. Render Open Activities Section
    if (openActivities.length > 0) {
      if (closedActivities.length > 0 || !stat) {
        activitiesGrid.insertAdjacentHTML('beforeend', `
          <div class="activity-section-header" style="grid-column: 1/-1; margin: 0.25rem 0 0.75rem 0; padding-bottom: 0.6rem; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: #dbeafe; color: #2563eb; font-size: 0.95rem;">
                <i class="fa-solid fa-folder-open"></i>
              </span>
              <h3 style="font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0;">กิจกรรมที่กำลังเปิดรับสมัคร</h3>
            </div>
            <span style="background: #eff6ff; color: #2563eb; font-size: 0.8rem; font-weight: 600; padding: 0.2rem 0.65rem; border-radius: 20px; border: 1px solid #bfdbfe;">
              ${openActivities.length} รายการ
            </span>
          </div>
        `);
      }
      openActivities.forEach(act => {
        activitiesGrid.insertAdjacentHTML('beforeend', renderCardHtml(act));
      });
    }

    // 2. Render Closed Activities Section (At the bottom)
    if (closedActivities.length > 0) {
      activitiesGrid.insertAdjacentHTML('beforeend', `
        <div class="activity-section-header" style="grid-column: 1/-1; margin: 2rem 0 0.75rem 0; padding-top: 1rem; border-top: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: #fee2e2; color: #dc2626; font-size: 0.95rem;">
              <i class="fa-solid fa-lock"></i>
            </span>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: #475569; margin: 0;">กิจกรรมที่ปิดรับสมัครแล้ว</h3>
          </div>
          <span style="background: #fef2f2; color: #dc2626; font-size: 0.8rem; font-weight: 600; padding: 0.2rem 0.65rem; border-radius: 20px; border: 1px solid #fecaca;">
            ${closedActivities.length} รายการ
          </span>
        </div>
      `);
      closedActivities.forEach(act => {
        activitiesGrid.insertAdjacentHTML('beforeend', renderCardHtml(act));
      });
    }



    // Attach Click Event to Card Image Banner & Title for Full Detail Modal
    document.querySelectorAll('.act-click-trigger').forEach(el => {
      el.addEventListener('click', (e) => {
        const actId = e.currentTarget.getAttribute('data-act-id');
        openActivityDetailModal(actId);
      });
    });

    // Attach Cancel Registration Event on Card
    document.querySelectorAll('.cancel-reg-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const staff = api.getCurrentStaff();
        if (!staff) return;
        const actId = e.currentTarget.getAttribute('data-act-id');
        const act = currentActivities.find(a => a.id === actId);
        const reg = currentRegistrations.find(r => r.staffId === staff.studentId && r.activityId === actId);

        if (!reg) return;

        if (confirm(`คุณต้องการยกเลิกการลงทะเบียนกิจกรรม "${act ? act.title : ''}" ใช่หรือไม่?\n(รายชื่อและข้อมูลจะถูกลบออกจากฐานข้อมูล Google Sheets อัตโนมัติ)`)) {
          btn.disabled = true;
          btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังยกเลิก...';

          api.deleteRegistration(reg.regId);

          if (act) {
            act.registeredCount = Math.max(0, (act.registeredCount || 1) - 1);
            if (act.status === 'full' && act.registeredCount < act.maxQuota) {
              act.status = 'open';
            }
            api.updateActivity(act.id, act);
          }

          showToast('ยกเลิกการลงทะเบียนกิจกรรมสำเร็จแล้ว รายชื่อถูกลบออกจากฐานข้อมูลเรียบร้อย', 'success');
          await loadAllData();
          autoDriveBackup('cancel_registration');
        }
      });
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

        const phoneInputEl = document.getElementById('phoneInput');
        if (phoneInputEl) {
          phoneInputEl.value = staff.phone || '';
        }

        registrationModal.classList.add('active');
      });
    });
  }

  // --- ACTIVITY DETAIL & POSTER IMAGE PREVIEW MODAL ---
  const activityDetailModal = document.getElementById('activityDetailModal');
  const closeDetailActModalBtn = document.getElementById('closeDetailActModalBtn');
  const shareDetailActTopBtn = document.getElementById('shareDetailActTopBtn');
  let currentDetailAct = null;

  function getDeepLinkActivityId() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      let actId = searchParams.get('activityId') || searchParams.get('actId') || searchParams.get('id') || searchParams.get('act') || searchParams.get('activity');
      if (actId) return actId.trim();

      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (hash) {
        if (hash.includes('=')) {
          const hashParams = new URLSearchParams(hash);
          actId = hashParams.get('activityId') || hashParams.get('actId') || hashParams.get('id') || hashParams.get('act') || hashParams.get('activity');
          if (actId) return actId.trim();
        } else if (hash.length > 2) {
          return hash.trim();
        }
      }
    } catch (e) { console.error(e); }
    return null;
  }

  function setActivityUrlParam(actId) {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('activityId', actId);
      window.history.replaceState({ activityId: actId }, '', url.toString());
    } catch (e) { console.error(e); }
  }

  function clearActivityUrlParam() {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      window.history.replaceState({}, '', url.toString());
    } catch (e) { console.error(e); }
  }

  function checkAndOpenDeepLinkActivity() {
    const actId = getDeepLinkActivityId();
    if (!actId) return;

    if (!Array.isArray(currentActivities) || currentActivities.length === 0) return;

    const targetClean = String(actId).trim().toLowerCase();
    const act = currentActivities.find(a => {
      if (!a || !a.id) return false;
      const cleanAId = String(a.id).trim().toLowerCase();
      return cleanAId === targetClean || cleanAId.endsWith(targetClean) || targetClean.endsWith(cleanAId);
    });

    if (act) {
      openActivityDetailModal(act.id, false);
    }
  }

  function shareActivityLink(act) {
    if (!act || !act.id) return;
    const shareUrl = new URL(window.location.origin + window.location.pathname);
    shareUrl.searchParams.set('activityId', act.id);
    const finalUrl = shareUrl.toString();

    const shareData = {
      title: act.title || 'รายละเอียดกิจกรรม',
      text: `📌 กิจกรรม: ${act.title}\n📅 วันที่: ${act.date || '-'} (${act.time || '-'})\n📍 สถานที่: ${act.location || '-'}`,
      url: finalUrl
    };

    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        if (err.name !== 'AbortError') {
          copyToClipboard(finalUrl);
        }
      });
    } else {
      copyToClipboard(finalUrl);
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 คัดลอกลิงก์กิจกรรมเรียบร้อยแล้ว!', 'success');
      }).catch(() => {
        fallbackCopyTextToClipboard(text);
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('📋 คัดลอกลิงก์กิจกรรมเรียบร้อยแล้ว!', 'success');
    } catch (err) {
      showToast('❌ ไม่สามารถคัดลอกลิงก์ได้', 'error');
    }
    document.body.removeChild(textArea);
  }

  if (closeDetailActModalBtn && activityDetailModal) {
    closeDetailActModalBtn.addEventListener('click', () => {
      activityDetailModal.classList.remove('active');
      clearActivityUrlParam();
    });
  }

  if (activityDetailModal) {
    activityDetailModal.addEventListener('click', (e) => {
      if (e.target === activityDetailModal) {
        activityDetailModal.classList.remove('active');
        clearActivityUrlParam();
      }
    });
  }

  if (shareDetailActTopBtn) {
    shareDetailActTopBtn.addEventListener('click', () => {
      if (currentDetailAct) {
        shareActivityLink(currentDetailAct);
      }
    });
  }

  window.addEventListener('popstate', () => {
    const actId = getDeepLinkActivityId();
    if (actId) {
      openActivityDetailModal(actId, false);
    } else {
      if (activityDetailModal) {
        activityDetailModal.classList.remove('active');
      }
    }
  });

  function openActivityDetailModal(actId, updateUrl = true) {
    const targetClean = String(actId).trim().toLowerCase();
    const act = currentActivities.find(a => {
      if (!a || !a.id) return false;
      const cleanAId = String(a.id).trim().toLowerCase();
      return cleanAId === targetClean || cleanAId.endsWith(targetClean) || targetClean.endsWith(cleanAId);
    });

    if (!act || !activityDetailModal) return;

    currentDetailAct = act;
    if (updateUrl) {
      setActivityUrlParam(act.id);
    }

    const directBannerUrl = convertDriveUrlToDirectLink(act.banner) || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80';
    const isFull = act.registeredCount >= act.maxQuota || act.status === 'full';
    const isClosed = act.status === 'closed';
    const staff = api.getCurrentStaff();
    const isRegistered = staff ? currentRegistrations.some(r => r.staffId === staff.studentId && r.activityId === act.id) : false;

    const bannerEl = document.getElementById('detailActBanner');
    if (bannerEl) bannerEl.src = directBannerUrl;

    const titleEl = document.getElementById('detailActTitle');
    if (titleEl) titleEl.textContent = act.title;

    const descEl = document.getElementById('detailActDesc');
    if (descEl) descEl.textContent = act.description || 'ไม่มีรายละเอียดเพิ่มเติม';

    const dateEl = document.getElementById('detailActDate');
    if (dateEl) dateEl.textContent = act.date;

    const timeEl = document.getElementById('detailActTime');
    if (timeEl) timeEl.textContent = act.time;

    const locEl = document.getElementById('detailActLocation');
    if (locEl) locEl.textContent = act.location;

    const quotaEl = document.getElementById('detailActQuotaText');
    if (quotaEl) {
      if (currentRole === 'admin') {
        quotaEl.innerHTML = `
          ${act.registeredCount} / ${act.maxQuota} คน 
          <button class="role-pill-btn view-act-participants-btn" data-id="${act.id}" style="background:#8b5cf6; color:white; padding:0.15rem 0.55rem; font-size:0.72rem; cursor:pointer; margin-left:0.5rem;" title="ดูรายชื่อผู้ลงทะเบียน"><i class="fa-solid fa-users"></i> ดูรายชื่อ</button>
        `;
        const viewBtn = quotaEl.querySelector('.view-act-participants-btn');
        if (viewBtn) {
          viewBtn.addEventListener('click', () => {
            openActivityParticipantsModal(act.id);
          });
        }
      } else {
        quotaEl.textContent = `${act.registeredCount} / ${act.maxQuota} คน`;
      }
    }

    const hoursBadge = document.getElementById('detailActHoursBadge');
    if (hoursBadge) hoursBadge.innerHTML = `<i class="fa-solid fa-clock"></i> +${act.hours || 3} ชม.สะสม`;

    const statusBadge = document.getElementById('detailActStatusBadge');
    if (statusBadge) {
      if (isClosed) { statusBadge.className = 'card-badge badge-closed'; statusBadge.textContent = '🔴 ปิดรับสมัครแล้ว'; }
      else if (isFull) { statusBadge.className = 'card-badge badge-full'; statusBadge.textContent = 'เต็มจำนวน'; }
      else { statusBadge.className = 'card-badge badge-open'; statusBadge.textContent = 'เปิดรับลงทะเบียน'; }
    }

    const footerBox = document.getElementById('detailActFooterBox');
    if (footerBox) {
      footerBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <button class="detail-act-share-btn" data-act-id="${act.id}" style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 0.6rem 1.1rem; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.88rem; transition: background 0.2s;">
            <i class="fa-solid fa-share-nodes" style="color: #2563eb;"></i> แชร์ลิงก์กิจกรรม
          </button>
          ${isRegistered ? `
            <button class="btn-register cancel-reg-btn-modal" data-act-id="${act.id}" style="background: #ef4444; color: white; padding: 0.6rem 1.5rem; width: auto; display: inline-flex;">
              <i class="fa-solid fa-user-xmark"></i> ยกเลิกการลงทะเบียน
            </button>
          ` : `
            <button class="btn-register open-reg-from-detail-btn" data-id="${act.id}" data-title="${act.title}" data-hours="${act.hours || 3}" ${isFull || isClosed ? 'disabled style="background: #64748b; cursor: not-allowed; opacity: 0.8;"' : ''} style="padding: 0.6rem 1.5rem; width: auto; display: inline-flex;">
              ${isClosed ? '<i class="fa-solid fa-lock"></i> ปิดรับสมัครแล้ว' : isFull ? 'โควตาเต็มแล้ว' : '<i class="fa-solid fa-pen-to-square"></i> ลงทะเบียนเข้าร่วมกิจกรรมนี้'}
            </button>
          `}
        </div>
      `;

      // Wire Share Button
      const shareBtn = footerBox.querySelector('.detail-act-share-btn');
      if (shareBtn) {
        shareBtn.addEventListener('click', () => {
          shareActivityLink(act);
        });
      }

      // Wire Modal Footer Registration Trigger
      const openRegBtn = footerBox.querySelector('.open-reg-from-detail-btn');
      if (openRegBtn) {
        openRegBtn.addEventListener('click', () => {
          activityDetailModal.classList.remove('active');
          if (!staff) {
            staffLoginModal.classList.add('active');
            return;
          }
          modalActId.value = act.id;
          modalActTitle.value = act.title;
          modalActTitle.setAttribute('data-hours', act.hours || 3);
          staffIdInput.value = staff.studentId;
          staffNameInput.value = staff.fullName;
          deptInput.value = `${staff.major} (${staff.department})`;
          const phoneInputEl = document.getElementById('phoneInput');
          if (phoneInputEl) phoneInputEl.value = staff.phone || '';
          registrationModal.classList.add('active');
        });
      }

      // Wire Modal Footer Cancellation Trigger
      const cancelRegBtnModal = footerBox.querySelector('.cancel-reg-btn-modal');
      if (cancelRegBtnModal) {
        cancelRegBtnModal.addEventListener('click', async () => {
          const reg = currentRegistrations.find(r => r.staffId === staff.studentId && r.activityId === act.id);
          if (!reg) return;
          if (confirm(`คุณต้องการยกเลิกการลงทะเบียนกิจกรรม "${act.title}" ใช่หรือไม่?`)) {
            activityDetailModal.classList.remove('active');
            clearActivityUrlParam();
            api.deleteRegistration(reg.regId);
            act.registeredCount = Math.max(0, (act.registeredCount || 1) - 1);
            if (act.status === 'full' && act.registeredCount < act.maxQuota) act.status = 'open';
            api.updateActivity(act.id, act);
            showToast('ยกเลิกการลงทะเบียนเรียบร้อยแล้ว', 'success');
            await loadAllData();
            autoDriveBackup('cancel_registration');
          }
        });
      }
    }

    activityDetailModal.classList.add('active');
  }
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

  // UNIVERSAL DELEGATE CLOSE LISTENER FOR ALL MODAL CLOSE BUTTONS (.close-btn)
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.close-btn');
    if (closeBtn) {
      e.preventDefault();
      const backdrop = closeBtn.closest('.modal-backdrop');
      if (backdrop) {
        backdrop.classList.remove('active');
      }
    }
  });

  // MODALS CLOSE LISTENERS
  if (typeof closeStaffLoginModalBtn !== 'undefined' && closeStaffLoginModalBtn) closeStaffLoginModalBtn.addEventListener('click', () => staffLoginModal.classList.remove('active'));
  if (typeof closeAdminLoginModalBtn !== 'undefined' && closeAdminLoginModalBtn) closeAdminLoginModalBtn.addEventListener('click', () => adminLoginModal.classList.remove('active'));
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

  // Close modal when clicking outside on the backdrop background
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  // Close active modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
    }
  });

  // REGISTRATION SUBMIT WITH AUTO-DRIVE BACKUP TRIGGER
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = regForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก...';

    const staff = api.getCurrentStaff();
    const phoneVal = document.getElementById('phoneInput').value.trim();

    // Auto-save phone number to staff profile if provided
    if (staff && phoneVal) {
      staff.phone = phoneVal;
      api.updateStaffUser(staff.studentId, { phone: phoneVal });
    }

    const payload = {
      activityId: modalActId.value,
      activityTitle: modalActTitle.value,
      hours: parseInt(modalActTitle.getAttribute('data-hours') || 3, 10),
      staffId: staff ? staff.studentId : '',
      staffName: staff ? staff.fullName : '',
      major: staff ? staff.major : '',
      department: staff ? staff.department : '',
      position: staff ? staff.position : '',
      phone: phoneVal
    };

    const res = await api.registerStaff(payload);
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ยืนยันการลงทะเบียน';
    registrationModal.classList.remove('active');

    if (res && res.success) {
      showToast('บันทึกการลงทะเบียนสำเร็จเรียบร้อย! รอเจ้าหน้าที่อนุมัติชั่วโมง', 'success');
      await loadAllData();
      autoDriveBackup('new_registration');
    } else {
      showToast('เกิดข้อผิดพลาดในการลงทะเบียน', 'error');
    }
  });

  // --- ACTIVITY PARTICIPANTS LIST MODAL LOGIC ---
  if (closeActPartModalBtn && activityParticipantsModal) {
    closeActPartModalBtn.addEventListener('click', () => {
      activityParticipantsModal.classList.remove('active');
    });
  }

  if (searchActPartInput) {
    searchActPartInput.addEventListener('input', () => {
      if (activeParticipantActId) renderActivityParticipantsTable(activeParticipantActId);
    });
  }

  if (filterActPartStatus) {
    filterActPartStatus.addEventListener('change', () => {
      if (activeParticipantActId) renderActivityParticipantsTable(activeParticipantActId);
    });
  }

  if (exportActPartCsvBtn) {
    exportActPartCsvBtn.addEventListener('click', () => {
      if (activeParticipantActId) exportActivityParticipantsCsv(activeParticipantActId);
    });
  }

  if (addStaffToCurrentActBtn) {
    addStaffToCurrentActBtn.addEventListener('click', () => {
      if (activeParticipantActId) {
        const act = currentActivities.find(a => a.id === activeParticipantActId);
        const addStaffToActModal = document.getElementById('addStaffToActModal');
        if (act && addStaffToActModal) {
          document.getElementById('adminAddActId').value = act.id;
          document.getElementById('adminAddActTitle').value = act.title;
          document.getElementById('adminAddActHours').value = act.hours || 3;
          document.getElementById('adminAddActNameLabel').textContent = `${act.title} (${act.id})`;

          const searchInput = document.getElementById('searchStaffInModalInput');
          if (searchInput) searchInput.value = '';
          const selectAllCheck = document.getElementById('selectAllStaffCheck');
          if (selectAllCheck) selectAllCheck.checked = false;

          renderStaffCheckboxList(act.id);
          addStaffToActModal.classList.add('active');
        }
      }
    });
  }

  function openActivityParticipantsModal(actId) {
    if (currentRole !== 'admin') {
      showToast('ดูรายชื่อผู้ลงทะเบียนได้เฉพาะหน้าผู้ดูแลระบบ (Admin) เท่านั้น', 'warning');
      return;
    }

    const act = currentActivities.find(a => a.id === actId);
    if (!act) return;

    activeParticipantActId = actId;

    const titleLabel = document.getElementById('actPartTitleLabel');
    const dateLabel = document.getElementById('actPartDateLabel');
    const locationLabel = document.getElementById('actPartLocationLabel');
    const hoursLabel = document.getElementById('actPartHoursLabel');

    if (titleLabel) titleLabel.textContent = `กิจกรรม: ${act.title} (${act.id})`;
    if (dateLabel) dateLabel.textContent = `${act.date} (${act.time})`;
    if (locationLabel) locationLabel.textContent = act.location;
    if (hoursLabel) hoursLabel.textContent = `+${act.hours || 3} ชม.`;

    if (searchActPartInput) searchActPartInput.value = '';
    if (filterActPartStatus) filterActPartStatus.value = '';

    renderActivityParticipantsTable(actId);

    if (activityParticipantsModal) {
      activityParticipantsModal.scrollTop = 0;
      const modalContent = activityParticipantsModal.querySelector('.modal-content');
      if (modalContent) modalContent.scrollTop = 0;
      activityParticipantsModal.classList.add('active');
    }
  }

  function renderActivityParticipantsTable(actId) {
    const tableBody = document.getElementById('actPartTableBody');
    const regCountText = document.getElementById('actPartRegCountText');
    if (!tableBody) return;

    const act = currentActivities.find(a => a.id === actId);
    const actQuota = act ? act.maxQuota : 0;

    let regs = currentRegistrations.filter(r => r.activityId === actId);

    if (regCountText) {
      regCountText.textContent = `${regs.length} / ${actQuota} คน`;
    }

    const query = searchActPartInput ? searchActPartInput.value.trim().toLowerCase() : '';
    const statusVal = filterActPartStatus ? filterActPartStatus.value : '';

    if (query) {
      regs = regs.filter(r =>
        (r.staffId && String(r.staffId).toLowerCase().includes(query)) ||
        (r.staffName && r.staffName.toLowerCase().includes(query)) ||
        (r.department && r.department.toLowerCase().includes(query)) ||
        (r.major && r.major.toLowerCase().includes(query)) ||
        (r.phone && r.phone.toLowerCase().includes(query)) ||
        (r.email && r.email.toLowerCase().includes(query))
      );
    }

    if (statusVal) {
      regs = regs.filter(r => r.status === statusVal);
    }

    tableBody.innerHTML = '';

    if (regs.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:2.5rem; color:var(--text-gray);">
            <i class="fa-solid fa-user-slash" style="font-size:2rem; margin-bottom:0.5rem; color:#cbd5e1; display:block;"></i>
            ยังไม่มีผู้ลงทะเบียนกิจกรรมนี้ หรือ ไม่พบข้อมูลตรงตามเงื่อนไขที่ค้นหา
          </td>
        </tr>
      `;
      return;
    }

    regs.forEach((r, idx) => {
      let statusBadge = '<span class="status-badge status-pending">🟡 รออนุมัติ</span>';
      if (r.status === 'approved') {
        statusBadge = '<span class="status-badge status-approved">🟢 อนุมัติแล้ว</span>';
      } else if (r.status === 'rejected') {
        statusBadge = '<span class="status-badge status-rejected">🔴 ปฏิเสธ</span>';
      }

      tableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td style="text-align:center; font-weight:600; color:var(--text-gray);">${idx + 1}</td>
          <td><strong style="font-family:'Space Grotesk', monospace; color:var(--primary-navy);">${r.staffId}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-dark);">${r.staffName}</div>
            <div style="font-size:0.75rem; color:var(--text-gray);">${r.position || 'ผู้ปฏิบัติงาน'}</div>
          </td>
          <td>
            <div style="font-size:0.85rem;">${r.major || r.department || '-'}</div>
            <div style="font-size:0.75rem; color:var(--text-gray);">${r.department || ''}</div>
          </td>
          <td>
            <div style="font-size:0.8rem;"><i class="fa-solid fa-phone" style="font-size:0.7rem; color:#64748b;"></i> ${r.phone || '-'}</div>
            <div style="font-size:0.75rem; color:var(--text-gray);"><i class="fa-solid fa-envelope" style="font-size:0.7rem; color:#64748b;"></i> ${r.email || '-'}</div>
          </td>
          <td style="font-size:0.8rem; color:var(--text-gray);">${r.timestamp || r.registrationDate || '-'}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display:flex; align-items:center; gap:0.25rem; flex-wrap:wrap;">
              ${r.status !== 'approved' ? `
                <button class="role-pill-btn act-part-approve-btn" data-reg-id="${r.regId}" style="background:#16a34a; color:white; padding:0.2rem 0.5rem; font-size:0.72rem; cursor:pointer;" title="อนุมัติการลงทะเบียน"><i class="fa-solid fa-check"></i> อนุมัติ</button>
              ` : ''}
              ${r.status !== 'rejected' ? `
                <button class="role-pill-btn act-part-reject-btn" data-reg-id="${r.regId}" style="background:#ea580c; color:white; padding:0.2rem 0.5rem; font-size:0.72rem; cursor:pointer;" title="ปฏิเสธการลงทะเบียน"><i class="fa-solid fa-xmark"></i> ปฏิเสธ</button>
              ` : ''}
              <button class="role-pill-btn act-part-delete-btn" data-reg-id="${r.regId}" style="background:#ef4444; color:white; padding:0.2rem 0.5rem; font-size:0.72rem; cursor:pointer;" title="ลบรายชื่อออกจากกิจกรรม"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `);
    });

    // Wire Approve Buttons
    tableBody.querySelectorAll('.act-part-approve-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const targetBtn = e.currentTarget;
        const regId = targetBtn.getAttribute('data-reg-id');
        const reg = currentRegistrations.find(r => r.regId === regId);
        if (reg) {
          targetBtn.disabled = true;
          targetBtn.style.opacity = '0.75';
          targetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอนุมัติ...';
          reg.status = 'approved';
          reg.checkInTime = new Date().toLocaleString('th-TH');
          await api.approveHours(regId);
          showToast(`อนุมัติชั่วโมงกิจกรรมของ "${reg.staffName}" เรียบร้อยแล้ว`, 'success');
          renderActivityParticipantsTable(actId);
          renderActivitiesListTable();
          renderAdminTables();
          filterAndRenderActivities();
          autoDriveBackup('approve_participant');
        }
      });
    });

    // Wire Reject Buttons
    tableBody.querySelectorAll('.act-part-reject-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const targetBtn = e.currentTarget;
        const regId = targetBtn.getAttribute('data-reg-id');
        const reg = currentRegistrations.find(r => r.regId === regId);
        if (reg) {
          targetBtn.disabled = true;
          targetBtn.style.opacity = '0.75';
          targetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังปฏิเสธ...';
          reg.status = 'rejected';
          await api.rejectHours(regId);
          showToast(`ปฏิเสธการลงทะเบียนของ "${reg.staffName}" เรียบร้อยแล้ว`, 'warning');
          renderActivityParticipantsTable(actId);
          renderActivitiesListTable();
          renderAdminTables();
          filterAndRenderActivities();
          autoDriveBackup('reject_participant');
        }
      });
    });

    // Wire Delete Buttons
    tableBody.querySelectorAll('.act-part-delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const targetBtn = e.currentTarget;
        const regId = targetBtn.getAttribute('data-reg-id');
        const reg = currentRegistrations.find(r => r.regId === regId);
        if (reg && confirm(`คุณต้องการลบ "${reg.staffName}" ออกจากกิจกรรมนี้ใช่หรือไม่?`)) {
          targetBtn.disabled = true;
          targetBtn.style.opacity = '0.75';
          targetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
          api.deleteRegistration(regId);
          currentRegistrations = currentRegistrations.filter(r => r.regId !== regId);
          showToast(`ลบรายชื่อ "${reg.staffName}" ออกจากกิจกรรมแล้ว`, 'success');
          renderActivityParticipantsTable(actId);
          renderActivitiesListTable();
          renderAdminTables();
          filterAndRenderActivities();
          autoDriveBackup('delete_participant');
        }
      });
    });
  }

  function exportActivityParticipantsCsv(actId) {
    const act = currentActivities.find(a => a.id === actId);
    if (!act) return;

    const regs = currentRegistrations.filter(r => r.activityId === actId);
    if (regs.length === 0) {
      showToast('ไม่มีข้อมูลรายชื่อผู้ลงทะเบียนส่งออก', 'warning');
      return;
    }

    let csvContent = "\uFEFFลำดับ,รหัสนักศึกษา,ชื่อ-นามสกุล,สาขาวิชา/สังกัด,ตำแหน่ง,เบอร์โทร,อีเมล,วันเวลาลงทะเบียน,สถานะ,ชั่วโมง\n";

    regs.forEach((r, idx) => {
      const row = [
        idx + 1,
        `"${r.staffId || ''}"`,
        `"${r.staffName || ''}"`,
        `"${r.major || r.department || ''}"`,
        `"${r.position || ''}"`,
        `"${r.phone || ''}"`,
        `"${r.email || ''}"`,
        `"${r.timestamp || r.registrationDate || ''}"`,
        `"${r.status === 'approved' ? 'อนุมัติแล้ว' : r.status === 'rejected' ? 'ปฏิเสธ' : 'รออนุมัติ'}"`,
        `"${r.baseHours || act.hours || 3}"`
      ];
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `รายชื่อผู้ลงทะเบียน_${act.id}_${act.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`ส่งออกไฟล์ CSV รายชื่อกิจกรรม "${act.title}" สำเร็จแล้ว`, 'success');
  }

  // RENDER TABLE: ACTIVITIES LIST (WITH REORDER, EDIT & DELETE)
  function renderActivitiesListTable() {
    if (!activitiesListTableBody) return;
    activitiesListTableBody.innerHTML = '';

    currentActivities.forEach((a, idx) => {
      const realCount = currentRegistrations.filter(r => r.activityId === a.id).length;
      a.registeredCount = realCount;

      const isFirst = idx === 0;
      const isLast = idx === currentActivities.length - 1;

      activitiesListTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td><strong style="font-family:'Space Grotesk', monospace;">${a.id}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-dark);">${a.title}</div>
            <div style="font-size:0.75rem; color:var(--text-gray);">${a.category}</div>
          </td>
          <td>${a.date} <small style="color:var(--text-gray);">(${a.time})</small></td>
          <td>${a.location}</td>
          <td>
            <button class="role-pill-btn view-act-participants-btn" data-id="${a.id}" style="background:transparent; border:none; padding:0; font-size: inherit; cursor:pointer; color:var(--primary-blue);" title="คลิกเพื่อดูรายชื่อผู้ลงทะเบียน">
              <strong>${realCount}</strong> / ${a.maxQuota} คน <i class="fa-solid fa-users" style="font-size:0.75rem;"></i>
            </button>
          </td>
          <td><strong>+${a.hours || 3} ชม.</strong></td>
          <td>
            <div style="display:flex; align-items:center; gap:0.25rem; flex-wrap:wrap;">
              <button class="role-pill-btn view-act-participants-btn" data-id="${a.id}" style="background:#8b5cf6; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; cursor:pointer;" title="ดูรายชื่อผู้ลงทะเบียนกิจกรรมนี้"><i class="fa-solid fa-users"></i> ดูรายชื่อ (${realCount})</button>
              <button class="role-pill-btn move-up-act-btn" data-idx="${idx}" ${isFirst ? 'disabled style="opacity:0.35; cursor:not-allowed; background:#94a3b8; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"' : 'style="background:#0284c7; color:white; padding:0.25rem 0.5rem; font-size:0.75rem; cursor:pointer;"'} title="เลื่อนลำดับขึ้น"><i class="fa-solid fa-arrow-up"></i></button>
              <button class="role-pill-btn move-down-act-btn" data-idx="${idx}" ${isLast ? 'disabled style="opacity:0.35; cursor:not-allowed; background:#94a3b8; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"' : 'style="background:#0284c7; color:white; padding:0.25rem 0.5rem; font-size:0.75rem; cursor:pointer;"'} title="เลื่อนลำดับลง"><i class="fa-solid fa-arrow-down"></i></button>
              ${a.status === 'open'
          ? `<button class="role-pill-btn toggle-act-status-btn" data-id="${a.id}" data-target-status="closed" style="background:#dc2626; color:white; padding:0.25rem 0.55rem; font-size:0.75rem; cursor:pointer;" title="คลิกเพื่อปิดรับสมัคร"><i class="fa-solid fa-lock"></i> ปิดรับสมัคร</button>`
          : `<button class="role-pill-btn toggle-act-status-btn" data-id="${a.id}" data-target-status="open" style="background:#16a34a; color:white; padding:0.25rem 0.55rem; font-size:0.75rem; cursor:pointer;" title="คลิกเพื่อเปิดรับสมัคร"><i class="fa-solid fa-lock-open"></i> เปิดรับสมัคร</button>`}
              <button class="role-pill-btn add-staff-to-act-btn" data-id="${a.id}" style="background:#10b981; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; cursor:pointer;" title="เพิ่มผู้ปฏิบัติงานเข้ากิจกรรมนี้"><i class="fa-solid fa-user-plus"></i> เพิ่มคน</button>
              <button class="role-pill-btn edit-act-btn" data-id="${a.id}" style="background:#2563eb; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; cursor:pointer;" title="แก้ไขกิจกรรม"><i class="fa-solid fa-pen"></i> แก้ไข</button>
              <button class="role-pill-btn delete-act-btn" data-id="${a.id}" style="background:#ef4444; color:white; padding:0.25rem 0.5rem; font-size:0.75rem; cursor:pointer;" title="ลบกิจกรรม"><i class="fa-solid fa-trash"></i> ลบ</button>
            </div>
          </td>
        </tr>
      `);
    });

    // View Activity Participants Listener
    document.querySelectorAll('#activitiesListTableBody .view-act-participants-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openActivityParticipantsModal(id);
      });
    });

    // 1-Click Quick Toggle Activity Status Listener
    document.querySelectorAll('.toggle-act-status-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const newStatus = e.currentTarget.getAttribute('data-target-status');
        const act = currentActivities.find(a => a.id === id);
        if (act) {
          act.status = newStatus;
          await api.updateActivity(id, { status: newStatus });
          const label = newStatus === 'open' ? 'เปิดรับสมัคร' : 'ปิดรับสมัคร';
          showToast(`สลับสถานะกิจกรรม "${act.title}" เป็น "${label}" เรียบร้อยแล้ว`, 'success');
          renderActivitiesListTable();
          filterAndRenderActivities();
          autoDriveBackup('toggle_activity_status');
        }
      });
    });

    // Add Staff To Activity Listener
    const addStaffToActModal = document.getElementById('addStaffToActModal');

    document.querySelectorAll('.add-staff-to-act-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const act = currentActivities.find(a => a.id === id);
        if (act && addStaffToActModal) {
          document.getElementById('adminAddActId').value = act.id;
          document.getElementById('adminAddActTitle').value = act.title;
          document.getElementById('adminAddActHours').value = act.hours || 3;
          document.getElementById('adminAddActNameLabel').textContent = `${act.title} (${act.id})`;

          const searchInput = document.getElementById('searchStaffInModalInput');
          if (searchInput) searchInput.value = '';
          const selectAllCheck = document.getElementById('selectAllStaffCheck');
          if (selectAllCheck) selectAllCheck.checked = false;

          renderStaffCheckboxList(act.id);
          addStaffToActModal.classList.add('active');
        }
      });
    });

    // Move Up Listener
    document.querySelectorAll('.move-up-act-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        if (idx > 0) {
          const temp = currentActivities[idx];
          currentActivities[idx] = currentActivities[idx - 1];
          currentActivities[idx - 1] = temp;

          api.saveActivitiesOrder(currentActivities);
          renderActivitiesListTable();
          filterAndRenderActivities();
          showToast('ปรับเลื่อนลำดับกิจกรรมขึ้นเรียบร้อยแล้ว', 'success');
        }
      });
    });

    // Move Down Listener
    document.querySelectorAll('.move-down-act-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        if (idx < currentActivities.length - 1) {
          const temp = currentActivities[idx];
          currentActivities[idx] = currentActivities[idx + 1];
          currentActivities[idx + 1] = temp;

          api.saveActivitiesOrder(currentActivities);
          renderActivitiesListTable();
          filterAndRenderActivities();
          showToast('ปรับเลื่อนลำดับกิจกรรมลงเรียบร้อยแล้ว', 'success');
        }
      });
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
          const statusInput = document.getElementById('editActStatus');
          if (statusInput) statusInput.value = act.status || 'open';
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
      const submitBtn = editActivityForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-save"></i> บันทึกการแก้ไข';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกการแก้ไขลง Google Sheets...';
      }

      try {
        const id = document.getElementById('editActId').value;
        const bannerVal = document.getElementById('editActBanner').value.trim();
        const updated = {
          title: document.getElementById('editActTitle').value.trim(),
          description: document.getElementById('editActDesc').value.trim(),
          date: document.getElementById('editActDate').value,
          time: document.getElementById('editActTime').value.trim(),
          location: document.getElementById('editActLocation').value.trim(),
          maxQuota: parseInt(document.getElementById('editActQuota').value, 10),
          hours: parseInt(document.getElementById('editActHours').value, 10),
          status: document.getElementById('editActStatus').value
        };

        if (bannerVal) {
          updated.banner = bannerVal;
        }

        await api.updateActivity(id, updated);
        document.getElementById('editActivityModal').classList.remove('active');
        showToast(`✅ บันทึกแก้ไขข้อมูลกิจกรรม "${updated.title}" สำเร็จเรียบร้อยแล้ว!`, 'success');
        await loadAllData();
        renderActivitiesListTable();
        filterAndRenderActivities();
        autoDriveBackup('edit_activity');
      } catch (err) {
        showToast('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
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
          <td><strong class="inspect-staff-trigger" data-id="${s.studentId}" style="color:#1e3a8a; cursor:pointer; text-decoration:underline;" title="คลิกเพื่อดูข้อมูลและประวัติสะสมชั่วโมงรายบุคคล">${cleanName}</strong></td>
          <td>${s.major} <small style="color:var(--text-gray);">(${s.year || 'ชั้นปีที่ 3'})</small></td>
          <td>${s.department} <small style="color:var(--text-gray);">(${s.position || ''})</small></td>
          <td><strong style="color:var(--success-green);">${earned} / ${s.targetHours || 200} ชม.</strong></td>
          <td>
            <button class="role-pill-btn inspect-staff-btn" data-id="${s.studentId}" style="background:#7c3aed; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; margin-right:0.25rem;" title="ดูข้อมูลและประวัติสะสมชั่วโมงรายบุคคล"><i class="fa-solid fa-address-card"></i> ดูข้อมูลรายบุคคล</button>
            <button class="role-pill-btn edit-staff-btn" data-id="${s.studentId}" style="background:#2563eb; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; margin-right:0.25rem;"><i class="fa-solid fa-user-pen"></i> แก้ไข</button>
            <button class="role-pill-btn delete-staff-btn" data-id="${s.studentId}" style="background:#ef4444; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i> ลบ</button>
          </td>
        </tr>
      `);
    });

    document.querySelectorAll('.inspect-staff-btn, .inspect-staff-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openStaffInspectorModal(id);
      });
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
          const targetHoursInput = document.getElementById('editStaffTargetHours');
          if (targetHoursInput) targetHoursInput.value = s.targetHours || 200;
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

  // --- INDIVIDUAL STAFF INSPECTOR MODAL FOR ADMIN ---
  const staffInspectorModal = document.getElementById('staffInspectorModal');
  const closeStaffInspectorModalBtn = document.getElementById('closeStaffInspectorModalBtn');
  const printInspectStaffBtn = document.getElementById('printInspectStaffBtn');

  if (closeStaffInspectorModalBtn && staffInspectorModal) {
    closeStaffInspectorModalBtn.addEventListener('click', () => {
      staffInspectorModal.classList.remove('active');
    });
  }

  function openStaffInspectorModal(studentId) {
    if (!staffInspectorModal) return;
    const staffList = api.getStaffUsers();
    const staff = staffList.find(s => String(s.studentId).trim() === String(studentId).trim());
    if (!staff) {
      showToast('ไม่พบข้อมูลผู้ปฏิบัติงานรหัสนี้', 'error');
      return;
    }

    // Set Staff Details
    const cleanName = staff.fullName ? staff.fullName.replace(/\s*\([^)]*\)/g, '').trim() : 'ผู้ปฏิบัติงาน';
    const titleNameEl = document.getElementById('inspectStaffTitleName');
    const fullNameEl = document.getElementById('inspectStaffFullName');
    const idBadgeEl = document.getElementById('inspectStaffIdBadge');
    const majorEl = document.getElementById('inspectStaffMajor');
    const yearEl = document.getElementById('inspectStaffYear');
    const deptEl = document.getElementById('inspectStaffDept');
    const posEl = document.getElementById('inspectStaffPos');

    if (titleNameEl) titleNameEl.textContent = cleanName;
    if (fullNameEl) fullNameEl.textContent = cleanName;
    if (idBadgeEl) idBadgeEl.textContent = staff.studentId;
    if (majorEl) majorEl.textContent = staff.major || '-';
    if (yearEl) yearEl.textContent = staff.year || 'ชั้นปีที่ 3';
    if (deptEl) deptEl.textContent = staff.department || '-';
    if (posEl) posEl.textContent = staff.position || '-';

    const avatarBox = document.getElementById('inspectStaffAvatarBox');
    const avatarUrl = convertDriveUrlToDirectLink(staff.avatar);
    if (avatarBox) {
      if (avatarUrl) {
        avatarBox.innerHTML = `<img src="${avatarUrl}" alt="Avatar" style="width:100%; height:100%; object-fit:cover;">`;
      } else {
        avatarBox.innerHTML = `<i class="fa-solid fa-user-graduate"></i>`;
      }
    }

    // Filter Registrations for this Staff
    const myRegs = currentRegistrations.filter(r => String(r.staffId).trim() === String(staff.studentId).trim());

    let earned = 0;
    let pending = 0;
    myRegs.forEach(r => {
      const baseH = parseFloat(String(r.baseHours || r.hours || 3).replace(/[^0-9.]/g, '')) || 3;
      const earnedH = parseFloat(String(r.earnedHours || 0).replace(/[^0-9.]/g, '')) || 0;
      if (r.status === 'approved') {
        earned += (earnedH > 0 ? earnedH : baseH);
      } else if (r.status === 'pending') {
        pending += baseH;
      }
    });

    const target = Number(staff.targetHours) || 200;
    const percent = Math.min(100, Math.round((earned / target) * 100));

    const earnedEl = document.getElementById('inspectEarnedHours');
    const targetEl = document.getElementById('inspectTargetHours');
    const pendingEl = document.getElementById('inspectPendingHours');
    const regCountEl = document.getElementById('inspectRegCount');

    if (earnedEl) earnedEl.textContent = earned;
    if (targetEl) targetEl.textContent = target;
    if (pendingEl) pendingEl.textContent = pending;
    if (regCountEl) regCountEl.textContent = myRegs.length;

    const progressPercentText = document.getElementById('inspectProgressPercent');
    const progressBarFill = document.getElementById('inspectProgressBarFill');
    if (progressPercentText) progressPercentText.textContent = `${percent}%`;
    if (progressBarFill) progressBarFill.style.width = `${Math.max(1, percent)}%`;

    // Populate History Table
    const tableBody = document.getElementById('inspectStaffHistoryTableBody');
    if (tableBody) {
      tableBody.innerHTML = '';
      if (myRegs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-gray); padding: 2rem;">ไม่พบประวัติการลงทะเบียนกิจกรรมของผู้ปฏิบัติงานรายนี้</td></tr>`;
      } else {
        myRegs.forEach((r, idx) => {
          const isApproved = r.status === 'approved';
          const isRejected = r.status === 'rejected';

          const rowHtml = `
            <tr>
              <td>${idx + 1}</td>
              <td><strong style="font-family:'Space Grotesk', monospace;">${r.regId}</strong></td>
              <td><strong>${r.activityTitle}</strong></td>
              <td>${r.baseHours || 3} ชม.</td>
              <td><strong style="color:${isApproved ? 'var(--success-green)' : 'var(--text-dark)'}">${isApproved ? (r.earnedHours || r.baseHours || 3) + ' ชม.' : '0 ชม.'}</strong></td>
              <td>
                ${isApproved ? '<span class="status-tag-checked"><i class="fa-solid fa-circle-check"></i> อนุมัติแล้ว</span>' : isRejected ? '<span style="background:#fee2e2; color:#991b1b; padding:0.2rem 0.6rem; border-radius:4px; font-size:0.75rem; font-weight:600;">ปฏิเสธ</span>' : '<span class="status-tag-pending"><i class="fa-solid fa-clock"></i> รออนุมัติ</span>'}
              </td>
              <td>
                <div style="display:flex; gap:0.35rem; align-items:center; flex-wrap:wrap;">
                  ${isApproved
                    ? `<button class="role-pill-btn inspect-unapprove-btn" data-id="${r.regId}" style="background:#f59e0b; color:white; padding:0.2rem 0.55rem; font-size:0.75rem;"><i class="fa-solid fa-rotate-left"></i> ยกเลิก</button>`
                    : `<button class="role-pill-btn inspect-approve-btn" data-id="${r.regId}" style="background:#16a34a; color:white; padding:0.2rem 0.55rem; font-size:0.75rem;"><i class="fa-solid fa-check"></i> อนุมัติ</button>
                       <button class="role-pill-btn inspect-reject-btn" data-id="${r.regId}" style="background:#64748b; color:white; padding:0.2rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-xmark"></i></button>`}
                  <button class="role-pill-btn inspect-delete-btn" data-id="${r.regId}" style="background:#ef4444; color:white; padding:0.2rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i></button>
                </div>
              </td>
            </tr>
          `;
          tableBody.insertAdjacentHTML('beforeend', rowHtml);
        });

        // Attach Row Action Handlers in Inspector Modal
        tableBody.querySelectorAll('.inspect-approve-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const regId = e.currentTarget.getAttribute('data-id');
            await api.approveHours(regId);
            showToast('อนุมัติชั่วโมงกิจกรรมเรียบร้อยแล้ว', 'success');
            currentRegistrations = api.getRegistrations();
            openStaffInspectorModal(studentId);
            if (currentRole === 'admin') renderAdminTables();
          });
        });

        tableBody.querySelectorAll('.inspect-unapprove-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const regId = e.currentTarget.getAttribute('data-id');
            await api.unapproveHours(regId);
            showToast('ยกเลิกการอนุมัติเรียบร้อยแล้ว', 'info');
            currentRegistrations = api.getRegistrations();
            openStaffInspectorModal(studentId);
            if (currentRole === 'admin') renderAdminTables();
          });
        });

        tableBody.querySelectorAll('.inspect-reject-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const regId = e.currentTarget.getAttribute('data-id');
            await api.rejectHours(regId);
            showToast('ปฏิเสธรายการลงทะเบียนเรียบร้อยแล้ว', 'warning');
            currentRegistrations = api.getRegistrations();
            openStaffInspectorModal(studentId);
            if (currentRole === 'admin') renderAdminTables();
          });
        });

        tableBody.querySelectorAll('.inspect-delete-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const regId = e.currentTarget.getAttribute('data-id');
            if (confirm(`คุณต้องการลบรายการลงทะเบียนรหัส ${regId} ใช่หรือไม่?`)) {
              await api.deleteRegistration(regId);
              showToast('ลบรายการลงทะเบียนสำเร็จ', 'info');
              currentRegistrations = api.getRegistrations();
              openStaffInspectorModal(studentId);
              if (currentRole === 'admin') renderAdminTables();
            }
          });
        });
      }
    }

    // Set Print Button Handler
    if (printInspectStaffBtn) {
      printInspectStaffBtn.onclick = () => {
        window.print();
      };
    }

    staffInspectorModal.classList.add('active');
  }

  // SUBMIT EDIT STAFF FORM
  if (editStaffForm) {
    editStaffForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = editStaffForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-save"></i> บันทึกการแก้ไข';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกการแก้ไขลง Google Sheets...';
      }

      try {
        const id = document.getElementById('editStaffIdKey').value;
        const avatarVal = document.getElementById('editStaffAvatar').value.trim();
        const targetHoursVal = parseInt(document.getElementById('editStaffTargetHours').value, 10);

        const updated = {
          fullName: document.getElementById('editStaffName').value.trim(),
          major: document.getElementById('editStaffMajor').value.trim(),
          year: document.getElementById('editStaffYear').value,
          department: document.getElementById('editStaffDept').value.trim(),
          position: document.getElementById('editStaffPos').value.trim(),
          targetHours: isNaN(targetHoursVal) ? 200 : targetHoursVal
        };

        if (avatarVal) {
          updated.avatar = avatarVal;
        }

        await api.updateStaffUser(id, updated);
        editStaffModal.classList.remove('active');
        showToast(`✅ บันทึกแก้ไขข้อมูลผู้ปฏิบัติงานรหัส ${id} สำเร็จเรียบร้อยแล้ว!`, 'success');
        await loadAllData();
        renderStaffListTable();
        autoDriveBackup('edit_staff');
      } catch (err) {
        showToast('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }

  // RENDER TABLE: REGISTRATIONS LIST (WITH BULK ACTIONS & DELETE)
  function renderRegistrationsListTable() {
    if (!regsListTableBody) return;
    regsListTableBody.innerHTML = '';

    currentRegistrations.forEach(r => {
      const isApproved = r.status === 'approved';
      const isRejected = r.status === 'rejected';

      regsListTableBody.insertAdjacentHTML('beforeend', `
        <tr>
          <td style="text-align:center;">
            <input type="checkbox" class="modal-select-reg-check" value="${r.regId}" style="width:16px; height:16px; accent-color:#10b981; cursor:pointer;">
          </td>
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

    // Checkbox & Bulk Actions for Registrations Modal
    const updateModalRegBulkCount = () => {
      const checkedBoxes = Array.from(document.querySelectorAll('.modal-select-reg-check:checked'));
      const count = checkedBoxes.length;

      const badge = document.getElementById('selectedModalRegCountBadge');
      const approveBtn = document.getElementById('bulkApproveModalRegsBtn');
      const rejectBtn = document.getElementById('bulkRejectModalRegsBtn');
      const deleteBtn = document.getElementById('bulkDeleteModalRegsBtn');
      const selectAllCheck = document.getElementById('selectAllModalRegsCheck');
      const headerCheck = document.getElementById('headerModalRegsSelectAllCheck');

      if (badge) badge.textContent = `เลือก ${count} รายการ`;
      document.querySelectorAll('.modal-bulk-count-num').forEach(el => el.textContent = count);

      [approveBtn, rejectBtn, deleteBtn].forEach(btn => {
        if (btn) {
          btn.disabled = count === 0;
          btn.style.opacity = count === 0 ? '0.5' : '1';
        }
      });

      const allCheckboxes = Array.from(document.querySelectorAll('.modal-select-reg-check'));
      const isAllChecked = allCheckboxes.length > 0 && allCheckboxes.every(cb => cb.checked);
      const isSomeChecked = allCheckboxes.some(cb => cb.checked);

      [selectAllCheck, headerCheck].forEach(chk => {
        if (chk) {
          chk.checked = isAllChecked;
          chk.indeterminate = !isAllChecked && isSomeChecked;
        }
      });
    };

    document.querySelectorAll('.modal-select-reg-check').forEach(chk => {
      chk.addEventListener('change', updateModalRegBulkCount);
    });

    updateModalRegBulkCount();
  }

  // RENDER TABLE: APPROVED HOURS HISTORY
  function renderApprovedHoursTable() {
    if (!approvedHoursTableBody) return;
    approvedHoursTableBody.innerHTML = '';

    const approvedList = currentRegistrations.filter(r => r.status === 'approved');

    if (approvedList.length === 0) {
      approvedHoursTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-gray);">ไม่พบประวัติชั่วโมงที่ได้รับการอนุมัติ</td></tr>`;
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
          <td>
            <button class="role-pill-btn unapprove-modal-btn" data-id="${r.regId}" style="background:#f59e0b; color:white; padding:0.25rem 0.6rem; font-size:0.75rem;"><i class="fa-solid fa-rotate-left"></i> ยกเลิกการอนุมัติ</button>
          </td>
        </tr>
      `);
    });

    document.querySelectorAll('.unapprove-modal-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        await api.unapproveHours(id);
        showToast(`ยกเลิกการอนุมัติสำหรับรหัส ${id} เรียบร้อยแล้ว (ย้อนกลับเป็นรออนุมัติ)`, 'info');
        await loadAllData();
        renderApprovedHoursTable();
        renderAdminTables();
        autoDriveBackup('unapprove_hours');
      });
    });
  }

  // RENDER TABLE: ADMIN USERS LIST (WITH EDIT & DELETE)
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
            <button class="role-pill-btn edit-admin-btn" data-id="${a.username}" style="background:#2563eb; color:white; padding:0.25rem 0.6rem; font-size:0.75rem; margin-right:0.25rem;"><i class="fa-solid fa-user-pen"></i> แก้ไข</button>
            ${a.username !== 'admin' ? `<button class="role-pill-btn delete-admin-btn" data-id="${a.username}" style="background:#ef4444; color:white; padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i> ลบ</button>` : '<small style="color:var(--text-gray);">แอดมินหลัก</small>'}
          </td>
        </tr>
      `);
    });

    // Attach Edit Admin Event
    document.querySelectorAll('.edit-admin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const username = e.currentTarget.getAttribute('data-id');
        const a = api.getAdminUsers().find(x => x.username === username);
        if (a) {
          document.getElementById('editAdminUsernameKey').value = a.username;
          document.getElementById('editAdminUsername').value = a.username;
          document.getElementById('editAdminFullName').value = a.fullName;
          document.getElementById('editAdminPosition').value = a.position;
          document.getElementById('editAdminPassword').value = '';
          document.getElementById('editAdminAvatar').value = a.avatar || '';
          document.getElementById('editAdminModal').classList.add('active');
        }
      });
    });

    // Attach Delete Admin Event
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

  // SUBMIT EDIT ADMIN FORM
  const editAdminForm = document.getElementById('editAdminForm');
  const closeEditAdminModalBtn = document.getElementById('closeEditAdminModalBtn');
  if (closeEditAdminModalBtn) {
    closeEditAdminModalBtn.addEventListener('click', () => {
      document.getElementById('editAdminModal').classList.remove('active');
    });
  }

  if (editAdminForm) {
    editAdminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = editAdminForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-save"></i> บันทึกการแก้ไข';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกการแก้ไขลง Google Sheets...';
      }

      try {
        const username = document.getElementById('editAdminUsernameKey').value;
        const avatarVal = document.getElementById('editAdminAvatar').value.trim();

        const updated = {
          fullName: document.getElementById('editAdminFullName').value.trim(),
          position: document.getElementById('editAdminPosition').value.trim()
        };
        const pwd = document.getElementById('editAdminPassword').value.trim();
        if (pwd) updated.password = pwd;

        if (avatarVal) {
          updated.avatar = avatarVal;
        }

        await api.updateAdminUser(username, updated);
        document.getElementById('editAdminModal').classList.remove('active');
        showToast(`✅ บันทึกแก้ไขข้อมูลแอดมิน "${username}" สำเร็จเรียบร้อยแล้ว!`, 'success');
        await loadAllData();
        renderAdminListTable();
        autoDriveBackup('edit_admin');
      } catch (err) {
        showToast('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }

  // ADD STAFF USER SUBMIT
  if (addStaffForm) {
    addStaffForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = addStaffForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-plus"></i> บันทึกเพิ่มผู้ปฏิบัติงาน';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกข้อมูลลง Google Sheets...';
      }

      try {
        const rawAvatar = newStaffAvatar ? newStaffAvatar.value.trim() : '';
        const studentIdVal = document.getElementById('newStaffId').value.trim();

        if (!validateStudentIdFormat(studentIdVal)) {
          showToast('รหัสนักศึกษาต้องเป็นตัวเลข 9 หลัก ตามด้วยขีด (-) และตัวเลข 1 หลัก (ตัวอย่าง: 123456789-0)', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHtml;
          }
          return;
        }

        const targetHoursVal = parseInt(document.getElementById('newStaffTargetHours').value, 10);
        const newUser = {
          studentId: studentIdVal,
          fullName: document.getElementById('newStaffName').value.trim(),
          major: document.getElementById('newStaffMajor').value.trim(),
          year: document.getElementById('newStaffYear').value,
          department: document.getElementById('newStaffDept').value.trim(),
          position: document.getElementById('newStaffPos').value.trim(),
          avatar: convertDriveUrlToDirectLink(rawAvatar),
          targetHours: isNaN(targetHoursVal) ? 200 : targetHoursVal
        };
        await api.createStaffUser(newUser);
        addStaffModal.classList.remove('active');
        addStaffForm.reset();
        if (staffAvatarPreviewBox) staffAvatarPreviewBox.style.display = 'none';
        showToast(`✅ บันทึกเพิ่มผู้ปฏิบัติงานใหม่ "${newUser.fullName}" สำเร็จเรียบร้อยแล้ว!`, 'success');
        await loadAllData();
        renderStaffListTable();
        autoDriveBackup('create_staff');
      } catch (err) {
        showToast('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }

  // ADD ADMIN USER SUBMIT
  if (addAdminForm) {
    addAdminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = addAdminForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-plus"></i> บันทึกเพิ่มแอดมิน';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกข้อมูลลง Google Sheets...';
      }

      try {
        const rawAvatar = newAdminAvatar ? newAdminAvatar.value.trim() : '';
        const newAdmin = {
          username: document.getElementById('newAdminUsername').value.trim(),
          password: document.getElementById('newAdminPassword').value.trim(),
          fullName: document.getElementById('newAdminFullName').value.trim(),
          position: document.getElementById('newAdminPosition').value.trim(),
          avatar: convertDriveUrlToDirectLink(rawAvatar),
          role: 'Admin'
        };
        await api.createAdminUser(newAdmin);
        addAdminModal.classList.remove('active');
        addAdminForm.reset();
        if (adminAvatarPreviewBox) adminAvatarPreviewBox.style.display = 'none';
        showToast(`✅ บันทึกเพิ่มเจ้าหน้าที่/แอดมินใหม่ "${newAdmin.fullName}" สำเร็จเรียบร้อยแล้ว!`, 'success');
        await loadAllData();
        renderAdminListTable();
        autoDriveBackup('create_admin');
      } catch (err) {
        showToast('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }

  // ADD ACTIVITY SUBMIT WITH GOOGLE DRIVE BANNER CONVERSION
  if (addActivityForm) {
    addActivityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = addActivityForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-plus"></i> บันทึกสร้างกิจกรรม';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกกิจกรรมใหม่ลง Google Sheets...';
      }

      try {
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
        showToast(`✅ บันทึกสร้างกิจกรรมใหม่ "${newAct.title}" สำเร็จเรียบร้อยแล้ว!`, 'success');
        await loadAllData();
        renderActivitiesListTable();
        filterAndRenderActivities();
        autoDriveBackup('create_activity');
      } catch (err) {
        showToast('❌ เกิดข้อผิดพลาดในการบันทึกกิจกรรม กรุณาลองใหม่อีกครั้ง', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }

  // HELPER FUNCTIONS FOR STAFF MULTI-SELECT IN MODAL
  function renderStaffCheckboxList(actId) {
    const container = document.getElementById('staffCheckboxListContainer');
    const modalStaffAvailableText = document.getElementById('modalStaffAvailableText');
    if (!container) return;

    const staffUsers = api.getStaffUsers();
    container.innerHTML = '';

    if (!staffUsers || staffUsers.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding: 1rem; color: #94a3b8; font-size: 0.85rem;">ไม่พบข้อมูลผู้ปฏิบัติงานในระบบ</div>';
      if (modalStaffAvailableText) modalStaffAvailableText.textContent = 'ทั้งหมด 0 คน';
      updateSelectedStaffCount();
      return;
    }

    let totalAvailableCount = 0;

    staffUsers.forEach(s => {
      const isRegged = currentRegistrations.some(r => r.staffId === s.studentId && r.activityId === actId);
      if (!isRegged) totalAvailableCount++;

      const itemLabel = document.createElement('label');
      itemLabel.className = `staff-check-item ${isRegged ? 'disabled' : ''}`;
      itemLabel.dataset.studentId = s.studentId;
      itemLabel.dataset.searchText = `${s.studentId} ${s.fullName} ${s.department || ''} ${s.major || ''}`.toLowerCase();

      itemLabel.innerHTML = `
        <input type="checkbox" class="staff-select-check" value="${s.studentId}" ${isRegged ? 'disabled' : ''}>
        <div style="display: flex; flex-direction: column; gap: 0.1rem; flex: 1;">
          <span style="font-weight: 600; color: ${isRegged ? '#94a3b8' : '#1e293b'};">
            ${s.fullName} <span style="font-weight: 400; color: #64748b; font-size: 0.8rem;">(${s.studentId})</span>
          </span>
          <span style="font-size: 0.75rem; color: #64748b;">
            ${s.department || s.major || '-'} ${isRegged ? '<strong style="color: #d97706; margin-left: 0.4rem;">⚠️ (ลงทะเบียนแล้ว)</strong>' : ''}
          </span>
        </div>
      `;

      container.appendChild(itemLabel);
    });

    if (modalStaffAvailableText) {
      modalStaffAvailableText.textContent = `พร้อมเลือก ${totalAvailableCount} / ${staffUsers.length} คน`;
    }

    container.querySelectorAll('.staff-select-check').forEach(chk => {
      chk.addEventListener('change', updateSelectedStaffCount);
    });

    updateSelectedStaffCount();
  }

  function updateSelectedStaffCount() {
    const container = document.getElementById('staffCheckboxListContainer');
    const countBadge = document.getElementById('selectedStaffCountBadge');
    const countSpan = document.getElementById('submitStaffCountSpan');
    const selectAllCheck = document.getElementById('selectAllStaffCheck');
    if (!container) return;

    const visibleAndEnabledCheckboxes = Array.from(
      container.querySelectorAll('.staff-check-item:not([style*="display: none"]) .staff-select-check:not([disabled])')
    );
    const checkedBoxes = Array.from(container.querySelectorAll('.staff-select-check:checked'));

    const checkedCount = checkedBoxes.length;

    if (countBadge) countBadge.textContent = `เลือก ${checkedCount} คน`;
    if (countSpan) countSpan.textContent = checkedCount;

    if (selectAllCheck) {
      if (visibleAndEnabledCheckboxes.length > 0 && visibleAndEnabledCheckboxes.every(cb => cb.checked)) {
        selectAllCheck.checked = true;
        selectAllCheck.indeterminate = false;
      } else if (visibleAndEnabledCheckboxes.some(cb => cb.checked)) {
        selectAllCheck.checked = false;
        selectAllCheck.indeterminate = true;
      } else {
        selectAllCheck.checked = false;
        selectAllCheck.indeterminate = false;
      }
    }
  }

  // Select All & Search staff in modal listeners
  const selectAllStaffCheck = document.getElementById('selectAllStaffCheck');
  if (selectAllStaffCheck) {
    selectAllStaffCheck.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const container = document.getElementById('staffCheckboxListContainer');
      if (!container) return;

      const visibleCheckboxes = container.querySelectorAll(
        '.staff-check-item:not([style*="display: none"]) .staff-select-check:not([disabled])'
      );
      visibleCheckboxes.forEach(cb => {
        cb.checked = isChecked;
      });
      updateSelectedStaffCount();
    });
  }

  const searchStaffInModalInput = document.getElementById('searchStaffInModalInput');
  if (searchStaffInModalInput) {
    searchStaffInModalInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      const container = document.getElementById('staffCheckboxListContainer');
      if (!container) return;

      const items = container.querySelectorAll('.staff-check-item');
      items.forEach(item => {
        const text = item.dataset.searchText || '';
        if (!q || text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
      updateSelectedStaffCount();
    });
  }

  // SUBMIT ADMIN ADD STAFF TO ACTIVITY FORM (MULTI-SELECT SUPPORT)
  const addStaffToActForm = document.getElementById('addStaffToActForm');
  const addStaffToActModal = document.getElementById('addStaffToActModal');

  if (addStaffToActForm) {
    addStaffToActForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const container = document.getElementById('staffCheckboxListContainer');
      const checkedBoxes = container ? Array.from(container.querySelectorAll('.staff-select-check:checked')) : [];

      if (checkedBoxes.length === 0) {
        showToast('กรุณาติ๊กเลือกผู้ปฏิบัติงานอย่างน้อย 1 คน', 'warning');
        return;
      }

      const selectedStudentIds = checkedBoxes.map(cb => cb.value);
      const allStaff = api.getStaffUsers();
      const selectedStaffList = selectedStudentIds.map(id => allStaff.find(s => s.studentId === id)).filter(Boolean);

      if (selectedStaffList.length === 0) {
        showToast('ไม่พบข้อมูลผู้ปฏิบัติงานที่เลือกในระบบ', 'error');
        return;
      }

      const submitBtn = document.getElementById('submitAddStaffToActBtn') || addStaffToActForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-user-plus"></i> ยืนยันการเพิ่มเข้ากิจกรรม';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกเพิ่มรายชื่อ (${selectedStaffList.length} คน)...`;
      }

      try {
        const actId = document.getElementById('adminAddActId').value;
        const actTitle = document.getElementById('adminAddActTitle').value;
        const hours = parseInt(document.getElementById('adminAddActHours').value, 10) || 3;
        const initialStatus = document.getElementById('adminAddActStatus').value;

        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < selectedStaffList.length; i++) {
          const staff = selectedStaffList[i];
          if (submitBtn && selectedStaffList.length > 1) {
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก (${i + 1}/${selectedStaffList.length})...`;
          }

          const payload = {
            activityId: actId,
            activityTitle: actTitle,
            hours: hours,
            staffId: staff.studentId,
            staffName: staff.fullName,
            major: staff.major,
            department: staff.department,
            position: staff.position,
            phone: staff.phone || ''
          };

          const res = await api.registerStaff(payload);
          if (res && res.success) {
            successCount++;
            if (initialStatus === 'approved' && res.regId) {
              await api.approveHours(res.regId);
            }
          } else {
            failCount++;
          }
        }

        if (addStaffToActModal) addStaffToActModal.classList.remove('active');

        if (successCount > 0) {
          if (selectedStaffList.length === 1) {
            showToast(`✅ บันทึกเพิ่มคุณ ${selectedStaffList[0].fullName} เข้ากิจกรรมสำเร็จเรียบร้อยแล้ว!`, 'success');
          } else {
            showToast(`✅ บันทึกเพิ่มผู้ปฏิบัติงานสำเร็จทั้งหมด ${successCount} คน!`, 'success');
          }
          await loadAllData();
          renderActivitiesListTable();
          filterAndRenderActivities();
          autoDriveBackup('admin_bulk_add_staff_to_activity');
        } else {
          showToast('❌ ไม่สามารถเพิ่มผู้ปฏิบัติงานเข้ากิจกรรมได้ กรุณาลองใหม่อีกครั้ง', 'error');
        }
      } catch (err) {
        console.error('Error adding staff to activity:', err);
        showToast('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }

  saveGasUrlBtn.addEventListener('click', async () => {
    const url = gasUrlInput.value.trim();
    if (!url) {
      showToast('กรุณาระบุ Web App URL ก่อนบันทึก', 'warning');
      return;
    }

    saveGasUrlBtn.disabled = true;
    saveGasUrlBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังซิงค์ข้อมูลจริงจาก Google Sheets...';

    await api.setGasUrl(url);

    saveGasUrlBtn.disabled = false;
    saveGasUrlBtn.innerHTML = '<i class="fa-solid fa-link"></i> บันทึกการเชื่อมต่อ Google Drive';
    gasSettingsModal.classList.remove('active');

    showToast('เชื่อมต่อและดึงข้อมูลจริงจาก Google Sheets เรียบร้อยแล้ว!', 'success');
    await loadAllData();
  });

  // DRIVE BACKUP TRIGGER BUTTON
  if (triggerDriveBackupBtn) {
    triggerDriveBackupBtn.addEventListener('click', async () => {
      const gasUrl = api.getGasUrl();
      if (!gasUrl) {
        gasUrlInput.value = '';
        gasSettingsModal.classList.add('active');
        showToast('กรุณาระบุ Google Apps Script Web App URL เพื่ออัปโหลดไฟล์สำรองลงใน Google Drive ของคุณ', 'warning');
        return;
      }

      triggerDriveBackupBtn.disabled = true;
      triggerDriveBackupBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> กำลังอัปโหลดลง Google Drive...';

      const res = await api.triggerDriveBackup();
      triggerDriveBackupBtn.disabled = false;
      triggerDriveBackupBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> สำรองข้อมูลเข้า Google Drive';

      if (res && res.success) {
        showToast(`สำเร็จ! สร้างไฟล์สำรองใน Google Drive เรียบร้อย (${res.fileName})`, 'success');
        renderAdminTables();
      } else {
        showToast('เกิดข้อผิดพลาดในการอัปโหลดลง Google Drive', 'error');
      }
    });
  }

  // RENDER ADMIN DASHBOARD & HOURS APPROVAL MANAGER
  function renderAdminTables() {
    if (!adminTableBody) return;
    adminTableBody.innerHTML = '';

    const staffUsers = api.getStaffUsers();
    let pendingHrsCount = 0;
    let approvedHrsCount = 0;

    currentRegistrations.forEach(r => {
      if (r.status === 'approved') approvedHrsCount += (r.earnedHours || r.baseHours || 3);
      else if (r.status === 'pending') pendingHrsCount += (r.baseHours || 3);
    });

    const actCount = currentActivities.length;
    const staffCount = staffUsers.length;
    const regCount = currentRegistrations.length;

    if (adminTotalActCount) adminTotalActCount.textContent = actCount;
    if (adminTotalStaffCount) adminTotalStaffCount.textContent = staffCount;
    if (adminTotalRegCount) adminTotalRegCount.textContent = regCount;
    if (adminTotalPendingHrs) adminTotalPendingHrs.textContent = pendingHrsCount;
    if (adminTotalApprovedHrs) adminTotalApprovedHrs.textContent = approvedHrsCount;

    const pendingList = currentRegistrations.filter(r => r.status === 'pending');

    if (pendingList.length === 0) {
      adminTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-gray); padding: 2rem;">🎉 ไม่พบรายการผู้ลงทะเบียนรออนุมัติ (อนุมัติหรือดำเนินการเรียบร้อยแล้วทุกรายการ)</td></tr>`;
    } else {
      pendingList.forEach(r => {
        const isApproved = r.status === 'approved';
        const isRejected = r.status === 'rejected';

        const row = `
          <tr>
            <td style="text-align:center;">
              <input type="checkbox" class="admin-select-reg-check" value="${r.regId}" style="width:16px; height:16px; accent-color:#10b981; cursor:pointer;">
            </td>
            <td><strong style="font-family:'Space Grotesk', monospace;">${r.regId}</strong></td>
            <td>
              <div class="inspect-staff-trigger" data-id="${r.staffId}" style="font-weight:700; color:#1e3a8a; cursor:pointer; text-decoration:underline;" title="คลิกเพื่อดูข้อมูลและประวัติสะสมชั่วโมงรายบุคคล">${r.staffName}</div>
              <div style="font-size:0.75rem; color:var(--text-gray);">${r.staffId}</div>
            </td>
            <td>${r.major || 'ภาษาอังกฤษเพื่อการสื่อสารธุรกิจ'} <small style="color:var(--text-gray);">(${r.department})</small></td>
            <td style="max-width: 220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${r.activityTitle}">${r.activityTitle}</td>
            <td><strong>${r.baseHours || 3} ชม.</strong></td>
            <td>
              ${isApproved ? '<span class="status-tag-checked"><i class="fa-solid fa-circle-check"></i> อนุมัติชั่วโมงแล้ว</span>' : isRejected ? '<span style="background:#fee2e2; color:#991b1b; padding:0.2rem 0.6rem; border-radius:4px; font-size:0.75rem; font-weight:600;">ปฏิเสธ</span>' : '<span class="status-tag-pending"><i class="fa-solid fa-clock"></i> รอเจ้าหน้าที่อนุมัติ</span>'}
            </td>
            <td>
              <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
                ${isApproved
            ? `<button class="role-pill-btn unapprove-hrs-btn" data-id="${r.regId}" style="background:#f59e0b; color:white; padding:0.25rem 0.55rem; font-size:0.75rem;" title="ยกเลิกการอนุมัติ ย้อนกลับเป็นรออนุมัติ"><i class="fa-solid fa-rotate-left"></i> ยกเลิกการอนุมัติ</button>`
            : `<button class="role-pill-btn approve-hrs-btn" data-id="${r.regId}" style="background:#16a34a; color:white; padding:0.25rem 0.65rem; font-size:0.75rem;"><i class="fa-solid fa-check"></i> อนุมัติชั่วโมง</button>
                     <button class="role-pill-btn reject-hrs-btn" data-id="${r.regId}" style="background:#64748b; color:white; padding:0.25rem 0.55rem; font-size:0.75rem;" title="ปฏิเสธรายการ"><i class="fa-solid fa-xmark"></i></button>`}
                <button class="role-pill-btn delete-reg-admin-btn" data-id="${r.regId}" data-act-id="${r.activityId}" style="background:#ef4444; color:white; padding:0.25rem 0.55rem; font-size:0.75rem;" title="ลบรายการลงทะเบียนนี้"><i class="fa-solid fa-trash"></i> ลบ</button>
              </div>
            </td>
          </tr>
        `;
        adminTableBody.insertAdjacentHTML('beforeend', row);
      });

      document.querySelectorAll('.approve-hrs-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          btn.disabled = true;
          btn.style.opacity = '0.75';
          btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอนุมัติ...';
          await api.approveHours(id);
          showToast(`อนุมัติชั่วโมงกิจกรรมสำเร็จสำหรับรหัส ${id}`, 'success');
          await loadAllData();
          renderAdminTables();
          autoDriveBackup('hours_approval');
        });
      });

      document.querySelectorAll('.unapprove-hrs-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          btn.disabled = true;
          btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
          await api.unapproveHours(id);
          showToast(`ยกเลิกการอนุมัติสำหรับรหัส ${id} เรียบร้อยแล้ว (ย้อนกลับเป็นรออนุมัติ)`, 'info');
          await loadAllData();
          renderAdminTables();
          autoDriveBackup('unapprove_hours');
        });
      });

      document.querySelectorAll('.delete-reg-admin-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const actId = e.currentTarget.getAttribute('data-act-id');
          if (confirm(`คุณต้องการลบรายการลงทะเบียนรหัส ${id} ใช่หรือไม่?\n(ข้อมูลจะถูกลบออกจากตาราง Google Sheets อัตโนมัติ)`)) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            api.deleteRegistration(id);
            const act = currentActivities.find(a => a.id === actId);
            if (act) {
              act.registeredCount = Math.max(0, (act.registeredCount || 1) - 1);
              if (act.status === 'full' && act.registeredCount < act.maxQuota) act.status = 'open';
              api.updateActivity(act.id, act);
            }
            showToast(`ลบรายการลงทะเบียน ${id} สำเร็จแล้ว`, 'success');
            await loadAllData();
            renderAdminTables();
            autoDriveBackup('delete_registration');
          }
        });
      });

      document.querySelectorAll('.reject-hrs-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          btn.disabled = true;
          btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
          await api.rejectHours(id);
          showToast(`ปฏิเสธรายการลงทะเบียน ${id} เรียบร้อยแล้ว`, 'info');
          await loadAllData();
          renderAdminTables();
          autoDriveBackup('hours_rejection');
        });
      });

      document.querySelectorAll('.inspect-staff-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
          const sid = e.currentTarget.getAttribute('data-id');
          openStaffInspectorModal(sid);
        });
      });

      // Update selection count for Admin Table
      const updateAdminBulkCount = () => {
        const checkedBoxes = Array.from(document.querySelectorAll('.admin-select-reg-check:checked'));
        const count = checkedBoxes.length;

        const badge = document.getElementById('selectedAdminRegCountBadge');
        const approveBtn = document.getElementById('bulkApproveHrsBtn');
        const rejectBtn = document.getElementById('bulkRejectHrsBtn');
        const selectAllCheck = document.getElementById('selectAllAdminApproveCheck');
        const headerCheck = document.getElementById('headerAdminSelectAllCheck');

        if (badge) badge.textContent = `เลือก ${count} รายการ`;
        document.querySelectorAll('.admin-bulk-count-num').forEach(el => el.textContent = count);

        [approveBtn, rejectBtn].forEach(btn => {
          if (btn) {
            btn.disabled = count === 0;
            btn.style.opacity = count === 0 ? '0.5' : '1';
          }
        });

        const allCheckboxes = Array.from(document.querySelectorAll('.admin-select-reg-check'));
        const isAllChecked = allCheckboxes.length > 0 && allCheckboxes.every(cb => cb.checked);
        const isSomeChecked = allCheckboxes.some(cb => cb.checked);

        [selectAllCheck, headerCheck].forEach(chk => {
          if (chk) {
            chk.checked = isAllChecked;
            chk.indeterminate = !isAllChecked && isSomeChecked;
          }
        });
      };

      document.querySelectorAll('.admin-select-reg-check').forEach(chk => {
        chk.addEventListener('change', updateAdminBulkCount);
      });

      updateAdminBulkCount();
    }

    // GLOBAL LISTENERS FOR ADMIN BULK ACTIONS (APPROVAL DASHBOARD)
    ['selectAllAdminApproveCheck', 'headerAdminSelectAllCheck'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          const isChecked = e.target.checked;
          document.querySelectorAll('.admin-select-reg-check').forEach(cb => {
            cb.checked = isChecked;
          });
          const event = new Event('change');
          const firstChk = document.querySelector('.admin-select-reg-check');
          if (firstChk) firstChk.dispatchEvent(event);
        });
      }
    });

    const bulkApproveHrsBtn = document.getElementById('bulkApproveHrsBtn');
    if (bulkApproveHrsBtn) {
      bulkApproveHrsBtn.addEventListener('click', async () => {
        const checkedBoxes = Array.from(document.querySelectorAll('.admin-select-reg-check:checked'));
        const selectedIds = checkedBoxes.map(cb => cb.value);
        if (selectedIds.length === 0) return;

        if (confirm(`คุณต้องการอนุมัติชั่วโมงกิจกรรมให้กับรายการที่เลือกจำนวน ${selectedIds.length} รายการ ใช่หรือไม่?`)) {
          bulkApproveHrsBtn.disabled = true;
          bulkApproveHrsBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังอนุมัติ (${selectedIds.length})...`;

          await api.bulkApproveHours(selectedIds);
          showToast(`✅ อนุมัติชั่วโมงกิจกรรมสำเร็จรวม ${selectedIds.length} รายการ!`, 'success');
          await loadAllData();
          renderAdminTables();
          renderRegistrationsListTable();
          autoDriveBackup('bulk_hours_approval');
        }
      });
    }

    const bulkRejectHrsBtn = document.getElementById('bulkRejectHrsBtn');
    if (bulkRejectHrsBtn) {
      bulkRejectHrsBtn.addEventListener('click', async () => {
        const checkedBoxes = Array.from(document.querySelectorAll('.admin-select-reg-check:checked'));
        const selectedIds = checkedBoxes.map(cb => cb.value);
        if (selectedIds.length === 0) return;

        if (confirm(`คุณต้องการปฏิเสธรายการลงทะเบียนที่เลือกจำนวน ${selectedIds.length} รายการ ใช่หรือไม่?`)) {
          bulkRejectHrsBtn.disabled = true;
          bulkRejectHrsBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก (${selectedIds.length})...`;

          await api.bulkRejectHours(selectedIds);
          showToast(`❌ ปฏิเสธรายการลงทะเบียนสำเร็จรวม ${selectedIds.length} รายการ`, 'info');
          await loadAllData();
          renderAdminTables();
          renderRegistrationsListTable();
          autoDriveBackup('bulk_hours_rejection');
        }
      });
    }

    // GLOBAL LISTENERS FOR REGISTRATIONS MODAL BULK ACTIONS
    ['selectAllModalRegsCheck', 'headerModalRegsSelectAllCheck'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          const isChecked = e.target.checked;
          document.querySelectorAll('.modal-select-reg-check').forEach(cb => {
            cb.checked = isChecked;
          });
          const event = new Event('change');
          const firstChk = document.querySelector('.modal-select-reg-check');
          if (firstChk) firstChk.dispatchEvent(event);
        });
      }
    });

    const bulkApproveModalRegsBtn = document.getElementById('bulkApproveModalRegsBtn');
    if (bulkApproveModalRegsBtn) {
      bulkApproveModalRegsBtn.addEventListener('click', async () => {
        const checkedBoxes = Array.from(document.querySelectorAll('.modal-select-reg-check:checked'));
        const selectedIds = checkedBoxes.map(cb => cb.value);
        if (selectedIds.length === 0) return;

        if (confirm(`คุณต้องการอนุมัติรายการที่เลือกจำนวน ${selectedIds.length} รายการ ใช่หรือไม่?`)) {
          bulkApproveModalRegsBtn.disabled = true;
          bulkApproveModalRegsBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังอนุมัติ (${selectedIds.length})...`;

          await api.bulkApproveHours(selectedIds);
          showToast(`✅ อนุมัติชั่วโมงกิจกรรมสำเร็จรวม ${selectedIds.length} รายการ!`, 'success');
          await loadAllData();
          renderAdminTables();
          renderRegistrationsListTable();
          autoDriveBackup('bulk_modal_hours_approval');
        }
      });
    }

    const bulkRejectModalRegsBtn = document.getElementById('bulkRejectModalRegsBtn');
    if (bulkRejectModalRegsBtn) {
      bulkRejectModalRegsBtn.addEventListener('click', async () => {
        const checkedBoxes = Array.from(document.querySelectorAll('.modal-select-reg-check:checked'));
        const selectedIds = checkedBoxes.map(cb => cb.value);
        if (selectedIds.length === 0) return;

        if (confirm(`คุณต้องการปฏิเสธรายการที่เลือกจำนวน ${selectedIds.length} รายการ ใช่หรือไม่?`)) {
          bulkRejectModalRegsBtn.disabled = true;
          bulkRejectModalRegsBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก (${selectedIds.length})...`;

          await api.bulkRejectHours(selectedIds);
          showToast(`❌ ปฏิเสธรายการลงทะเบียนสำเร็จรวม ${selectedIds.length} รายการ`, 'info');
          await loadAllData();
          renderAdminTables();
          renderRegistrationsListTable();
          autoDriveBackup('bulk_modal_hours_rejection');
        }
      });
    }

    const bulkDeleteModalRegsBtn = document.getElementById('bulkDeleteModalRegsBtn');
    if (bulkDeleteModalRegsBtn) {
      bulkDeleteModalRegsBtn.addEventListener('click', async () => {
        const checkedBoxes = Array.from(document.querySelectorAll('.modal-select-reg-check:checked'));
        const selectedIds = checkedBoxes.map(cb => cb.value);
        if (selectedIds.length === 0) return;

        if (confirm(`คุณต้องการลบรายการลงทะเบียนที่เลือกจำนวน ${selectedIds.length} รายการ ใช่หรือไม่?\n(ข้อมูลจะถูกลบออกจากตาราง Google Sheets อัตโนมัติ)`)) {
          bulkDeleteModalRegsBtn.disabled = true;
          bulkDeleteModalRegsBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังลบ (${selectedIds.length})...`;

          await api.bulkDeleteRegistrations(selectedIds);
          showToast(`🗑️ ลบรายการลงทะเบียนสำเร็จรวม ${selectedIds.length} รายการ`, 'success');
          await loadAllData();
          renderAdminTables();
          renderRegistrationsListTable();
          autoDriveBackup('bulk_modal_delete_registrations');
        }
      });
    }

    if (!backupTableBody) return;
    const backups = api.getBackups();
    backupTableBody.innerHTML = '';

    const recentBackups = backups.slice(0, 5);
    if (recentBackups.length === 0) {
      backupTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-gray); padding: 1.5rem;">ยังไม่มีประวัติการสำรองข้อมูล</td></tr>`;
    } else {
      recentBackups.forEach(b => {
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
    const iconClass = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-xmark' : (type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'));
    t.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => {
      t.classList.add('hide');
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }
});
