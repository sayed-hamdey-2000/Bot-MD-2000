import fs from 'fs';
const handler = (m) => m;
handler.all = async function(m) {

const sounds = [
        "./media/احا.mp3",
        "./media/احا1.mp3"
    ];

const sounds2 = [
        "./media/بضاني.mp3",
        "./media/من انت.mp3"
    ];

const sounds3 = [
        "./media/انها المخدرات.mp3",
        "./media/ولا ايه.mp3"
    ];
const sounds4 = "./media/الصدمه.mp3";
const sounds5 = "./media/اسمع.mp3";
const sounds6 = "./media/اقلعي.mp3";

  const chat = global.db.data.chats[m.chat];
  
    const fk = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast',
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    'participant': '0@s.whatsapp.net'
  };

  if (/^احا|احيه$/i.test(m.text) && !chat.isBanned && chat.audios) {

const vn = sounds[Math.floor(Math.random() * sounds.length)];

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fk});
  
  } else if (/^شخره|خخ$/i.test(m.text) && !chat.isBanned && chat.audios) {

const vn = sounds2[Math.floor(Math.random() * sounds2.length)];

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fk});

} else if (/^ههه|ضحك|😂$/i.test(m.text) && !chat.isBanned && chat.audios) {

const vn = sounds3[Math.floor(Math.random() * sounds3.length)];

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fk});

} else if (/^صدمه|تبا|🙂$/i.test(m.text) && !chat.isBanned && chat.audios) {

const vn = sounds4;

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fk});

} else if (/^بقولك|قول$/i.test(m.text) && !chat.isBanned && chat.audios) {

const vn = sounds5;

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fk});

} else if (/^خد|اقلع|بعبص$/i.test(m.text) && !chat.isBanned && chat.audios) {

const vn = sounds6;

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fk});

}
  return !0;
};
export default handler;
