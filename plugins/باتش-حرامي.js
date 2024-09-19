import axios from 'axios';
import fs from 'fs';
import path from 'path';
import os from 'os';

const linkFilePath = './projectLink.json';

const downloadFileContent = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'text' });
    return response.data;
  } catch (error) {
    console.error('خطأ في جلب محتوى الملف:', error);
    throw error;
  }
};

const saveProjectLink = (link) => {
  fs.writeFileSync(linkFilePath, JSON.stringify({ link }));
};

const getProjectLink = () => {
  if (fs.existsSync(linkFilePath)) {
    return JSON.parse(fs.readFileSync(linkFilePath)).link;
  }
  return null;
};

const deleteProjectLink = () => {
  if (fs.existsSync(linkFilePath)) {
    fs.unlinkSync(linkFilePath);
  }
};

const getDefaultBranch = async (repoLink) => {
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const apiUrl = `https://api.github.com/repos/${repoPath}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.default_branch || 'master';
  } catch (error) {
    console.error('خطأ في جلب معلومات الفرع الافتراضي:', error);
    return 'master';
  }
};

const getFileUrl = (repoLink, fileName, folder) => {
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const defaultBranch = 'master';
   if (!folder) {
   return `https://raw.githubusercontent.com/${repoPath}/${defaultBranch}/${fileName}`;
   } else {
   return `https://raw.githubusercontent.com/${repoPath}/${defaultBranch}/${folder}/${fileName}`;
   }
};



const listFilesInFolder = async (repoLink, folder) => {

  let apiUrl;
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const defaultBranch = await getDefaultBranch(repoLink);
  
  if (!folder) {
  apiUrl = `https://api.github.com/repos/${repoPath}/contents/?ref=${defaultBranch}`;
  } else {
  apiUrl = `https://api.github.com/repos/${repoPath}/contents/${folder}?ref=${defaultBranch}`;
  }

  try {
    const response = await axios.get(apiUrl);
    return response.data.map(file => file.name);
  } catch (error) {
    console.error(`خطأ في جلب قائمة الملفات من مجلد ${folder}:`, error);
    return [];
  }
};

const folderExists = async (repoLink, folder) => {
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const defaultBranch = await getDefaultBranch(repoLink);
  const apiUrl = `https://api.github.com/repos/${repoPath}/contents/${folder}?ref=${defaultBranch}`;

  try {
    const response = await axios.get(apiUrl);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const handleFileDownloadAndSend = async (m, conn, fileUrl, fileName, imgUrl) => {
  let msg = 'جاري تحميل ومعالجة الملف، يرجى الانتظار...';
  await conn.sendMessage(m.chat, { image: { url: imgUrl }, caption: msg, mentions: [m.sender] }, { quoted: m });

  try {
    const fileContent = await downloadFileContent(fileUrl);
    await conn.sendMessage(m.chat, { text: fileContent }, { quoted: m });

    const tempFilePath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(tempFilePath, fileContent);

    await conn.sendFile(m.chat, tempFilePath, fileName, '', m, { mimetype: 'application/javascript' });
    fs.unlinkSync(tempFilePath);

  } catch (error) {
    console.error('خطأ في تحميل أو معالجة الملف:', error);
    await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء تحميل أو معالجة الملف.' }, { quoted: m });
  }
};

const formatFileList = (files) => {
  if (files.length === 0) {
    return 'لم يتم العثور على ملفات.';
  }
  const header = `╭──────────────────╮\n│ قائمة الملفات المتاحة.\n│ عدد الملفات المتاحة: ${files.length}\n╰──────────────────╯`;
  const fileList = files.map((file, index) => `│ [${index + 1}] ${file}`).join('\n');
  return `${header}\n\n╭──────────────────╮\n${fileList}\n╰──────────────────╯`;
};

const isRepositoryPublic = async (repoLink) => {
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const apiUrl = `https://api.github.com/repos/${repoPath}`;

  try {
    const response = await axios.get(apiUrl);
    return !response.data.private;
  } catch (error) {
    console.error('خطأ في جلب معلومات المستودع:', error);
    return false;
  }
};

const handler = async (m, { conn, usedPrefix, command, text }) => {
  const projectLink = getProjectLink();

  if (command === 'res') {
    if (!text) return m.reply('يرجى تقديم رابط المشروع.');
    if (!text.startsWith('https://github.com/') || !text.endsWith('.git')) {
      return m.reply('الرابط يجب أن يكون رابط GitHub ينتهي بـ ".git".');
    }

    const isPublic = await isRepositoryPublic(text);
    if (!isPublic) return m.reply('الرابط يشير إلى مستودع خاص.');

    saveProjectLink(text);
    return m.reply('تم حفظ رابط المشروع بنجاح.');

  } else if (command === 'rev') {
    if (!projectLink) {
      return m.reply(`لم يتم تعيين رابط مشروع بعد. يرجى تعيين الرابط باستخدام الأمر ${usedPrefix}res <رابط>.`);
    }

    const branchroject = await getDefaultBranch(projectLink);
    const files = await listFilesInFolder(projectLink, 'plugins');
    const imgfiles = `https://image.thum.io/get/fullpage/${projectLink.replace('.git', '')}/tree/${branchroject}/plugins/`;

    if (!text) {
      return await conn.sendMessage(m.chat, { image: { url: imgfiles }, caption: formatFileList(files), mentions: [m.sender] }, { quoted: m });
    }

    const fileNameWithExt = `${text}.js`;
    const fileUrl = getFileUrl(projectLink, fileNameWithExt, 'plugins');

    if (!files.includes(fileNameWithExt)) {
      return m.reply(`الملف "${fileNameWithExt}" غير موجود.`);
    }

    await handleFileDownloadAndSend(m, conn, fileUrl, fileNameWithExt, imgfiles);

  } else if (command === 'red') {
    if (!projectLink) {
      return m.reply(`لم يتم تعيين رابط مشروع بعد.`);
    }

    deleteProjectLink();
    return m.reply('تم حذف رابط المشروع.');

  } else if (command === 'reb') {
    if (!projectLink) {
      return m.reply(`لم يتم تعيين رابط مشروع بعد.`);
    }

    const libFolder = 'lib';
    const srcLibrariesFolder = 'src/libraries';
    const folder = await folderExists(projectLink, libFolder) ? libFolder : srcLibrariesFolder;

    const branchroject = await getDefaultBranch(projectLink);
    const files = await listFilesInFolder(projectLink, folder);
    const imgfiles = `https://image.thum.io/get/fullpage/${projectLink.replace('.git', '')}/tree/${branchroject}/${folder}/`;

    if (!text) {
      return await conn.sendMessage(m.chat, { image: { url: imgfiles }, caption: formatFileList(files), mentions: [m.sender] }, { quoted: m });
    }

    const fileNameWithExt = `${text}.js`;
    const fileUrl = getFileUrl(projectLink, fileNameWithExt, folder);

    if (!files.includes(fileNameWithExt)) {
      return m.reply(`الملف "${fileNameWithExt}" غير موجود.`);
    }

    await handleFileDownloadAndSend(m, conn, fileUrl, fileNameWithExt, imgfiles);

  } else if (command === 'ref') {
    if (!projectLink) {
      return m.reply(`لم يتم تعيين رابط مشروع بعد.`);
    }

    const branchroject = await getDefaultBranch(projectLink);
    const files = await listFilesInFolder(projectLink, '');
    const imgfiles = `https://image.thum.io/get/fullpage/${projectLink.replace('.git', '')}/tree/${branchroject}`;


    if (!text) {
      return await conn.sendMessage(m.chat, { image: { url: imgfiles }, caption: formatFileList(files), mentions: [m.sender] }, { quoted: m });
    }

    const fileNameWithExt = `${text}.js`;
    const fileUrl = getFileUrl(projectLink, fileNameWithExt, '');

    if (!files.includes(fileNameWithExt)) {
      return m.reply(`الملف "${fileNameWithExt}" غير موجود.`);
    }

    await handleFileDownloadAndSend(m, conn, fileUrl, fileNameWithExt, imgfiles);
  }
};

handler.help = ['res <رابط>', 'rev <اسم ملف>', 'red', 'reb', 'ref'];
handler.tags = ['owner'];
handler.command = ['res', 'rev', 'red', 'reb', 'ref'];
handler.rowner = true;

export default handler;
