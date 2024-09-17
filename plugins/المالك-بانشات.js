
const handler = async (m) => {
  
  global.db.data.chats[m.chat].isBanned = true;
  m.reply('*`❲🔒❳` تم كتم المحادثه*\n\n*`⛊ هذه المحادثة ليس لها الأذن لاستعمالي الآن`*');
};
handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = /^بانشات$/i;
handler.rowner = true;
export default handler;
