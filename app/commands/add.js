const handler = {
    async exec({ args, client, m, messageFrom }) {
        
        // console.log(args.map(async v => await client.getNumberId(v)));
        let isValid = args.join(' ').includes('+') ? false : true
        let chat = await client.getChatById(m.from);
        if (chat.isGroup) {
            if (chat.groupMetadata.participants.filter(e => e.id._serialized === messageFrom)[0].isAdmin || messageFrom === global.ownerId) {
                let isBotAdmin = chat.groupMetadata.participants.filter(e => e.id._serialized === global.botId)[0].isAdmin;
                if (isBotAdmin) {
                    if (args.length >= 1) {
                        if (!isValid) {
                            m.reply('Masukkan format dengan benar!\nContoh: #add 6281991115938')
                        } else {
                            args.map(async (v) => {
                                let numberId = await client.getNumberId(v)
                                if (numberId) {
                                    chat.addParticipants([numberId._serialized])
                                } else {
                                    m.reply(`Nomor tidak valid/tidak terdaftar di WhatsApp *${v}*`)
                                }
                            })
                        }
                    } else {
                        m.reply('Mana nomornya kak?')
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
    commands: ['add', '+'],
    help: ['add', '+'].map(v => v + ' <Nomor>'),
    tag: 'Group'
};

module.exports = handler

