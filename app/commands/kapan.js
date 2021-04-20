function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
};

const handler = {
    async exec({ m, client, args }) {
        const pertanyaan = m.body.slice(1);
        const jawaban = `${Math.floor(Math.random() * 10)} ${pickRandom(['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun', 'dekade', 'abad'])} lagi ...`
        if (args.length >= 1) {
            if (m.mentionedIds) {
                const contact = []
                for (let i = 0; i < m.mentionedIds.length; i++) {
                    contact.push(await client.getContactById(m.mentionedIds[i]))
                }
                m.reply(`*Pertanyaan:* ${m.body.slice(1)}\n*Jawaban:* ${jawaban}`, m.from, {mentions: contact})
            } else {
                m.reply(`*Pertanyaan:* ${pertanyaan}\n*Jawaban:* ${jawaban}`)
            }
        } else {
            m.reply('Pertanyaannya?')
        }
    },
    commands: ['', 'kah'].map(v => 'kapan'+v),
    help: ['', 'kah'].map(v => 'kapan' + v + ' <Pertanyaan>'),
    tag: 'Kerang'
}

module.exports = handler