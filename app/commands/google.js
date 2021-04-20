const fetch = require('node-fetch');

let title = [];
let link = [];
let snippet = [];
let data = [];
const handler = {
    async exec({ m, args }) {
        if (args.length >= 1) {
            try {
                let _fetch = await fetch(`https://fierce-brushlands-90323.herokuapp.com/google?q=${encodeURIComponent(args.join(' '))}`,
                    { mode: 'no-cors', timeout: 0 });
                if (_fetch.status !== 200) m.reply('Pencarian tidak dapat terkirim _( Timeout )_\nMohon coba lagi nanti.')
                let _res = await _fetch.json();
                if (_res.results.length >= 1) {
                    let _items = await _res.results // array
                    _items.forEach(e => {
                        title.push(e.title)
                        link.push(e.link)
                        snippet.push(e.snippet)
                    });
                    for (let i = 0; i < _items.length; i++) {
                        data.push(link[i] + "\n*" + title[i] + "*\n" + "```" + snippet[i] + "```");
                    }
                    m.reply(data.join('\n\n'))
                    ink, title, snippet, data = []
                } else {
                    link, title, snippet, data = []
                    m.reply('Pencarian tidak ditemukan!')
                }
            } catch (err) {
                data = []
                m.reply(err)
            }
        } else {
            data = []
            m.reply('Mohon isi pencarian!')
        }
    },
    commands: ['google'],
    tag: 'Tools',
    help: ['google <Pencarian>']
};

module.exports = handler