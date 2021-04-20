const fetch = require('node-fetch');
const fs = require('fs')

const handler = {
    async exec({ m, MessageMedia, args }) {
        if (args.length >= 1) {
            let url = /https?:\/\//.test(args[0]) ? args[0] : 'http://' + args[0];
            try {
                let _fetch = await fetch(`https://${global.API_URL}/ssweb?url=${url}&json=true`, {mode: 'no-cors', timeout: 0});
                let _res = await _fetch.json();
                let _mime = await _res.results.data.mimetype;
                let _base64 = await _res.results.data.base64;
                let media = new MessageMedia(_mime, _base64, undefined);
                m.reply(media, m.from, { caption: url, linkPreview: false})
            } catch (err) {
                m.reply(err)
            }
        } else {
            m.reply('Uhmm.. URL-nya?')
        }
    },
    commands: ['web', ''].map(v => 'ss'+v)
}

module.exports = handler