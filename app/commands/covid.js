const fetch = require('node-fetch');
const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid }) {
        try {
            let _fetch = await fetch('https://covid19.mathdro.id/api/countries/indonesia', {
                mode: 'no-cors',
                timeout: 0
            });
            if (_fetch.status !== 200) m.reply('*Hasil tidak dapat dikirim. _( Internal server error )_*')
            let res = await _fetch.json();
            let msg = `*Data Wabah Covid-19 Di Indonesia*\n\n*Terkonfirmasi :* ${res.confirmed.value} Orang\n*Sembuh :* ${res.recovered.value} Orang\n*Meninggal :* ${res.deaths.value} Orang`
            m.reply(msg)
        } catch (err) {
            m.reply(err)
        }
    },
    commands: ['covid'],
    tag: 'Info',
    help: ['covid']
}

module.exports = handler