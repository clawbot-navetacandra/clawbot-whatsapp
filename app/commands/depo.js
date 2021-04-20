const db = require(`${__dirname}/../helper/database`);

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid, usedprefix }) {
        let userDb = await db.GETUser(dbid);
        if (args.length >= 1) {
            let numDepo = args[0].toLowerCase() === 'all' ? userDb._c : Number(args[0]);
            if (!isNaN(numDepo)) {
                if (userDb._c >= numDepo) {
                    let resCoins = userDb._c - numDepo;
                    let resBank = userDb._b + numDepo;
                    await m.reply('Saldo berhasil dipindahkan!');
                    await db.UPDATEUser(dbid, resCoins, resBank)
                } else {
                    m.reply('Coins anda tidak cukup!');
                }
            } else {
                m.reply(`Tuliskan format dengan benar!\nContoh : ${usedprefix}depo 5000`);
            }
        } else {
            m.reply(`Tuliskan jumlah yang ingin di deposit!\nContoh : ${usedprefix}depo 5000`);
        }
    },
    commands: ['', 'sit'].map(v => 'depo'+v),
    tag: 'Game',
    help:  ['', 'sit'].map(v => 'depo'+v + ' <Jumlah>')
}

module.exports = handler