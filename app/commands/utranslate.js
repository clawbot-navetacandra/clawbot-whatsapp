const fetch = require('node-fetch');

const lang = {
    indonesia: 'Indonesia',
    indonesian: 'Indonesia',
    indo: 'Indonesia',
    indo: 'Indonesia',
    inggris: 'Inggris',
    english: 'Inggris'
}


const handler = {
    async exec({ m, args, usedprefix }) {

        if (args.length < 3) {
            m.reply(`Masukkan parameter dengan benar, Contoh: \n${usedprefix}utranslate indonesia inggris Halo dunia`)
        } else {
            let from = args[0]
            let to = args[1]
            args.splice(0, 2);
            let _text = args.join(' ').replace(/\n/g, ' ');
            try {
                let _fetch = await fetch(`https://${global.API_URL}/translate/u-dictionary?lang_from=${lang[from].toLowerCase()}&lang_target=${lang[to].toLowerCase()}&text=${_text}`, { mode: 'no-cors', timeout: 0 });
                if (_fetch.status !== 200) m.reply('Hasil tidak dapat terkirim _( Timeout )_\nMohon coba lagi nanti.')
                let translated = await _fetch.json()


                let result = `*${lang[from.toLowerCase()]} :* ${_text}\n*${lang[to.toLowerCase()]} :* ${translated.results.translated.join('   |   ')}`;
                m.reply(result)
            } catch (err) {
                // console.log(err);
                m.reply(err)
            }
        }


    },
    commands: ['utranslate'],
    tag: 'Tools',
    help: ['utranslate <bahasa asal> <bahasa tujuan> (Only support indonesia & english)']
}

// handler.exec()
module.exports = handler