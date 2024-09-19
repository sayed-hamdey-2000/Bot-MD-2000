import fetch from "node-fetch";
import translate from '@vitalets/google-translate-api';

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  
 if (!text) {
      await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ يرجي إدخال نص للبحث .*\nمثال :\n> ➤  ${usedPrefix + command} من هو ناروتو` }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
      return;
    }
    
    await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });
    

    let user = m.sender.split('@')[0];
    let username = conn.getName(m.sender);

    
    try {
    conn.sendPresenceUpdate('composing', m.chat);
    
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    

    let { key } = await conn.sendMessage(m.chat, {
      text: global.wait}, { quoted: m });

    let response = await fetch(`https://api.neastooid.xyz/api/ai/gpt4?q=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error("فشل الطلب إلى واجهة OpenAI");
    }

    let result = await response.json();

    if (result.code !== 200 || !result.status) {
      throw new Error("استجابة غير متوقعة من واجهة البرمجة");
    }

conn.sendPresenceUpdate('composing', m.chat);

const lang1 = 'ar';

const cap = await translate(`${result.gpt}`, {to: lang1, autoCorrect: true});

    await conn.sendMessage(m.chat, { react: { text: '👌🏻', key: m.key } });

    await conn.sendMessage(m.chat, {
      text: "" + cap.text,
      edit: key,
    }, { quoted: m });

    previousMessages = [...previousMessages, { role: "user", content: text }];
    
  } catch (error) {
  
  await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  
    await conn.sendMessage(m.chat, {
      text: `خطأ: ${error.message}`
    }, { quoted: m });
  }
}

handler.help = ['ai2'];
handler.tags = ['ai'];
handler.command = /^(بوت)$/i;
export default handler;