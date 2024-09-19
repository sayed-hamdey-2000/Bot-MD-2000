import axios from 'axios';
import fs from 'fs';
import path from 'path';

const githubToken = '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';
const repoOwner = 'sayed-hamdey-2000';
const repoName = 'Bot-MD-2000';
const branch = 'shawaza';

let handler = async (m, { isROwner, usedPrefix, command, text }) => {

    await m.reply(global.wait); 
    
    if (!isROwner) return;

    if (!text) {
        throw '`*❲ 💡 ❳ يرجى تحديد اسم الملف والبيانات لاضافاتها الي الاسكربت .`*\n> مثال: ' + usedPrefix + command + ' الاسم| <الكود>';
    }

    let parts = text.split('|');
    
    if (parts.length < 2) {
        throw '`*❲ 💡 ❳ يرجى التأكد من اسم الملف والبيانات لاضافاتها الي الاسكربت .*`\n> مثال: ' + usedPrefix + command + ' الاسم| <الكود>';
    }

    let filename = parts[0];
    if (!filename.endsWith('.js')) {
        filename += '.js';
    }
    
    let data = parts.slice(1).join('|');

    try {
    
        await createFileAndUpload(filename, data);
        m.reply('`*❲ 💡 ❳ تم اضافه الملف الي الاسكربت بنجاح .*`\n> الملف: ' + filename);
        
    } catch (e) {
    
        console.error(`حدث خطأ أثناء رفع الملف ${filename} إلى GitHub: ${e.message}`);
        
        m.reply('`*❲ ❗ ❳ حدث خطأ اثناء اضافه الملف الي الاسكربت .*`\n> الملف: ' + filename + '\n> الخطأ: ' + e.message);
    }
};


handler.help = ['createplugin'];
handler.tags = ['owner'];
handler.command = /^(padd)$/i;
handler.rowner = true;

export default handler;

const readFileFromPath = async (filePath) => {
    try {
        return await fs.promises.readFile(filePath, 'utf8');
    } catch (error) {
        console.error(`فشل في قراءة الملف من المسار ${filePath}: ${error.message}`);
        
        throw'`*❲ ❗ ❳ حدث خطأ اثناء قراءه الملف من المسار .*`\n> المسار: ' + filePath + '\n> الخطأ: ' + error + '';
    }
};


const uploadToGithub = async (filename, data) => {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/plugins/${filename}`;

    try {
        const response = await axios.put(apiUrl, {
            message: `⛊ 𝚂𝙰𝚈𝙴𝙳-𝚂𝙷𝙰𝚆𝙰𝚉𝙰`,
            content: Buffer.from(data, 'utf8').toString('base64'),
            branch: branch
        }, {
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        return response.data;
        
    } catch (error) {
        console.error(`فشل في رفع الملف ${filename} إلى GitHub: ${error.message}`);
        
        throw'`*❲ ❗ ❳ حدث خطأ اثناء اضافه الملف الي الاسكربت .*`\n> الملف: ' + filename + '\n> الخطأ: ' + error + '';
        
        
    }
};


const createFileAndUpload = async (filename, data) => {
    const filePath = path.join('plugins', filename);

    
    try {
        await fs.promises.writeFile(filePath, data, 'utf8');
        console.log(`تم إنشاء الملف ${filename} في المسار plugins بنجاح.`);
    } catch (error) {
        console.error(`فشل في إنشاء الملف ${filename}: ${error.message}`);
        
        throw'`*❲ ❗ ❳ حدث خطأ اثناء الملف .*`\n> الملف: ' + filename + '\n> الخطأ: ' + error + '';
    }

   
    try {
        const fileData = await readFileFromPath(filePath);
        await uploadToGithub(filename, fileData);
    } catch (error) {
        console.error(`فشل في رفع الملف ${filename} إلى GitHub: ${error.message}`);
        
        throw'`*❲ ❗ ❳ حدث خطأ اثناء اضافه الملف الي الاسكربت .*`\n> الملف: ' + filename + '\n> الخطأ: ' + error + '';
    }
};
