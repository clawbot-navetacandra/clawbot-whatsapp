const { performance } = require('perf_hooks');

const handler = {
    async exec({ m }) {
        let old = performance.now();
        let neww = performance.now();
        setTimeout(() => {
            m.reply('Respond in ' + (neww - old) + ' ms')
        }, 1500);
    },
    commands: ['speed', 'ping'],
    tag: 'Info',
    help: ['speed', 'ping']
};

module.exports = handler