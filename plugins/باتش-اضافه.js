import fs from 'fs';
import path from 'path';


let createFile = async (filename, data) => {
    let filePath = path.join('plugins', filename);

    try {
        
        await fs.promises.writeFile(filePath, data, 'utf8');
        console.log(`تم إنشاء الملف ${filename} بنجاح.`);
    } catch (err) {
        console.error(`فشل في إنشاء الملف ${filename}: ${err.message}`);
        throw err;
    }
};


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
        await createFile(filename, data);
        m.reply('`*❲ 💡 ❳ تم اضافه الملف الي الاسكربت بنجاح .*`\n> الملف: ' + filename);
    } catch (e) {
        console.error(`حدث خطأ أثناء إنشاء الملف ${filename}: ${e.message}`);
        m.reply('`*❲ ❗ ❳ حدث خطأ اثناء اضافه الملف الي الاسكربت .*`\n> الملف: ' + filename + '\n> الخطأ: ' + e.message);
    }
};


handler.help = ['createplugin'];
handler.tags = ['owner'];
handler.command = /^(gps|باتش-اضافه)$/i;
handler.rowner = true;

export default handler;

