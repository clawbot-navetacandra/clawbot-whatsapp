const rp = require('request-promise');
const cheerio = require('cheerio')

const handler = {
    async exec({ m, args, MessageMedia, client }) {
        let url = `https://kbbi.kemdikbud.go.id/entri/${args.join(' ')}`;
        const html = cheerio.load(await rp(url))('div[class="container body-content"]').html();
        const _ = cheerio.load(html);
        let existRes = _('ol').html() ? true : false;
        let existRes1 = _('ul[class="adjusted-par"]').html() ? true : false;
        if (existRes || existRes1) {
            let fullTitle = _('h2').text()
            let title = fullTitle.includes(' » ')
                ? fullTitle.split(' » ')[1]
                : fullTitle
            let arti = [];
            let root = existRes ? 'ol' : 'ul[class="adjusted-par"]'
            _(root).find('font[color="red"]').remove().html();

            _(`${root} > li`).each((i, el) => {
                return arti.push(_(el).text())
            });
        
        // return arti
            m.reply(`*${title}*\n\n${arti.map(v => '- ' + v).join('\n')}`)
        } else {
            m.reply(`Arti "_${args.join(' ')}_" tidak ditemukan.`)
        }
    },
    commands: ['kbbi'],
    tag: 'Tools',
    help: ['kbbi <kata>']
}

module.exports = handler