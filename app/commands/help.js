const readmore = String.fromCharCode(8206).repeat(4001);
const db = require(__dirname + '/../helper/database')

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(' : ')
};

function MapCommand(arrCmd, prefix) {
    let commandsList = [];
    for (let i = 0; i < arrCmd.length; i++) {
        commandsList.push(`│ • ${prefix + arrCmd[i]}`)
    }
    return commandsList.join`\n`
}

function ListCommand(tag, p) {
    let list = []
    if (list.length < 1) {
        Object.values(global.plugins).filter(v => v.tag === tag).forEach(e => {
            e.help.map(va => list.push(va))
        })
    }
    return MapCommand(list, p)
}


async function user() {
    let _a = await db.GETUser();
    return Object.keys(await _a).length
}


const handler = {
    async exec({ m, client, usedprefix }) {

        let mentions = [];
        let creator = '';

        let d = new Date(new Date().toGMTString())
        let locale = 'id'

        const ct = await m.getContact();
        mentions.push(await client.getContactById(ct.id._serialized));
        mentions.push(await client.getContactById(global.ownerId));
        creator += ct.id.user

        // let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(Math.pow((((d * 1) + gmt) / 84600000), 1/7))]
        let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        let week = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", "Sabtu"][d.getDay()]
        let date = `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`
        let time = new Date().toLocaleTimeString('id').replace(/\./g, ' : ')


        const message = `
╭─「 *${global.botName}* 」
│ Hai, @${creator}!
│
│ Tanggal: *${week}, ${date}*
│ Waktu: *${time}* _( GMT +00:00 )_
│ Uptime: *${clockString(process.uptime() * 1000)}*
│ Total Users: *${await user()}*
│ Prefix: 「 ! ,  # ,  / 」
╰───────
${readmore}
╭─「 Main 」
${ListCommand('Main', usedprefix)}
╰───────\n
╭─「 Sticker 」
${ListCommand('Sticker', usedprefix)}
╰───────\n
╭─「 Maker 」
${ListCommand('Maker', usedprefix)}
╰───────\n
╭─「 Owner 」
${ListCommand('Owner', usedprefix)}
╰───────\n
╭─「 Game 」
${ListCommand('Game', usedprefix)}
╰───────\n
╭─「 Group 」
${ListCommand('Group', usedprefix)}
╰───────\n
╭─「 Education 」
${ListCommand('Education', usedprefix)}
╰───────\n
╭─「 Tools 」
${ListCommand('Tools', usedprefix)}
╰───────\n
╭─「 Kerang Ajaib 」
${ListCommand('Kerang', usedprefix)}
╰───────\n
╭─「 Info 」
${ListCommand('Info', usedprefix)}
╰───────\n
╭─「 Random 」
${ListCommand('Random', usedprefix)}
╰───────

Creator : @${global.ownerId.split('@')[0]}`;
        // console.log(OwnerCommand());
        m.reply(message, m.from, {mentions: mentions})
    },
    commands: ['help', 'menu', '?'],
    tag: 'Main',
    help: ['help', 'menu', '?']
}

module.exports = handler
