
const handler = async (m) => {
 
  global.db.data.chats[m.chat].isBanned = false;
  m.reply('*`❲🔓❳` تم الغاء كتم المحادثه*\n\n*`⛊ هذه المحادثة لها الأذن لاستعمالي الآن`*');
};
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = /^بانشاتفك$/i;
handler.rowner = true;
export default handler;
