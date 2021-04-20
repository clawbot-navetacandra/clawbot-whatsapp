const handler = {
    async exec({ args, client, m, messageFrom }) {
        
        let chat = await client.getChatById(m.from);
        if (chat.isGroup) {
            if (chat.groupMetadata.participants.filter(e => e.id._serialized === messageFrom)[0].isAdmin || messageFrom === global.ownerId) {
                let isBotAdmin = chat.groupMetadata.participants.filter(e => e.id._serialized === global.botId)[0].isAdmin;
                if (isBotAdmin) {
                    let allMember = chat.groupMetadata.participants.filter(e => e.id._serialized !== global.ownerId).filter(e => e.id._serialized !== messageFrom).filter(e => e.id._serialized !== global.botId);
                    for (let i = 0; i < allMember.length; i++) {
                        chat.removeParticipants([allMember[i].id._serialized])
                    }
                } else {
                    m.reply('Jadikan bot sebagai admin!')
                }
            } else {
                m.reply('Kamu siapa? perintah ini khusus *ADMIN Group*')
            }
        } else {
            m.reply('Hanya bisa digunakan digroup!')
        }
        
    },
    commands: ['kick', 'remove'].map(v => v+'all'),
    tag: 'Group',
    help: ['kick', 'remove'].map(v => v+'all' + ' <Tag>')
}

module.exports = handler

