/**
 * ==============================================================================
 * SMO-STAFF ACTIVITY REGISTRATION & GOOGLE DRIVE BACKUP BACKEND (Code.gs)
 * ==============================================================================
 * Google Apps Script Backend for Google Sheets Database & Drive Auto-Backup Service
 * 
 * Auto-creates dedicated organized folder path in Google Drive:
 * Google Drive > SMOIS-WEB > KKU_FIS_StudentUnion_Backup
 * 
 * Generates exact files as required:
 * 1. latest_system_state.json (Overwritten with latest snapshot)
 * 2. backup_state_YYYY-MM-DD_HH-mm-ss.json (Historical timestamped backups)
 * 
 * Supported Sheets:
 * - Activities
 * - Registrations
 * - StaffUsers
 * - AdminUsers
 * - Backups
 */

const CONFIG = {
  PARENT_FOLDER_NAME: 'SMOIS-WEB',                     // โฟลเดอร์หลักใน Google Drive
  SUB_FOLDER_NAME: 'KKU_FIS_StudentUnion_Backup',     // โฟลเดอร์ย่อยสำหรับเก็บไฟล์สำรองข้อมูล
  DRIVE_FOLDER_ID: '',                                 // ปล่อยว่างไว้เพื่อให้ระบบสร้างโฟลเดอร์ให้อัตโนมัติ
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
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'performGoogleDriveBackup') {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger('performGoogleDriveBackup')
    .timeBased()
    .everyDays(1)
    .atHour(1)
    .create();

  Logger.log('ตั้งค่าสำรองข้อมูลอัตโนมัติเข้า Google Drive สำเร็จแล้ว (รันทุกวัน เวลา 01:00 น.)');
}

/**
 * --- GET API ENDPOINTS (READS & FALLBACK MUTATIONS) ---
 */
function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : 'getActivities';
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
    } else if (action === 'approveHours') {
      const regId = e.parameter.regId;
      const checkInTime = e.parameter.checkInTime || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
      const result = approveHoursRecord(regId, checkInTime);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'unapproveHours') {
      const regId = e.parameter.regId;
      const result = unapproveHoursRecord(regId);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'deleteRegistration') {
      const regId = e.parameter.regId;
      const result = deleteRegistrationRecord(regId);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'deleteActivity') {
      const id = e.parameter.id;
      const result = deleteActivityRecord(id);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'deleteStaffUser') {
      const studentId = e.parameter.studentId;
      const result = deleteStaffUserRecord(studentId);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'deleteAdminUser') {
      const username = e.parameter.username;
      const result = deleteAdminUserRecord(username);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    }
  } catch (err) {
    responseData = { status: 'error', message: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * --- POST API ENDPOINTS (MUTATIONS, APPROVALS & DELETIONS) ---
 */
function doPost(e) {
  let responseData = { status: 'error', message: 'Invalid Request' };

  try {
    let postData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        postData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      postData = e.parameter;
    }

    const action = postData.action;

    if (action === 'registerStaff') {
      const result = saveRegistration(postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'approveHours') {
      const result = approveHoursRecord(postData.regId, postData.checkInTime);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'unapproveHours') {
      const result = unapproveHoursRecord(postData.regId);
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
    } else if (action === 'deleteActivity') {
      const result = deleteActivityRecord(postData.id || postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'deleteStaffUser') {
      const result = deleteStaffUserRecord(postData.studentId || postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'deleteAdminUser') {
      const result = deleteAdminUserRecord(postData.username || postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'deleteRegistration') {
      const result = deleteRegistrationRecord(postData.regId || postData.data);
      performGoogleDriveBackup();
      responseData = { status: 'success', result: result };
    } else if (action === 'createDriveBackup') {
      const backupResult = performGoogleDriveBackup(postData.data);
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
 * Auto-creates dedicated organized folder path in Drive:
 * Google Drive > SMOIS-WEB > KKU_FIS_StudentUnion_Backup
 */
function performGoogleDriveBackup(clientPayload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activities = (clientPayload && clientPayload.activities) || getActivitiesData();
  const registrations = (clientPayload && clientPayload.registrations) || getRegistrationsData();
  const staffUsers = (clientPayload && clientPayload.staffUsers) || getStaffUsersData();
  const adminUsers = (clientPayload && clientPayload.adminUsers) || getAdminUsersData();

  const now = new Date();
  const timeStr = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm-ss');
  const backupId = 'DRV-BAK-' + Date.now().toString().slice(-8);

  const timestampedFileName = `backup_state_${timeStr}.json`;
  const latestFileName = 'latest_system_state.json';

  const backupContent = {
    backupId: backupId,
    timestamp: now.toISOString(),
    system: 'Smo-Staff Activity Registration System (KKU_FIS_StudentUnion)',
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

  const jsonString = JSON.stringify(backupContent, null, 2);
  let fileUrl = '#';

  try {
    let folder = getTargetDriveFolder();

    // 1. Create / Overwrite latest_system_state.json
    const existingLatestFiles = folder.getFilesByName(latestFileName);
    if (existingLatestFiles.hasNext()) {
      const latestFile = existingLatestFiles.next();
      latestFile.setContent(jsonString);
    } else {
      folder.createFile(latestFileName, jsonString, MimeType.PLAIN_TEXT);
    }

    // 2. Create Historical Timestamped Backup File backup_state_YYYY-MM-DD_HH-mm-ss.json
    const timeFile = folder.createFile(timestampedFileName, jsonString, MimeType.PLAIN_TEXT);
    fileUrl = timeFile.getUrl();

  } catch (e) {
    Logger.log('Drive Backup Error: ' + e.toString());
  }

  // Record log in Backups Sheet
  const backupSheet = getOrCreateSheet(CONFIG.SHEET_BACKUPS, ['BackupID', 'Timestamp', 'FileName', 'FileUrl', 'RecordCount', 'Status']);
  backupSheet.appendRow([backupId, timeStr, timestampedFileName, fileUrl, registrations.length, 'success']);

  return { backupId, fileName: timestampedFileName, fileUrl };
}

/**
 * Get or Create Dedicated Backup Folder Structure:
 * Google Drive > SMOIS-WEB > KKU_FIS_StudentUnion_Backup
 */
function getTargetDriveFolder() {
  if (CONFIG.DRIVE_FOLDER_ID && CONFIG.DRIVE_FOLDER_ID.trim() !== '') {
    try {
      return DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID.trim());
    } catch (e) {
      Logger.log('Folder ID search error: ' + e.toString());
    }
  }

  // 1. Parent Folder: "SMOIS-WEB"
  const parentName = CONFIG.PARENT_FOLDER_NAME || 'SMOIS-WEB';
  let parentFolder;
  const parentFolders = DriveApp.getFoldersByName(parentName);
  if (parentFolders.hasNext()) {
    parentFolder = parentFolders.next();
  } else {
    parentFolder = DriveApp.createFolder(parentName);
  }

  // 2. Subfolder: "KKU_FIS_StudentUnion_Backup" inside "SMOIS-WEB"
  const subFolderName = CONFIG.SUB_FOLDER_NAME || 'KKU_FIS_StudentUnion_Backup';
  const subFolders = parentFolder.getFoldersByName(subFolderName);
  if (subFolders.hasNext()) {
    return subFolders.next();
  } else {
    return parentFolder.createFolder(subFolderName);
  }
}

/**
 * --- DATA READ OPERATIONS ---
 */
function getActivitiesData() {
  const sheet = getOrCreateSheet(CONFIG.SHEET_ACTIVITIES, ['ID', 'Title', 'Category', 'Description', 'Date', 'Time', 'Location', 'MaxQuota', 'RegisteredCount', 'Hours', 'Status', 'Banner']);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  // Calculate live registration counts from Registrations sheet
  const regSheet = getOrCreateSheet(CONFIG.SHEET_REGISTRATIONS, ['RegID', 'Timestamp', 'StaffID', 'StaffName', 'Major', 'Department', 'Position', 'ActivityID', 'ActivityTitle', 'BaseHours', 'EarnedHours', 'Status', 'CheckInTime']);
  const regRows = regSheet.getDataRange().getValues();
  const countMap = {};
  if (regRows.length > 1) {
    for (let r = 1; r < regRows.length; r++) {
      const actId = String(regRows[r][7]);
      countMap[actId] = (countMap[actId] || 0) + 1;
    }
  }

  return rows.slice(1).map(row => {
    const actId = String(row[0]);
    const liveCount = countMap[actId] !== undefined ? countMap[actId] : Number(row[8] || 0);
    return {
      id: actId,
      title: String(row[1]),
      category: String(row[2]),
      description: String(row[3]),
      date: row[4] instanceof Date ? Utilities.formatDate(row[4], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(row[4]),
      time: String(row[5]),
      location: String(row[6]),
      maxQuota: Number(row[7]),
      registeredCount: liveCount,
      hours: Number(row[9] || 3),
      status: String(row[10]),
      banner: String(row[11])
    };
  });
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

/**
 * --- DATA SAVE & APPROVAL OPERATIONS ---
 */
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
      sheet.getRange(i + 1, 13).setValue(checkInTime || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'));
      return true;
    }
  }
  return false;
}

function unapproveHoursRecord(regId) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_REGISTRATIONS, ['RegID', 'Timestamp', 'StaffID', 'StaffName', 'Major', 'Department', 'Position', 'ActivityID', 'ActivityTitle', 'BaseHours', 'EarnedHours', 'Status', 'CheckInTime']);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(regId)) {
      sheet.getRange(i + 1, 11).setValue(0);          // EarnedHours = 0
      sheet.getRange(i + 1, 12).setValue('pending');  // Status = pending
      sheet.getRange(i + 1, 13).setValue('');         // CheckInTime = empty
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

/**
 * --- DATA AUTOMATED DELETE OPERATIONS FROM GOOGLE SHEETS ---
 */
function deleteActivityRecord(id) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_ACTIVITIES, ['ID', 'Title', 'Category', 'Description', 'Date', 'Time', 'Location', 'MaxQuota', 'RegisteredCount', 'Hours', 'Status', 'Banner']);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function deleteStaffUserRecord(studentId) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_STAFF, ['StudentID', 'FullName', 'Major', 'Year', 'Department', 'Position', 'TargetHours']);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(studentId)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function deleteAdminUserRecord(username) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_ADMIN, ['Username', 'Password', 'FullName', 'Position', 'Role']);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(username)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function deleteRegistrationRecord(regId) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_REGISTRATIONS, ['RegID', 'Timestamp', 'StaffID', 'StaffName', 'Major', 'Department', 'Position', 'ActivityID', 'ActivityTitle', 'BaseHours', 'EarnedHours', 'Status', 'CheckInTime']);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(regId)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

/**
 * --- HELPER: GET OR CREATE SHEET WITH STYLED HEADERS ---
 */
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
