import { exec as _exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const exec = promisify(_exec); 

const handler = async (m, { conn, text }) => {
  
  const libDir = './lib';
  const files = fs.readdirSync(libDir).filter(file => file.endsWith('.js')); 
  const fileNames = files.map((file) => file.replace('.js', ''));


  if (!text) {
    throw `
╭──────────────────╮
│ قائمة الملفات المتاحة
│ عدد الملفات المتاحة: ${fileNames.length}
╰──────────────────╯

╭──────────────────╮
${fileNames.map((name, index) => `│ [${index + 1}] ${name}`).join('\n')}
╰──────────────────╯`;
  }


  if (!fileNames.includes(text)) {
    return m.reply(`
╭──────────────────╮
│ الرجاء إدخال اسم ملف صحيح
│ عدد الملفات المتاحة: ${fileNames.length}
╰──────────────────╯

╭──────────────────╮
${fileNames.map((name, index) => `│ [${index + 1}] ${name}`).join('\n')}
╰──────────────────╯`);
  }

  try {

    const { stdout, stderr } = await exec(`cat ${path.join(libDir, text)}.js`);


    if (stdout.trim()) {
      const sentMessage = await conn.sendMessage(m.chat, { text: stdout }, { quoted: m });


      await conn.sendMessage(m.chat, {
        document: fs.readFileSync(path.join(libDir, `${text}.js`)),
        mimetype: 'application/javascript',
        fileName: `${text}.js`
      }, { quoted: sentMessage });
    }


    if (stderr.trim()) {
      const errorSentMessage = await conn.sendMessage(m.chat, { text: stderr }, { quoted: m });


      await conn.sendMessage(m.chat, {
        document: fs.readFileSync(path.join(libDir, `${text}.js`)),
        mimetype: 'application/javascript',
        fileName: `${text}.js`
      }, { quoted: errorSentMessage });
    }

  } catch (error) {

    return m.reply(`حدث خطأ أثناء قراءة الملف: ${error.message}`);
  }
};

handler.help = ['getplugin *<nombre>*'];
handler.tags = ['owner'];
handler.command = /^(ليب|lib)$/i;
handler.rowner = true;

export default handler;
