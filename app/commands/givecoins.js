const db = require(`${__dirname}/../helper/database`)

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid, usedprefix }) {
        if (messageFrom === global.ownerId) {
            if (args.length >= 2) {
                let nomor = args[0].replace(/\@/g, '');
                let jumlah = Number(args[1]);
                let penerimaDb = await db.GETUser(nomor);
                if (penerimaDb) {
                    await db.UPDATEUser(nomor, Math.floor(penerimaDb._c + jumlah), penerimaDb._b)
                    let id = await client.getNumberId(nomor);
                    await m.reply(`Coins berhasil ditambahkan ke @${nomor}`, m.from, {mentions: [await client.getContactById(id._serialized)]})
                } else {
                    m.reply('Nomor tidak terdaftar!')
                }
            } else {
                m.reply(`Masukkan format dengan benar!\nContoh : ${usedprefix}givecoins 6285311174928 5000`)
            }
        } else {
            m.reply('Kamu siapa? Perintah ini khusus *OWNER*')
        }
    },
    commands: ['givecoins'],
    tag: 'Owner',
    help: ['givecoins'].map(v => v + ' <Nomor atau Tag> <Jumlah>')
}

module.exports = handler