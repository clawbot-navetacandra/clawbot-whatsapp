const db = require(`${__dirname}/../helper/database`);

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid,usedprefix }) {
        let userDb = await db.GETUser(dbid);
        if (args.length >= 1) {
            let numWith = args[0].toLowerCase() === 'all' ? userDb._b : args[0].toLowerCase() == 'half' ? userDb._b/2 : Number(args[0]);
            if (!isNaN(numWith)) {
                if (userDb._b >= numWith) {
                    let resCoins = userDb._c + numWith;
                    let resBank = userDb._b - numWith;
                    await m.reply('Saldo berhasil dipindahkan!');
                    await db.UPDATEUser(dbid, resCoins, resBank)
                } else {
                    m.reply('Saldo Bank anda tidak cukup!');
                }
            } else {
                m.reply(`Tuliskan format dengan benar!\nContoh : ${usedprefix}withdraw 5000`);
            }
        } else {
            m.reply(`Tuliskan jumlah yang ingin di deposit!\nContoh : ${usedprefix}withdraw 5000`);
        }
    },
    commands: ['draw', ''].map(v => 'with' + v),
    tag: 'Game',
    help: ['draw', ''].map(v => 'with' + v + ' <Jumlah>')
}

module.exports = handler