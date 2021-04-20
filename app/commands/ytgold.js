const fetch = require('node-fetch');

const glitchTextCD = {
    list: async function () {
        let _a = await global.db.ref('cooldown/ytgold').get();
        let _b = _a.val();
        return Object.keys(_b)
    },
    update: async function (uid, data) {
        await global.db.ref(`cooldown/ytgold/${uid}`).set(data);
    }
}

const handler = {
    async exec({ m, args, MessageMedia, dbid }) {
        let cdList = await glitchTextCD.list();
        if (!cdList.includes(dbid)) {
            if (args.length >= 1) {
                await glitchTextCD.update(dbid, {is: '1'})
                await m.reply('Memproses..\n*Mohon tunggu sekitar 1 menit.*');
                // await execute(_ft, messageFrom, filename)
                try {
                    let _fetch = await fetch(`https://${global.API_URL}/ytbutton?type=gold&name=${encodeURIComponent(args.join(' '))}&fname=${dbid}`,{
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
                            await glitchTextCD.update(dbid, {})
                        }, 5000);
                    } else {
                        await glitchTextCD.update(dbid, {})
                        m.reply('*Gambar tidak dapat terkirim, karena terjadi kesalahan sistem.*')
                    }
                } catch (err) {
                    m.reply(err)
                }
            } else {
                m.reply('Namanya?')
            }
        } else {
            m.reply('Kamu sedang cooldown, coba lagi nanti!')
        }
    },
    commands: ['ytgold'],
    tag: 'Maker',
    help: ['ytgold'].map(v => v + ' <Nama>')
}

module.exports = handler