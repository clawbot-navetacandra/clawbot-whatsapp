const db = require(`${__dirname}/../helper/database`);
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
};

async function getDb(uid) {
    let a = await db.GETUser(uid);
    return a
}

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid }) {
        let percentage = [];
        for (let j = 0; j < 30; j++) {
            percentage.push(j)
        }
        let botsuit = []
        for (let j = 0; j < 60; j++) {
            botsuit.push('kertas')
            botsuit.push('batu')
            botsuit.push('guntig')
        }
        if (args.length >= 1) {
            let pilihanSuit = ['kertas', 'batu', 'gunting'];
            if (pilihanSuit.includes(args[0].toLowerCase())) {
                let player = args[0].toLowerCase();
                let bot = pickRandom(pilihanSuit);
                let data = await getDb(dbid);
                let coinsRes = data._c * pickRandom(percentage) / 100;
                if (player === bot) {
                    let res = Math.floor(Math.round(((data._c - coinsRes) * .025) + data._c))
                    m.reply(`*Hasil :* SERI / DRAW\n*ClawBot :* ${bot}\n@${dbid} : ${args[0]}\n*Sisa coins kamu :* © ${res}`, m.from, {mentions: [await client.getContactById(messageFrom)]});
                    db.UPDATEUser(dbid, res, data._b)
                } else if (player === 'kertas' && bot === 'batu' || player === 'batu' && bot === 'gunting' || player === 'gunting' && bot === 'kertas') {
                    let res = Math.floor(Math.round((data._c + coinsRes)))
                    m.reply(`*Hasil :* Menang\n*ClawBot :* ${bot}\n@${dbid} : ${args[0]}\n*Sisa coins kamu :* © ${res}`, m.from, {mentions: [await client.getContactById(messageFrom)]});
                    db.UPDATEUser(dbid, res, data._b)
                } else if (bot === 'kertas' && player === 'batu' || bot === 'batu' && player === 'gunting' || bot === 'gunting' && player === 'kertas') {
                    let res = Math.round(Math.floor((data._c - (coinsRes * .75))))
                    m.reply(`*Hasil :* Kalah\n*ClawBot :* ${bot}\n@${dbid} : ${args[0]}\n*Sisa coins kamu :* © ${res}`, m.from, {mentions: [await client.getContactById(messageFrom)]})
                    db.UPDATEUser(dbid, res, data._b)
                }
            } else {
                m.reply('Kamu hanya bisa memilih Kertas, Batu, ataupun Gunting!')
            }
        } else {
            m.reply('Masukan format dengan benar!\nContoh : #suit kertas')
        }
    },
    commands: ['suit'],
    tag: 'Game',
    help:  ['suit'].map(v => v + ' <Pilihan Suit>')
}

module.exports = handler