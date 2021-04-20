function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
};

const handler = {
    async exec({ m, client, args }) {
        const pertanyaan = m.body.slice(1);
        const jawaban = pickRandom(['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin']);
        if (args.length >= 1) {
            if (m.mentionedIds) {
                const contact = []
                for (let i = 0; i < m.mentionedIds.length; i++) {
                    contact.push(await client.getContactById(m.mentionedIds[i]))
                }
                m.reply(`*Pertanyaan:* ${pertanyaan}\n*Jawaban:* ${jawaban}`, m.from, { mentions: contact })
            } else {
                m.reply(`*Pertanyaan:* ${pertanyaan}\n*Jawaban:* ${jawaban}`)
            }
        } else {
            m.reply('Pertanyaannya?')
        }
    },
    commands: ['apakah'],
    help: ['apakah'].map(v => v + ' <Pertanyaan>'),
    tag: 'Kerang'
};

module.exports = handler