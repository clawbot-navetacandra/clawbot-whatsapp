const db = require(`${__dirname}/../helper/database`)
const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid }) {
        if (m.mentionedIds.length >= 1) {
            let mentionId = m.mentionedIds[0].split('@')[0]
            let _a = await db.GETUser(mentionId);
            m.reply(`
╭─「 Saldo @${mentionId} 」
│ Coins : © ${Number(_a._c)}
│ Bank : © ${Number(_a._b)}
╰───────
            `, m.from, { mentions: [await client.getContactById(m.mentionedIds[0])] })
        } else {
            let _a = await db.GETUser(dbid);
            m.reply(`
╭─「 Saldo @${dbid} 」
│ Coins : © ${Number(_a._c)}
│ Bank : © ${Number(_a._b)}
╰───────
            `, m.from, { mentions: [await client.getContactById(messageFrom)] })
        }
    },
    commands: ['saldo', 'dompet', 'atm'],
    tag: 'Game',
    help:  ['saldo', 'dompet', 'atm'].map(v => v + ' <tag (optional)>')
}

module.exports = handler