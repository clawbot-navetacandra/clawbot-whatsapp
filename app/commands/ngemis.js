const db = require(`${__dirname}/../helper/database`);
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
};

const ngemisCD = {
    list: async function () {
        let _a = await global.db.ref('cooldown/ngemis').get();
        let _b = _a.val();
        return Object.keys(_b)
    },
    update: async function (uid, data) {
        await global.db.ref(`cooldown/ngemis/${uid}`).set(data);
    }
}

async function getDb(uid) {
    let a = await db.GETUser(uid);
    return a
}

const handler = {
    async exec({ m, args, MessageMedia, client, messageFrom, dbid }) {
        let data = await getDb(dbid)
        let listCd = await ngemisCD.list()
        let percentage = [];
        for (let j = 0; j < 30; j++) {
            percentage.push(j)
        }
        if (!listCd.includes(dbid)) {
            await ngemisCD.update(dbid, {_is: 1})
            let _is = [];
            for (let j = 0; j < 50; j++) {
                _is.push(pickRandom([true, false, true, false, true, false, true, false, true, false, true, false]))
            }
            let is = pickRandom(_is)
            if (is) {
                let _dCoins = Math.round(Math.floor(5000 * pickRandom(percentage) / 100))
                m.reply(`Selamat kamu mendapatakan © ${_dCoins} Coins, dari *NGEMIS*`);
                db.UPDATEUser(dbid, data._c + _dCoins, data._b)
                setTimeout(async () => {
                    await ngemisCD.update(dbid, {})
                }, 5000);
            } else {
                m.reply(`Kamu tidak mendapatakan apa-apa, dari *NGEMIS*`);
                setTimeout(async () => {
                    await ngemisCD.update(dbid, {})
                }, 5000);
            }
        } else {
            m.reply(`Kamu sedang cooldown! Jangan *NGEMIS* teruss!!`);
        }
    },
    commands: ['ngemis'],
    tag: 'Game',
    help:  ['ngemis']
}

module.exports = handler