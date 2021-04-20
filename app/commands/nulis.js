const fetch = require('node-fetch');

const handler = {
    async exec({ m, args, MessageMedia, client, teks, dbid }) {
        // let hasilPath = path.resolve(`${__dirname}/../src/hasil-${dbid}.jpg`).replace(/\\/g, '/')
        if (args.length < 1) {
            m.reply('Mana teksnya!1!!')
        } else {
            try {
                let _fetch = await fetch('https://fierce-brushlands-90323.herokuapp.com/nulis?teks=' + teks)
                if (_fetch.status == 200) {
                    let _res = await _fetch.json();
                    let res = await _res.results.data;
                    if (!res.startsWith('/')) {
                        m.reply('Gambar tidak dapat terkirim, karena terjadi kesalahan sistem.*')
                    } else {
                        m.reply(new MessageMedia('image/jpeg', await res, ''))
                    }
                } else {
                    m.reply('*Gambar tidak dapat terkirim* _( Timeout )_\nMohon coba lagi nanti.')
                }
            } catch (err) {
                m.reply(err)
            }
        }
    },
    tag: 'Tools',
    commands: ['nulis'],
    help: ['nulis'].map(v => v + ' <Teks>')
};

module.exports = handler