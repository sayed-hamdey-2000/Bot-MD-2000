import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import moment from 'moment-timezone';

global.botnumber = ""
global.confirmCode = ""
global.authFile = `Session`;

// Cambiar a true si el Bot responde a sus comandos con otros comandos.
// Cambiar a false para usar el Bot desde el mismo numero del Bot.
// Error de m.isBaileys marcado como false fix temporal
global.isBaileysFail = false

global.owner = [
  ['201145624848', '𝗦𝗔𝗬𝗘𝗗-𝗦𝗛𝗔𝗪𝗔𝗭𝗔', true]
];

global.ownername = '𝚂𝙰𝚈𝙴𝙳-𝚂𝙷𝙰𝚆𝙰𝚉𝙰';
global.ownernumber = '201145624848';
global.myid = '201145624848@s.whatsapp.net';
  
global.suittag = ['201145624848', '201204885212'];
global.prems = ['201145624848', '201204885212'];

global.packname = '𝗦𝗔𝗬𝗘𝗗-𝗦𝗛𝗔𝗪𝗔𝗭𝗔';
global.author = '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓';
global.wm = '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓';
global.titulowm = '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓';
global.titulowm2 = `𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓`
global.igfg = '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓';
global.wait = '*「 ▓▓▓▓▓▒▒▒▒░░░ 」 صلي على النبي ي حوب 🧞 ...*';


global.styel1 = '┌─ 〘 ';
global.styel2 = ' 〙 ─ ⳹';
global.styel3 = '│✑ 「 ';
global.styel4 = ' 」';
global.styel5 = '└┬ ✑ 「 ';
global.styel6 = '│✑ ';
global.styel7 = '「 ';

global.tx1 = '╭────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╮';
global.tx2 = '│';
global.tx3 = '├';
global.tx4 = '┤';
global.tx5 = '───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───';
global.tx6 = '◈─┄┄┄┄〘';
global.tx7 = '〙┄┄┄┄─◈';
global.tx8 = '┄┄⋗';
global.tx9 = '├───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───┤';
global.tx10 = '╰────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╯';


global.imagen1 = fs.readFileSync('./Menu2.png');
global.imagen2 = fs.readFileSync('./src/nuevobot.jpg');
global.imagen3 = fs.readFileSync('./src/Pre Bot Publi.png');
global.imagen4 = fs.readFileSync('./Menu.png');
global.imagen5 = fs.readFileSync('./src/+18.jpg');
global.imagen6 = fs.readFileSync('./Menu3.png');
global.imagen7 = fs.readFileSync('./Menu2.png');
global.imagen8 = fs.readFileSync('./Menu3.png');
global.imagen9 = fs.readFileSync('./Menu4.png');
global.imagen10 = fs.readFileSync('./Menu5.png');

global.immg1 = fs.readFileSync('./Menu.png');
global.immg2 = fs.readFileSync('./Menu2.png');
global.immg3 = fs.readFileSync('./Menu3.png');
global.immg4 = fs.readFileSync('./Menu4.png');
global.immg5 = fs.readFileSync('./Menu5.png');



global.img1 = 'https://telegra.ph/file/ba984d78fa802662438ee.jpg';
global.img2 = 'https://telegra.ph/file/0e22282b399e105776618.jpg';
global.img3 = 'https://telegra.ph/file/5e6456d22a8264b08a2bc.jpg';
global.img4 = 'https://telegra.ph/file/996f53288a1e2f4f35812.jpg';
global.img5 = 'https://telegra.ph/file/07cd1c2a9d2fe455e3b77.jpg';
global.img6 = 'https://telegra.ph/file/fbac075550b8622a94b8e.jpg';


global.mods = [];


global.d = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Cairo"}));
  //new Date(new Date + 3600000);
global.locale = 'ar';

global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('ar', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('ar', {month: 'long'});
global.año = d.toLocaleDateString('ar', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

global.week = d.toLocaleDateString(locale, { weekday: 'long' });
global.day = d.toLocaleDateString('en', { day: '2-digit' });
global.month = d.toLocaleDateString(locale, { month: 'long' });
global.year = d.toLocaleDateString('en', { year: 'numeric' });
global.time = d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });


global.wm2 = `${dia} ${fecha}\n𝕊ℍ𝔸𝕎𝔸ℤ𝔸-𝔹𝕆𝕋`;
global.gt = '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓';
global.mysticbot = '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓';
global.channel = 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y';
global.md = 'https://github.com/BrunoSobrino/TheMystic-Bot-MD';
global.mysticbot = 'https://github.com/BrunoSobrino/TheMystic-Bot-MD';

global.waitt = '*━────── •●• ──────━*\n> [ 🧞 ] جاري التحميل ...\n*━────── •●• ──────━*';
global.waittt = '*━────── •●• ──────━*\n> [ 🧞 ] جاري التحميل ...\n*━────── •●• ──────━*';
global.waitttt = '*[*━────── •●• ──────━*\n> [ 🧞 ] جاري التحميل ...\n*━────── •●• ──────━*';

global.nomorown = '201145624848';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];

global.cmenut = '❖––––––『';
global.cmenub = '┊✦ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*❖─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';

global.ht1 = '*⋄━───═══⌬≼≽⌬═══───━⋄*';
global.ht2 = '*━────── • • ──────━*';
global.ht3 = '*━─────𖦹𖧷𖦹─────━*';

global.botdate = `*[ 📅 ] التاريخ :*  ${moment.tz('Africa/Cairo').format('DD/MM/YY')}`;
global.bottime = `*[ ⏳ ] الوقت :* ${moment.tz('Africa/Cairo').format('HH:mm:ss')}`;

global.fgif = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {'videoMessage': {'title': wm, 'h': `Hmm`, 'seconds': '999999999', 'gifPlayback': 'true', 'caption': bottime, 'jpegThumbnail': fs.readFileSync('./Menu.png')}}};
global.fmsg = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {conversation: 'فلسطين حرة مهما كان الثمن ❤️🧞'}};
global.fcon = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, 'id': wm}, message: {'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid= '201145624848@s.whatsapp.net':'201145624848@s.whatsapp.net'\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
global.fgif2 = {key: {participant: '0@s.whatsapp.net',  ...('6289643739077-1613049930@g.us' ? {remoteJid: '6289643739077-1613049930@g.us'} : {})}, message: {'videoMessage': {'title': '𝕊ℍ𝔸𝕎𝔸ℤ𝔸-𝔹𝕆𝕋', 'h': `Hmm`, 'seconds': '99999', 'gifPlayback': 'true', 'caption': '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓', 'jpegThumbnail': false}}};
global.fgrp = {key: {participant: '0@s.whatsapp.net', remoteJid: '6289643739077-1613049930@g.us', fromMe: false, 'id': wm}, message: {'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid= '201145624848@s.whatsapp.net':'201145624848@s.whatsapp.net'\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
global.floc = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {locationMessage: {degreesLatitude: 37.7749, degreesLongitude: -122.4194, name: 'Palestine', address: 'San Francisco, CA, USA', url: 'https://maps.google.com/?q=37.7749,-122.4194'}}};
global.frol = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {orderMessage: { itemCount: 2024, status: 1, thumbnail: 'https://telegra.ph/file/ba984d78fa802662438ee.jpg', surface: 1, message: wm, orderTitle: packname, sellerJid: '0@s.whatsapp.net' } } };

global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=',
];



const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'config.js\''));
  import(`${file}?update=${Date.now()}`);
});
