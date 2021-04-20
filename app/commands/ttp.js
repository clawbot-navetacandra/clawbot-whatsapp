const fetch = require('node-fetch')
const handler = {
    async exec({ m, args, MessageMedia, client }) {
        if (args.length < 1) {
            m.reply('Uhmm.. teksnya?')
        } else {
            try {
                let _fetch = await fetch(`https://${global.API_URL}/ttp?text=${encodeURIComponent(args.join(' '))}`, {
                    mode: 'no-cors',
                    timeout: 0
                });
                if(_fetch.status !== 200) m.reply('*Stiker tidak dapat dikirim _( Timeout )_*\n*Coba lagi nanti*')
                let _res = await _fetch.json();
                let _mimetype = _res.results.data.mimetype;
                let _base64 = _res.results.data.base64;
                let media = new MessageMedia(_mimetype, _base64, undefined);
                m.reply(media, m.from, {sendMediaAsSticker: true})
            } catch (err) {
                m.reply(err)
            }
        }
    },
    commands: ['ttp'],
    tag: 'Sticker',
    help: ['ttp'].map(v => v + ' <Teks>')
}

module.exports = handler