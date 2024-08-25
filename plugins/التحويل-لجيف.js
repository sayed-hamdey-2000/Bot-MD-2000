

const handler = async (m, {conn}) => {
  
  if (!m.quoted) throw `*فين الفيديو اللي عاوز تحولو ي حوب 🧞‍♂️*`;
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';
  if (!/(mp4)/.test(mime)) throw `*دا مش فيديو ي حوب 🧞‍♂️*`;
  m.reply(global.wait);
  const media = await q.download();
  conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: `*شبيك لبيك طلبك بين ايديك 🧞*`}, {quoted: m});
};
handler.command = ['togifaud','لجيف'];
export default handler;
