const handler = {
    async exec({ m }) {
        if (m.hasMedia) {
            let media = await m.downloadMedia();
            media.filename = ''
            try {
                m.reply(media, m.from, {sendMediaAsSticker: true})
            } catch (err) {
                m.reply(err)
            }
        } else {
            if (m.hasQuotedMsg) {
                m.reply('Tidak support media reply!')
            }
            else m.reply('Mana fotonya kak?🙂')
        }
    },
    commands: ['stic', 'sti'].map(v => v + 'ker'),
    tag: 'Sticker',
    help: ['cker', 'ker'].map(v => 'sti'+v)
};

module.exports = handler