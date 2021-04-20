const db = require(`${__dirname}/../helper/database`);

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid, usedprefix }) {
        if (args.length >= 2) {
            if (m.mentionedIds.length >= 1) {
                if (!args[1].includes('@')) {
                    let userDb = await db.GETUser(dbid);
                    let numPay = args[1].toLowerCase() === 'all' ? userDb._c : Number(args[1]);
                    if (!isNaN(numPay)) {
                        if (userDb._c >= numPay) {
                            let penerima = m.mentionedIds[0].split('@')[0];
                            let penerimaDb = await db.GETUser(penerima);
                            let resCoinsSend = userDb._c - numPay;
                            let resCoinsPenerima = penerimaDb._c + numPay;
                            await db.UPDATEUser(dbid, resCoinsSend, userDb._b)
                            await db.UPDATEUser(penerima, resCoinsPenerima, penerimaDb._b)
                            await m.reply(`Saldo berhasil dikirm ke @${penerima}, Sebesar © ${numPay}`, m.from, {mentions: [await client.getContactById(m.mentionedIds[0])]});
                        } else {
                            m.reply('Coins anda tidak cukup!');
                        }
                    } else {
                        m.reply(`Tuliskan format dengan benar!\nContoh : ${usedprefix}pay @6285311174928 5000`, m.from, {mentions: [await client.getContactById(global.ownerId)]});
                    }
                } else {
                    m.reply(`Tuliskan format dengan benar!\nContoh : ${usedprefix}pay @6285311174928 5000`, m.from, {mentions: [await client.getContactById(global.ownerId)]});
                }
            } else {
                m.reply('Tag penerima!')
            }
        } else {
            m.reply(`Tuliskan jumlah yang ingin di transfer!\nContoh : ${usedprefix}pay @6285311174928 5000`, m.from, {mentions: [await client.getContactById(global.ownerId)]});
        }
    },
    commands: ['pay', 'send', 'give'],
    tag: 'Game',
    help:  ['pay', 'send', 'give'].map(v => v + ' <Tag> <Jumlah>')
}

module.exports = handler