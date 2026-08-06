/**
 * ==============================================================================
 * SMO-STAFF ACTIVITY REGISTRATION & GOOGLE DRIVE BACKUP BACKEND (Code.gs)
 * ==============================================================================
 * Google Apps Script for Google Sheets Database & Automated Drive Backup Service
 * 
 * Sheets Supported:
 * - Activities
 * - Registrations
 * - StaffUsers
 * - AdminUsers
 * - Backups
 */

const CONFIG = {
  DRIVE_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE', // เช่น '1A2b3C4d5E6f7G8h9I0j'
  SHEET_ACTIVITIES: 'Activities',
  SHEET_REGISTRATIONS: 'Registrations',
  SHEET_STAFF: 'StaffUsers',
  SHEET_ADMIN: 'AdminUsers',
  SHEET_BACKUPS: 'Backups'
};

/**
 * --- AUTOMATED TIME-DRIVEN TRIGGER SETUP ---
 * เรียกใช้งานฟังก์ชันนี้ 1 ครั้งใน Apps Script Editor เพื่อตั้งค่าสำรองข้อมูลเข้า Google Drive อัตโนมัติทุกวัน
 */
function setupAutomatedDailyDriveBackupTrigger() {
  // ลบ Trigger เก่าที่ซ้ำซ้อนออกก่อน
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'performGoogleDriveBackup') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // สร้าง Time-Driven Trigger ใหม่ สำรองข้อมูลทุกวัน เวลา 01:00 น.
  ScriptApp.newTrigger('performGoogleDriveBackup')
    .timeBased()
    .everyDays(1)
    .atHour(1)
    .create();

  Logger.log('ตั้งค่าสำรองข้อมูลอัตโนมัติเข้า Google Drive สำเร็จแล้ว (รันทุกวัน เวลา 01:00 น.)');
}

function doGet(e) {
  const action = e.parameter.action || 'getActivities';
  let responseData = { status: 'error', message: 'Invalid Action' };

  try {
    if (action === 'getActivities') {
      responseData = { status: 'success', data: getActivitiesData() };
    } else if (action === 'getRegistrations') {
      responseData = { status: 'success', data: getRegistrationsData() };
    } else if (action === 'getStaffUsers') {
      responseData = { status: 'success', data: getStaffUsersData() };
    } else if (action === 'getAdminUsers') {
      responseData = { status: 'success', data: getAdminUsersData() };
    } else if (action === 'getBackups') {
      responseData = { status: 'success', data: getBackupsData() };
    }
  } catch (err) {
    responseData = { status: 'error', message: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let responseData = { status: 'error', message: 'Invalid Request' };

  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;

    if (action === 'registerStaff') {
      const result = saveRegistration(postData.data);
      // Auto Backup into Drive after registration
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'approveHours') {
      const result = approveHoursRecord(postData.regId, postData.checkInTime);
      // Auto Backup into Drive after hours approval
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'createActivity') {
      const result = saveActivity(postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'createStaffUser') {
      const result = saveStaffUser(postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'createAdminUser') {
      const result = saveAdminUser(postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'createDriveBackup') {
      const backupResult = performGoogleDriveBackup();
      responseData = { 
        status: 'success', 
        backupId: backupResult.backupId, 
        fileName: backupResult.fileName,
        fileUrl: backupResult.fileUrl 
      };
    }
  } catch (err) {
    responseData = { status: 'error', message: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * --- GOOGLE DRIVE BACKUP ENGINE ---
 */
function performGoogleDriveBackup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activities = getActivitiesData();
  const registrations = getRegistrationsData();
  const staffUsers = getStaffUsersData();
  const adminUsers = getAdminUsersData();

  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm-ss');
  const backupId = 'DRV-BAK-' + Date.now().toString().slice(-8);
  const fileName = `SmoStaff_Backup_${timestamp}.json`;

  const backupContent = {
    backupId: backupId,
    timestamp: new Date().toISOString(),
    system: 'Smo-Staff Activity Registration System',
    spreadsheetId: ss.getId(),
    summary: {
      totalActivities: activities.length,
      totalRegistrations: registrations.length,
      totalStaffUsers: staffUsers.length,
      totalAdminUsers: adminUsers.length
    },
    data: {
      activities,
      registrations,
      staffUsers,
      adminUsers
    }
  };

  let fileUrl = '#';
  try {
    let folder;
    if (CONFIG.DRIVE_FOLDER_ID && CONFIG.DRIVE_FOLDER_ID !== 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE') {
      folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
    } else {
      folder = DriveApp.getRootFolder();
    }

    const file = folder.createFile(fileName, JSON.stringify(backupContent, null, 2), MimeType.PLAIN_TEXT);
    fileUrl = file.getUrl();
  } catch (e) {
    Logger.log('Drive Folder Error: ' + e.toString());
  }

  const backupSheet = getOrCreateSheet(CONFIG.SHEET_BACKUPS, ['BackupID', 'Timestamp', 'FileName', 'FileUrl', 'RecordCount', 'Status']);
  backupSheet.appendRow([backupId, timestamp, fileName, fileUrl, registrations.length, 'success']);

  return { backupId, fileName, fileUrl };
}

/**
 * --- HELPERS ---
 */
function getActivitiesData() {
  const sheet = getOrCreateSheet(CONFIG.SHEET_ACTIVITIES, ['ID', 'Title', 'Category', 'Description', 'Date', 'Time', 'Location', 'MaxQuota', 'RegisteredCount', 'Hours', 'Status', 'Banner']);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  return rows.slice(1).map(row => ({
    id: String(row[0]),
    title: String(row[1]),
    category: String(row[2]),
    description: String(row[3]),
    date: row[4] instanceof Date ? Utilities.formatDate(row[4], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(row[4]),
    time: String(row[5]),
    location: String(row[6]),
    maxQuota: Number(row[7]),
    registeredCount: Number(row[8]),
    hours: Number(row[9] || 3),
    status: String(row[10]),
    banner: String(row[11])
  }));
}

function getRegistrationsData() {
  const sheet = getOrCreateSheet(CONFIG.SHEET_REGISTRATIONS, ['RegID', 'Timestamp', 'StaffID', 'StaffName', 'Major', 'Department', 'Position', 'ActivityID', 'ActivityTitle', 'BaseHours', 'EarnedHours', 'Status', 'CheckInTime']);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  return rows.slice(1).map(row => ({
    regId: String(row[0]),
    timestamp: row[1] instanceof Date ? Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : String(row[1]),
    staffId: String(row[2]),
    staffName: String(row[3]),
    major: String(row[4]),
    department: String(row[5]),
    position: String(row[6]),
    activityId: String(row[7]),
    activityTitle: String(row[8]),
    baseHours: Number(row[9] || 3),
    earnedHours: Number(row[10] || 0),
    status: String(row[11]),
    checkInTime: row[12] ? (row[12] instanceof Date ? Utilities.formatDate(row[12], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : String(row[12])) : null
  }));
}

function getStaffUsersData() {
  const sheet = getOrCreateSheet(CONFIG.SHEET_STAFF, ['StudentID', 'FullName', 'Major', 'Year', 'Department', 'Position', 'TargetHours']);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  return rows.slice(1).map(row => ({
    studentId: String(row[0]),
    fullName: String(row[1]),
    major: String(row[2]),
    year: String(row[3]),
    department: String(row[4]),
    position: String(row[5]),
    targetHours: Number(row[6] || 200)
  }));
}

function getAdminUsersData() {
  const sheet = getOrCreateSheet(CONFIG.SHEET_ADMIN, ['Username', 'Password', 'FullName', 'Position', 'Role']);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  return rows.slice(1).map(row => ({
    username: String(row[0]),
    password: String(row[1]),
    fullName: String(row[2]),
    position: String(row[3]),
    role: String(row[4] || 'Admin')
  }));
}

function getBackupsData() {
  const sheet = getOrCreateSheet(CONFIG.SHEET_BACKUPS, ['BackupID', 'Timestamp', 'FileName', 'FileUrl', 'RecordCount', 'Status']);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  return rows.slice(1).map(row => ({
    backupId: String(row[0]),
    timestamp: row[1] instanceof Date ? Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : String(row[1]),
    fileName: String(row[2]),
    fileUrl: String(row[3]),
    recordCount: Number(row[4]),
    status: String(row[5])
  }));
}

function saveRegistration(data) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_REGISTRATIONS, ['RegID', 'Timestamp', 'StaffID', 'StaffName', 'Major', 'Department', 'Position', 'ActivityID', 'ActivityTitle', 'BaseHours', 'EarnedHours', 'Status', 'CheckInTime']);
  sheet.appendRow([data.regId, data.timestamp, data.staffId, data.staffName, data.major, data.department, data.position, data.activityId, data.activityTitle, data.baseHours || 3, 0, 'pending', '']);
  return true;
}

function approveHoursRecord(regId, checkInTime) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_REGISTRATIONS, ['RegID', 'Timestamp', 'StaffID', 'StaffName', 'Major', 'Department', 'Position', 'ActivityID', 'ActivityTitle', 'BaseHours', 'EarnedHours', 'Status', 'CheckInTime']);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(regId)) {
      const baseHrs = Number(rows[i][9] || 3);
      sheet.getRange(i + 1, 11).setValue(baseHrs);
      sheet.getRange(i + 1, 12).setValue('approved');
      sheet.getRange(i + 1, 13).setValue(checkInTime);
      return true;
    }
  }
  return false;
}

function saveActivity(data) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_ACTIVITIES, ['ID', 'Title', 'Category', 'Description', 'Date', 'Time', 'Location', 'MaxQuota', 'RegisteredCount', 'Hours', 'Status', 'Banner']);
  sheet.appendRow([data.id, data.title, data.category || 'กิจกรรม', data.description, data.date, data.time, data.location, data.maxQuota, 0, data.hours || 3, 'open', data.banner]);
  return true;
}

function saveStaffUser(data) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_STAFF, ['StudentID', 'FullName', 'Major', 'Year', 'Department', 'Position', 'TargetHours']);
  sheet.appendRow([data.studentId, data.fullName, data.major, data.year, data.department, data.position, data.targetHours || 200]);
  return true;
}

function saveAdminUser(data) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_ADMIN, ['Username', 'Password', 'FullName', 'Position', 'Role']);
  sheet.appendRow([data.username, data.password, data.fullName, data.position, data.role || 'Admin']);
  return true;
}

function getOrCreateSheet(sheetName, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#1e3a8a').setFontColor('#ffffff');
  }
  return sheet;
}
