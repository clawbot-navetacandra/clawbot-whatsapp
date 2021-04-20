const TinyURL = require('tinyurl');

const handler = {
    async exec({ m, args }) {
        let url = /https?:\/\//.test(args[0]) ? args[0] : 'http://' + args[0]
        await TinyURL.shorten(url)
            .then(v => m.reply(v, m.from, { linkPreview: false }))
            .catch(err => m.reply(err))
        // await m.reply(msg, m.from, {linkPreview: false})

    },
    commands: ['tinyurl'],
    tag: 'Tools',
    help:   ['tinyurl <url>']
};

module.exports = handler