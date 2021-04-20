const tahta = require(`${__dirname}/../helper/tahta`);
const fs = require('fs')

const dir = `${__dirname}/../src/tahta.jpg`

async function make(args, m , MessageMedia) {
    await m.reply('Memproses..\n*Mohon Tunggu Sebentar..*')
    const text = args.join(' ');
    await tahta(text);

    let media = MessageMedia.fromFilePath(dir);
    await m.reply(media, m.from, { caption: '*© ClawBot*' });
}

const handler = {
    async exec({ args, m, MessageMedia, client }) {
        if (checkExist()) {
            fs.unlinkSync(dir);
            make(args, m, MessageMedia)
        } else {
            make(args, m, MessageMedia)
        }
    },
    commands: ['tah', 'har'].map(v => v + 'ta'),
    tag: 'Maker',
    help: ['tah', 'har'].map(v => v + 'ta')
}

module.exports = handler


function checkExist() {
    if (fs.existsSync(dir)) {
        return true
    } else {
        return false
    }
}