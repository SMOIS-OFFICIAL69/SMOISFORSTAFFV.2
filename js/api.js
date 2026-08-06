/**
 * API Bridge for Smo-Staff Activity Registration App
 * Supports CRUD (Create, Read, Update, Delete) for Activities, Staff Users, Admin Users, Registrations, and Hours Approvals
 */

const STORAGE_KEYS = {
  GAS_URL: 'smo_staff_gas_url',
  ACTIVITIES: 'smo_staff_activities',
  REGISTRATIONS: 'smo_staff_registrations',
  BACKUPS: 'smo_staff_backups',
  STAFF_USERS: 'smo_staff_users',
  ADMIN_USERS: 'smo_admin_users',
  CURRENT_STAFF: 'smo_current_staff',
  CURRENT_ADMIN: 'smo_current_admin'
};

// Helper: Convert Google Drive Share Link to Direct Displayable Image URL
function convertDriveUrlToDirectLink(url) {
  if (!url) return '';
  url = url.trim();
  const match = url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return url;
}

// Seed Staff Users
const SEED_STAFF_USERS = [
  {
    studentId: '673450351-6',
    fullName: 'นายอภินันท์ คำดี',
    major: 'ภาษาอังกฤษเพื่อการสื่อสารธุรกิจ',
    year: 'ชั้นปีที่ 3',
    department: 'สโมสรนักศึกษา',
    position: 'ประธานฝ่ายกิจกรรม',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    targetHours: 200
  },
  {
    studentId: '673450388-9',
    fullName: 'นางสาววิภาดา เรียนดี',
    major: 'เทคโนโลยีสารสนเทศ',
    year: 'ชั้นปีที่ 2',
    department: 'ฝ่ายประชาสัมพันธ์',
    position: 'เจ้าหน้าที่สารสนเทศ',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    targetHours: 200
  }
];

// Seed Admin Users
const SEED_ADMIN_USERS = [
  {
    username: 'admin',
    password: 'admin123',
    fullName: 'นายวิชัย รักชาติ',
    position: 'หัวหน้างานบริการนักศึกษาและกิจกรรมองค์กร',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    role: 'Super Admin'
  },
  {
    username: 'staff01',
    password: 'password123',
    fullName: 'นางสาวสมใจ นามดี',
    position: 'เจ้าหน้าที่บริหารงานทั่วไป',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    role: 'Admin'
  }
];

// Seed Activities
const SEED_ACTIVITIES = [
  {
    id: 'ACT-2026-001',
    title: 'อบรมเชิงปฏิบัติการ: ทักษะการจัดการงานเอกสารและดิจิทัลสำหรับผู้ปฏิบัติงาน',
    category: 'อบรม',
    description: 'พัฒนาทักษะการใช้งานเครื่องมือ Google Workspace, AI Assistants และระบบงานสารบรรณอิเล็กทรอนิกส์ในยุคดิจิทัล',
    date: '2026-08-15',
    time: '09:00 - 16:00 น.',
    location: 'ห้องประชุมอัจฉริยะ ชั้น 4 อาคารอำนวยการ',
    maxQuota: 50,
    registeredCount: 38,
    hours: 6,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ACT-2026-002',
    title: 'กิจกรรมบิ๊กคลีนนิ่งเดย์และปรับปรุงทัศนียภาพพื้นที่ปฏิบัติงาน',
    category: 'จิตอาสา',
    description: 'ร่วมมือร่วมใจทำความสะอาด 5ส จัดระเบียบพื้นที่ทำงาน และปลูกต้นไม้เพิ่มพื้นที่สีเขียวในองค์กร',
    date: '2026-08-20',
    time: '08:30 - 12:00 น.',
    location: 'ลานกิจกรรมกลาง และ อาคารปฏิบัติงาน 1-3',
    maxQuota: 100,
    registeredCount: 100,
    hours: 4,
    status: 'full',
    banner: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ACT-2026-003',
    title: 'สัมมนาแลกเปลี่ยนเรียนรู้ (KM): การบริการด้วยใจและความปลอดภัยในการทำงาน',
    category: 'วิชาการ',
    description: 'แชร์ประสบการณ์ ตัวอย่างความสำเร็จ และทริคในการสื่อสารกับผู้รับบริการอย่างมืออาชีพ',
    date: '2026-08-28',
    time: '13:00 - 16:30 น.',
    location: 'หอประชุมใหญ่ ชั้น 2',
    maxQuota: 80,
    registeredCount: 42,
    hours: 3,
    status: 'open',
    banner: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80'
  }
];

// Seed Registrations
const SEED_REGISTRATIONS = [
  {
    regId: 'REG-1786009414461',
    timestamp: '2026-08-01 10:15:20',
    staffId: '673450351-6',
    staffName: 'นายอภินันท์ คำดี',
    major: 'ภาษาอังกฤษเพื่อการสื่อสารธุรกิจ',
    department: 'สโมสรนักศึกษา',
    position: 'ประธานฝ่ายกิจกรรม',
    activityId: 'ACT-2026-001',
    activityTitle: 'One Journey วันเจอนี่',
    baseHours: 6,
    earnedHours: 0,
    status: 'pending',
    checkInTime: null
  },
  {
    regId: 'REG-1786001024881',
    timestamp: '2026-08-02 14:22:10',
    staffId: '673450351-6',
    staffName: 'นายอภินันท์ คำดี',
    major: 'ภาษาอังกฤษเพื่อการสื่อสารธุรกิจ',
    department: 'สโมสรนักศึกษา',
    position: 'ประธานฝ่ายกิจกรรม',
    activityId: 'ACT-2026-002',
    activityTitle: 'โครงการปฏิบัติธรรมในวันธรรมสวนะ ประจำปี 2569',
    baseHours: 2,
    earnedHours: 2,
    status: 'approved',
    checkInTime: '2026-08-06 09:05:00'
  }
];

const SEED_BACKUPS = [
  {
    backupId: 'DRV-BAK-20260805',
    timestamp: '2026-08-05 23:59:00',
    fileName: 'SmoStaff_Backup_2026-08-05.json',
    fileUrl: 'https://drive.google.com/',
    recordCount: 2,
    status: 'success'
  }
];

class SmoStaffAPI {
  constructor() {
    this.initLocalStorage();
  }

  getGasUrl() {
    return localStorage.getItem(STORAGE_KEYS.GAS_URL) || '';
  }

  setGasUrl(url) {
    localStorage.setItem(STORAGE_KEYS.GAS_URL, url.trim());
  }

  initLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(SEED_ACTIVITIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(SEED_REGISTRATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BACKUPS)) {
      localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(SEED_BACKUPS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STAFF_USERS)) {
      localStorage.setItem(STORAGE_KEYS.STAFF_USERS, JSON.stringify(SEED_STAFF_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_USERS)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(SEED_ADMIN_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_STAFF)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STAFF, JSON.stringify(SEED_STAFF_USERS[0]));
    }
  }

  // --- AUTHENTICATION & USERS ---
  getStaffUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF_USERS) || '[]');
  }

  getAdminUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_USERS) || '[]');
  }

  getCurrentStaff() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_STAFF) || 'null') || SEED_STAFF_USERS[0];
  }

  setCurrentStaff(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STAFF, JSON.stringify(user));
  }

  getCurrentAdmin() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN) || 'null');
  }

  setCurrentAdmin(admin) {
    if (admin) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(admin));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    }
  }

  loginStaff(studentId) {
    const staffList = this.getStaffUsers();
    const found = staffList.find(s => s.studentId.trim() === studentId.trim());
    if (found) {
      this.setCurrentStaff(found);
      return { success: true, user: found };
    }

    const newUser = {
      studentId: studentId.trim(),
      fullName: 'ผู้ปฏิบัติงานกิจกรรม',
      major: 'สาขาวิชาทั่วไป',
      year: 'ชั้นปีที่ 1',
      department: 'สโมสรนักศึกษา',
      position: 'ผู้ปฏิบัติงานกิจกรรม',
      avatar: '',
      targetHours: 200
    };
    this.createStaffUser(newUser);
    this.setCurrentStaff(newUser);
    return { success: true, user: newUser };
  }

  loginAdmin(username, password) {
    const adminList = this.getAdminUsers();
    const found = adminList.find(a => a.username.trim() === username.trim() && a.password === password);
    if (found) {
      this.setCurrentAdmin(found);
      return { success: true, admin: found };
    }
    return { success: false, message: 'ชื่อผู้ใช้งานหรือรหัสผ่านแอดมินไม่ถูกต้อง' };
  }

  createStaffUser(userData) {
    userData.avatar = convertDriveUrlToDirectLink(userData.avatar);
    const list = this.getStaffUsers();
    list.unshift(userData);
    localStorage.setItem(STORAGE_KEYS.STAFF_USERS, JSON.stringify(list));
    return userData;
  }

  updateStaffUser(studentId, updatedData) {
    const list = this.getStaffUsers();
    const idx = list.findIndex(s => s.studentId === studentId);
    if (idx !== -1) {
      updatedData.avatar = convertDriveUrlToDirectLink(updatedData.avatar);
      list[idx] = { ...list[idx], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.STAFF_USERS, JSON.stringify(list));

      const curr = this.getCurrentStaff();
      if (curr && curr.studentId === studentId) {
        this.setCurrentStaff(list[idx]);
      }
      return { success: true, user: list[idx] };
    }
    return { success: false };
  }

  deleteStaffUser(studentId) {
    let list = this.getStaffUsers();
    list = list.filter(s => s.studentId !== studentId);
    localStorage.setItem(STORAGE_KEYS.STAFF_USERS, JSON.stringify(list));
    return { success: true };
  }

  createAdminUser(adminData) {
    adminData.avatar = convertDriveUrlToDirectLink(adminData.avatar);
    const list = this.getAdminUsers();
    list.unshift(adminData);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(list));
    return adminData;
  }

  deleteAdminUser(username) {
    let list = this.getAdminUsers();
    list = list.filter(a => a.username !== username);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(list));
    return { success: true };
  }

  // --- ACTIVITIES CRUD ---
  async getActivities() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
  }

  async createActivity(activityData) {
    activityData.banner = convertDriveUrlToDirectLink(activityData.banner);
    const activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
    const newAct = {
      id: 'ACT-2026-' + String(activities.length + 1).padStart(3, '0'),
      ...activityData,
      registeredCount: 0,
      status: 'open'
    };
    activities.unshift(newAct);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    return newAct;
  }

  updateActivity(id, updatedData) {
    const activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
    const idx = activities.findIndex(a => a.id === id);
    if (idx !== -1) {
      updatedData.banner = convertDriveUrlToDirectLink(updatedData.banner);
      activities[idx] = { ...activities[idx], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
      return { success: true, activity: activities[idx] };
    }
    return { success: false };
  }

  deleteActivity(id) {
    let activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
    activities = activities.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    return { success: true };
  }

  // --- REGISTRATIONS CRUD ---
  async getRegistrations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
  }

  async registerStaff(registrationData) {
    const regId = 'REG-' + Math.floor(1000000000000 + Math.random() * 9000000000000);
    const nowStr = new Date().toLocaleString('sv-SE');

    const newRecord = {
      regId,
      timestamp: nowStr,
      staffId: registrationData.staffId,
      staffName: registrationData.staffName,
      major: registrationData.major || 'สาขาวิชาทั่วไป',
      department: registrationData.department,
      position: registrationData.position || 'ผู้ปฏิบัติงานกิจกรรม',
      activityId: registrationData.activityId,
      activityTitle: registrationData.activityTitle,
      baseHours: registrationData.hours || 3,
      earnedHours: 0,
      status: 'pending',
      checkInTime: null
    };

    const registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
    registrations.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));

    const activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
    const targetAct = activities.find(a => a.id === registrationData.activityId);
    if (targetAct) {
      targetAct.registeredCount = (targetAct.registeredCount || 0) + 1;
      if (targetAct.registeredCount >= targetAct.maxQuota) targetAct.status = 'full';
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    }

    return { success: true, record: newRecord };
  }

  async approveHours(regId) {
    const nowStr = new Date().toLocaleString('sv-SE');
    const registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
    const rec = registrations.find(r => r.regId === regId);
    if (rec) {
      rec.status = 'approved';
      rec.earnedHours = rec.baseHours || 3;
      rec.checkInTime = nowStr;
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
      return { success: true, record: rec };
    }
    return { success: false };
  }

  async rejectHours(regId) {
    const registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
    const rec = registrations.find(r => r.regId === regId);
    if (rec) {
      rec.status = 'rejected';
      rec.earnedHours = 0;
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
      return { success: true };
    }
    return { success: false };
  }

  deleteRegistration(regId) {
    let registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
    registrations = registrations.filter(r => r.regId !== regId);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    return { success: true };
  }

  async triggerDriveBackup() {
    const nowStr = new Date().toLocaleString('sv-SE');
    const backupId = 'DRV-BAK-' + Date.now().toString().slice(-8);

    const registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
    const activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
    
    const backupPayload = {
      exportTimestamp: nowStr,
      system: 'Smo-Staff Registration System',
      activitiesCount: activities.length,
      registrationsCount: registrations.length,
      activities,
      registrations
    };

    const backupRecord = {
      backupId,
      timestamp: nowStr,
      fileName: `SmoStaff_Backup_${new Date().toISOString().split('T')[0]}.json`,
      fileUrl: '#',
      recordCount: registrations.length,
      status: 'success'
    };

    const backups = JSON.parse(localStorage.getItem(STORAGE_KEYS.BACKUPS) || '[]');
    backups.unshift(backupRecord);
    localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(backups));

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = backupRecord.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { success: true, backupId, fileName: backupRecord.fileName, mode: 'local_download' };
  }

  exportCSVReport() {
    const registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
    let csv = '\uFEFF';
    csv += 'รหัสลงทะเบียน,รหัสผู้ปฏิบัติงาน,ชื่อ-นามสกุล,สาขาวิชา,สังกัด,กิจกรรม,ชั่วโมงฐาน,ชั่วโมงที่ได้รับ,สถานะ,วันเวลาเช็คอิน\n';
    
    registrations.forEach(r => {
      csv += `"${r.regId}","${r.staffId}","${r.staffName}","${r.major || ''}","${r.department}","${r.activityTitle}",${r.baseHours || 3},${r.earnedHours || 0},"${r.status}","${r.checkInTime || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmoStaff_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  getBackups() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BACKUPS) || '[]');
  }
}

const api = new SmoStaffAPI();
