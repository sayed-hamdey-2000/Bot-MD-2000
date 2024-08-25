

const handler = async (m, { conn, isROwner, text }) => {
 
  if (!process.send) throw `*زعلان منك ومش هرستر 🧞*`;
  // conn.readMessages([m.key])
  await m.reply(`*اهون عليك تهون عليا هترستر وارجع بعد شويه 🧞*`);
  process.send('reset');
};
handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'رستر'];
handler.rowner = true;
export default handler;
