const fackContact = async (user) => {
    const userid = `${user}@s.whatsapp.net`;
    const username = conn.getName(userid); 

    const contactInfo = {
        key: {
            participants: `${userid}`,
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
};
