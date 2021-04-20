const db = require(`${__dirname}/../helper/database`);


function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
};

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid }) {

        let _iG = [];
        for (let i = 0; i < 30; i++) {
            _iG.push(pickRandom([true, false, true, false]))
        }

        let percentage = [];
        for (let j = 0; j < 30; j++) {
            percentage.push(j)
        }
        let percentage1 = [];
        for (let j = 0; j < 25; j++) {
            percentage1.push(j)
        }

        let _isGet = pickRandom(_iG);
        let userDb = await db.GETUser(dbid)

        if (userDb._c >= 1000) {
            if (m.mentionedIds.length >= 1) {
                if (m.mentionedIds[0] !== global.ownerId) {
                    if (m.mentionedIds[0] !== global.botId) {
                        let tujuan = m.mentionedIds[0].split('@')[0];
                        let tujuanDb = await db.GETUser(tujuan);
                        if (tujuanDb._c >= 1000) {
                            if (_isGet) {
                                let coinsRes = tujuanDb._c * pickRandom(percentage) / 100;
                                let ygdicuri = Math.floor((tujuanDb._c - (coinsRes * .5)) * pickRandom(percentage1) / 100);
                                await db.UPDATEUser(dbid, userDb._c + ygdicuri, userDb._b)
                                await db.UPDATEUser(tujuan, tujuanDb._c - ygdicuri, tujuanDb._b);
                                m.reply(`Kamu berhasil mecuri © ${ygdicuri} Coins, dari @${tujuan}`, m.from, {mentions: [await client.getContactById(m.mentionedIds[0])]})
                            } else {
                                let coinsRes = tujuanDb._c * pickRandom(percentage) / 100;
                                let gagalmencuri = Math.floor((tujuanDb._c - (coinsRes * .75)));
                                let denda = Math.floor(gagalmencuri * .4)
                                await db.UPDATEUser(dbid, userDb._c - denda, userDb._b)
                                await db.UPDATEUser(tujuan, tujuanDb._c + (Math.floor(denda / .25)), tujuanDb._b);
                                m.reply(`Kamu gagal mecuri ${gagalmencuri} Coins, dari @${tujuan}\nKamu mendapat denda sebesar © ${denda} Coins`, m.from, {mentions: [await client.getContactById(m.mentionedIds[0])]})
                            }
                        } else {
                            m.reply('Orang yang ingin dicuri harus memiliki setidaknya © 1000 Coins!')
                        }
                    } else {
                        m.reply('Bot mana bisa di rob!!')
                    }
                } else {
                    m.reply('Owner bot mana bisa di rob!!')
                }
            } else {
                m.reply('Tag orang yang ingin dicuri!')
            }
        } else {
            m.reply('Kamu harus memiliki setidaknya © 1000 Coins!')
        }

    },
    commands: ['rob', 'curi'],
    tag: 'Game',
    help:  ['rob', 'curi'].map(v => v + ' <Tag>')
}

module.exports = handler