import fetch from 'node-fetch';

const fackContact = async (user) => {

    const userid = `${user}@s.whatsapp.net`;
    const username = conn.getName(userid); 

    const contactInfo = {
        key: {
            participant: `${userid}`, 
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            contactMessage: {
                displayName: `${username}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${username}\nitem1.TEL;waid=${user}:${user}\nEND:VCARD`
            }
        },
        participant: `${userid}`
    };

    return contactInfo;
}

const fackLocation = async (user, locName, lat, long, thumbnailUrl = null) => { // أضف متغيرات lat و long
    const userid = `${user}@s.whatsapp.net`;
    
    let thumbnail = null;
    if (thumbnailUrl) {
        const response = await fetch(thumbnailUrl);
        const buffer = await response.buffer();
        thumbnail = buffer.toString('base64'); 
    }

    const locationInfo = {
        key: {
            participant: `${userid}`, 
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                degreesLatitude: lat,  // تعديل الإحداثيات إلى قيم فعلية
                degreesLongitude: long, // تعديل الإحداثيات إلى قيم فعلية
                name: locName,
                address: locName,
                caption: locName,
                sequenceNumber: '0',
                jpegThumbnail: thumbnail
            }
        },
        participant: `${userid}`
    };

    return locationInfo;
};


const fackText = async (user, messageText, thumbnailUrl = null) => {
    const userid = `${user}@s.whatsapp.net`;

    let thumbnail = null;
    if (thumbnailUrl) {
        const response = await fetch(thumbnailUrl);
        const buffer = await response.buffer();
        thumbnail = buffer.toString('base64'); 
    }

    const textMessageInfo = {
        key: {
            participant: `${userid}`, 
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            extendedTextMessage: {
                text: messageText,
                jpegThumbnail: thumbnail 
            }
        },
        participant: `${userid}`
    };

    return textMessageInfo;
};
