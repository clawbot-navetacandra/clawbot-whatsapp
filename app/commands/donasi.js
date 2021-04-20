
const handler = {
    async exec({ m }) {
        let donateNum = process.env.DONATE_NUM.split('|')
	let _dM = donateNum.map(v => '│ •' + v)
        m.reply(`

╭─「 Donasi 」
│ Support terus ClawBot, dengan cara donasi.
│
${_dM.join('\n')}
╰───────
        `)
    },
    commands: ['donasi'],
    tag: 'Info',
    help: ['donasi']
}

module.exports = handler