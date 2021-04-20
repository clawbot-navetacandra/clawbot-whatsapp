const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom }) {
        if (args.length >= 1) {
            await m.reply('Laporan akan dikirimkan ke owner, \nLaporan main-main = BLOCK!');
            client.sendMessage(
                global.ownerId,
                `${args.join(' ')}\nBug Report dari : https://wa.me/${messageFrom.split('@')[0]}`,
            )
        } else {
            m.reply('Apa yang mau dilapor kak?')
        }
    },
    commands: ['bugreport', 'report'],
    tag: 'Info',
    help: ['bugreport', 'report'].map(v => v + ' <report>')
}

module.exports = handler