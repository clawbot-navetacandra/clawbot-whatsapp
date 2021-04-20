const rp = require('request-promise');
const cheerio = require('cheerio');

String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


const handler = {
    async exec({m, args}) {

        const baseWiki = 'https://id.wikipedia.org/wiki/';
        if (args.join(' ').trim() !== '') {
            const url = baseWiki + encodeURI(args.join(' '));

            try {
                const request = await rp(url);
                const $ = cheerio.load(request);
                const regex = require(`${__dirname}/../helper/regex`);

                const title = $('.firstHeading').text();
                let txt;
                $('div[class="mw-parser-output"] > p').each((i, el) => {
                    return txt += $(el).text().replaceArray(regex, "").replaceAll('\n', '\n\n')
                });
                const content = `_*${title}*_\n\n${txt.replace('undefined', '').slice(0, -1)}`;
                m.reply(content)

            } catch (err) {
                if (err.statusCode === 404) m.reply('Pencarian tidak dapat ditemukan!');
                // m.reply(err)
            }
        } else {
            m.reply('Mohon isi pencarian!')
        }


    },
    commands: ['wiki'],
    tag: 'Tools',
    help: ['wiki <Pencarian>']
};

module.exports = handler