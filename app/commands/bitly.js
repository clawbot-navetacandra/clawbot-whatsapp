const fetch = require('node-fetch')

const handler = {
    async exec({ m, args }) {
        if (args.length >= 1) {
            let url = /https?:\/\//.test(args[0]) ? args[0] : 'http://' + args[0];
            try {
                let _fetch = await fetch(`https://${global.API_URL}/bitly?url=${url}`, { mode: 'no-cors', timeout: 0 });
                if(_fetch.status !== 200) m.reply('Hasil tidak dapat terkirim _( Timeout )_\nMohon coba lagi nanti.')
                let _res = await _fetch.json();
                let _data = await _res.result;
                if (_data !== '') {
                    m.reply(`Link asal : ${url}\nLink hasil : ${_data}`, m.from, { linkPreview: false})
                } else {
                    m.reply('Link tidak dapat dikonversi!')
                }
            } catch (err) {
                m.reply(err)
            }
        } else {
            m.reply('Mana URL-nya kak!')
        }

    },
    commands: ['bitly'],
    tag: 'Tools',
    help: ['bitly <url>']
};

module.exports = handler