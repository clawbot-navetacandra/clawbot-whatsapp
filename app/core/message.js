const fs = require('fs');
const db = require(`${__dirname}/../helper/database`);
const logMSG = require(`${__dirname}/../log`);
const spamDetector = require('./spam-detector')
const antiOverload1 = require('./anti-overload1')
const antiOverload2 = require('./anti-overload2')

function rm(array, v){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === v){
            array.splice(i, 1);
            break;
        }
    }
}

module.exports = function (client, media) {
    client.on('message', async message => {
        const PREFIX = ['/', '#', '!'];
        const from = message.author ? message.author : message.from;

        
        let dbId = from.split('@')[0];
        await client.sendSeen(message.from)
        /* Logging Message from */
        logMSG(message, global.commandsName, from, PREFIX)

        /* Register User to DB */
        let uDb = await db.GETUser(dbId)
        message.mentionedIds.length < 1 ? '' : message.mentionedIds.map(async v => await db.GETUser(v.split('@')[0]) ? '' : await db.POSTUser(v.split('@')[0]))
        uDb ? '' : await db.POSTUser(dbId)

        /* Filter Command Message */
        if (!PREFIX.includes(message.body.charAt(0)) || message.from === 'status@broadcast') return;

        /* Spam Detector */
        
        let args = message.body.slice(1).split(/ +/);
        const cmnd = args.shift().toLowerCase();



        if (global.commandsName.includes(cmnd)) {
            let _isSpam = await spamDetector(from, await message.timestamp);
            let anti = await antiOverload1(message.from, message.id._serialized)
            
            
            if (_isSpam) {
                if (anti._is) {
                    let anti1 = await antiOverload2(message.from, message.id._serialized)
                    console.log(anti1);
                    if (anti1._is) {
                        return
                    } else {
                        client.sendMessage(anti1.from, `*「 ${global.botName} Anti-Overload Message 」*\n\nMohon kirim ulang pesan anda nanti.`, {quotedMessageId: anti.chatId})
                    }
                } else {
                    message.reply(`*「 SPAM DETECTION 」*\n\n@${dbId} terlalu sering melakukan request. Mohon coba lagi nanti!`,
                    message.from, { mentions: [await client.getContactById(from)] })
                }
            } else {
                if (anti._is) {
                    let anti1 = await antiOverload2(message.from, message.id._serialized)
                    if (anti1._is) {
                        return
                    } else {
                        client.sendMessage(anti1.from, `*「 ${global.botName} Anti-Overload Message 」*\n\nMohon kirim ulang pesan anda nanti.`, {quotedMessageId: anti.chatId})
                    }
                } else {
                    // const c = require(global.commands.filter(v => v.commands.includes(cmnd))[0].require);
                    const c = Object.values(global.plugins).filter(v => v.commands.includes(cmnd))[0]
                    c.exec({
                        m: message,
                        args: args,
                        client: client,
                        MessageMedia: media,
                        messageFrom: from,
                        dbid: dbId,
                        usedprefix: message.body.charAt(0),
                        teks: message.body.slice(cmnd.length + 2)
                    });
                }
            }
        };
    });
}