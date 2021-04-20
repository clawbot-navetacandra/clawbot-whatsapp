const handler = {
    async exec({ args, client, m, messageFrom }) {
        let ownerInfo = global.ownerContact
        let msg = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        `N:${ownerInfo[0].split(' ').join(';')};;;\n` +
        `FN:${ownerInfo[0]}\n` +
        `TEL;waid=${ownerInfo[1].replace(/ /g, '').replace(/-/g, '').replace(/\+/g, '').replace(/\(/g, '').replace(/\)/g, '')}:${ownerInfo[1]}\n` +
            'END:VCARD';
        m.reply(msg)
    },
    commands: ['owner', 'creator'],
    tag: 'Info',
    help: ['owner', 'creator']
}

module.exports = handler