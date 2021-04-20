const generateWaifu = require('waifu-generator');
const fs = require('fs')

const handler = {
    async exec({ m, MessageMedia, client }) {

        const opt = {
            filename: "waifu",
            path: `./app/src/`
        };
        let mentions = [];
        let creator = '';

        try {
            if (fs.existsSync(`${__dirname}/../src/waifu.png`)) {
                fs.unlinkSync(`${__dirname}/../src/waifu.png`)
                await generateWaifu(opt)
            } else {
                await generateWaifu(opt)
            }
            const ct = await m.getContact();
            mentions.push(await client.getContactById(ct.id._serialized));
            creator += ct.id.user
            
        } catch (err) {
            m.reply(err)
        }
        
        finally {
            let media = MessageMedia.fromFilePath(`${__dirname}/../src/waifu.png`)
            await m.reply(media, m.from, { caption: `Waifunya @${creator}.`, mentions: mentions })
        }

    },
    commands: ['waifu'],
    tag: 'Random',
    help: ['waifu']
};

module.exports = handler