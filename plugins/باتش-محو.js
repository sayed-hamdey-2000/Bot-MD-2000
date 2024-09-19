import axios from 'axios';
import fs from 'fs';
import path from 'path';

const githubToken = global.token;
const repoOwner = global.repoOwner;
const repoName = global.repoName;
const branch = global.branch;

let handler = async (m, { isROwner, usedPrefix, command, text }) => {

    await m.reply(global.wait); 
    
    if (!isROwner) return;

    if (!text) {
        throw '*`❲ 💡 ❳ يرجى تحديد اسم الملف لحذفه من الاسكربت .`*\n> مثال: ' + usedPrefix + command + ' الاسم';
    }

    let filename = text.trim();
    if (!filename.endsWith('.js')) {
        filename += '.js';
    }

    try {
        await deleteFileFromGithub(filename);
        m.reply('*`❲ 💡 ❳ تم حذف الملف من الاسكربت بنجاح .`*\n> الملف: ' + filename);
    } catch (e) {
        console.error(`حدث خطأ أثناء حذف الملف ${filename} من GitHub: ${e.message}`);
        m.reply('*`❲ ❗ ❳ حدث خطأ اثناء حذف الملف من الاسكربت .`*\n> الملف: ' + filename + '\n> الخطأ: ' + e.message);
    }
};

handler.help = ['deleteplugin'];
handler.tags = ['owner'];
handler.command = /^(pdelete)$/i;
handler.rowner = true;

export default handler;

const deleteFileFromGithub = async (filename) => {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/plugins/${filename}`;
    
    try {

        const { data: fileData } = await axios.get(apiUrl, {
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const sha = fileData.sha;


        await axios.delete(apiUrl, {
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            data: {
                message: `حذف الملف ${filename}`,
                sha: sha,
                branch: branch
            }
        });

        console.log(`تم حذف الملف ${filename} بنجاح من GitHub.`);
        
    } catch (error) {
        console.error(`فشل في حذف الملف ${filename} من GitHub: ${error.message}`);
        throw '*`❲ ❗ ❳ حدث خطأ اثناء حذف الملف من الاسكربت .`*\n> الملف: ' + filename + '\n> الخطأ: ' + error.message + '`';
    }
};
