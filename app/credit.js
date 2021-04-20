const Cfonts = require('cfonts');
const package = require('../package.json')

function handler() {
    Cfonts.say('ClawBot', {
        align: 'center',
        gradient: ['red', 'magenta']
    })
    Cfonts.say(`${package.name} By ${package.author}`, {
        font: 'console',
        align: 'center',
        gradient: ['red', 'magenta']
    })
}
module.exports = handler