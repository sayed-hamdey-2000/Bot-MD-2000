import fs from 'fs';
import path from 'path';

let deleteFile = async (filename) => {
    let filePath = path.join('plugins', filename); 

    try {
        fs.unlinkSync(filePath);
        console.log(`تم حذف الملف ${filename} بنجاح.`);
    } catch (err) {
        console.error(`فشل في حذف الملف ${filename}: ${err.message}`);
        throw err;
    }
};

let handler = async (m, { isROwner, usedPrefix, command, text }) => {
    await m.reply(global.wait);
    if (!isROwner) return;

    if (!text) {
       throw '*`❲ 💡 ❳ يرجى تحديد اسم الملف المراد حذفه .`*\n> مثال: ' + usedPrefix + command + ' الإسم';
    }

    try {
        const fileName = text + '.js';
            
        await deleteFile(fileName);
        
        m.reply('*`❲ 💡 ❳ تم حذف الملف بنجاح .`*\n> الملف: ' + fileName);
    } catch (e) {
        console.error(`حدث خطأ أثناء حذف الملف ${text}.js: ${e.message}`);
        m.reply('*`❲ ❗ ❳ حدث خطأ اثناء حذف الملف .`*\n> الملف: ' + fileName + '\n> الخطأ: ' + e.message);
    }
};

handler.help = ['deleteplugin'];
handler.tags = ['owner'];
handler.command = /^(gpd|باتش-حذف)$/i;
handler.rowner = true;

export default handler;
