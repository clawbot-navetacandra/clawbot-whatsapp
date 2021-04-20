const fetch = require('node-fetch');

const glitchTextCD = {
    list: async function () {
        let _a = await global.db.ref('cooldown/glitchtext').get();
        let _b = _a.val();
        return Object.keys(_b)
    },
    update: async function (uid, data) {
        await global.db.ref(`cooldown/glitchtext/${uid}`).set(data);
    }
}

const handler = {
    async exec({ m, args, MessageMedia, dbid, usedprefix }) {
        let fullText = args.join(' ');
        let _ft = fullText.split(' | ')
        let cdList = await glitchTextCD.list();
        if (!cdList.includes(dbid)) {
            if (_ft.length >= 2) {
                await glitchTextCD.update(dbid, {is: '1'})
                await m.reply('Memproses..\n*Mohon tunggu sekitar 1 menit.*');
                // await execute(_ft, messageFrom, filename)
                try {
                    let _fetch = await fetch(`https://${global.API_URL}/glitch-text?text1=${encodeURIComponent(_ft[0])}&text2=${encodeURIComponent(_ft[1])}&fname=${dbid}`,{
                            mode: 'no-cors',
                            timeout: 0
                        })
                    if (_fetch.status !== 200) {
                        await glitchTextCD.update(dbid, {})
                        m.reply('*Gambar tidak dapat terkirim* _( Timeout )_\nMohon coba lagi nanti.');
                    }
                    let _res = await _fetch.json();
                    let mt = _res.results.data.mimetype;
                    let b64 = _res.results.data.base64;
                    if (b64.startsWith('/')) {
                        let media = new MessageMedia(mt, b64, '')
                        m.reply(media)
                        setTimeout(async () => {
                            glitchTextCD.update(dbid, {})
                        }, 5000);
                    } else {
                        await glitchTextCD.update(dbid, {})
                        m.reply('*Gambar tidak dapat terkirim, karena terjadi kesalahan sistem.*')
                        setTimeout(async () => {
                            glitchTextCD.update(dbid, {})
                        }, 5000);
                    }
                } catch (err) {
                    m.reply(err)
                    setTimeout(async () => {
                        glitchTextCD.update(dbid, {})
                    }, 5000);
                }
            } else {
                // m.reply('Masukkan format dengan benar\n*Contoh :* #glitchtext Clawbot | GG Gaming')
                m.reply(`Masukkan format dengan benar\n*Contoh :* ${usedprefix}glitchtext Clawbot | GG Gaming`)
            }
        } else {
            m.reply('Kamu sedang cooldown, coba lagi nanti!')
        }
    },
    commands: ['glitchtext'],
    tag: 'Maker',
    help: ['glitchtext'].map(v => v + ' <Teks 1> | <Teks 2>')
}

module.exports = handler