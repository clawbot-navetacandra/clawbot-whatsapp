const chalk = require("chalk");

async function logMSG(m, command, from, prefix) {
    let mediaType = ''
    if (m.hasMedia) {
        let _mediaType = await m.downloadMedia()
        mediaType = await _mediaType.mimetype
    }
    let numFrom = from.split('@')[0];
    let d = new Date();
    let _is = command.includes(m.body.toLowerCase().slice(1).split(/ +/)[0]) && prefix.includes(m.body.charAt(0))
    let date = `${d.toLocaleDateString('id-ID').replace(new RegExp('/', 'g'), ' : ')} | ${d.toLocaleTimeString('id-ID').replace('.', ' : ').replace('.', ' : ')}`;
    const format = `${chalk.cyanBright('[ RECEIVED ]')} ${chalk.green('~' + numFrom)} ${chalk.white.bgYellow(date)} ${m.hasMedia ? `${mediaType.includes('webp') ? chalk.bgYellow.black(' STICKER ') : chalk.bgYellow.black(' MEDIA ')}` : ``}\n${_is  ? `${chalk.yellow(m.body)}` : `${m.body}`}`
    console.log(format);
}

module.exports = logMSG