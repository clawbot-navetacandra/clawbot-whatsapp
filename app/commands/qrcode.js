let QRCode = require('qrcode');

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid }) {
        if (args.length < 1) {
            m.reply('Mana teksnya!1!1')
        } else {
            QRCode.toDataURL(args.join` `, (err, url) => {
                if (err) {
                    m.reply(err)
                } else {
                    let media = new MessageMedia('image/png', url.split('base64,')[1], '');
                    m.reply(media)
                }
            })
        }
    },
    tag: 'Tools',
    commands: ['', 'code'].map(v => 'qr' + v),
    help: ['', 'code'].map(v => 'qr' + v + ' <Teks>')
}

module.exports = handler