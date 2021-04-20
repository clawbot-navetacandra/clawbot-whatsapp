const { createCanvas } = require('canvas');
const {CanvasTextWrapper} = require('canvas-text-wrapper');
const fs = require('fs')

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
};

const helper = function (text) {
    const canvas = createCanvas(720, 720);
    const ctx = canvas.getContext('2d')

    const options = {
        font: `italic 700 ${canvas.width * (100 / canvas.width)}px Verdana`,
        textAlign: 'center',
        verticalAlign: 'middle',
        allowNewLine: true,
        // sizeToFill: true,
        // justifyLines: true,
    };
    
    const bgColorList = [
        { start: 'rgb(238,74,104)', stop: 'rgb(255,235,187)' },
        { start: 'rgb(255,152,102)', stop: 'rgb(255,95,98)' },
        { start: 'rgb(255,99,109)', stop: 'rgb(255,193,113)' }
    ];
    const bgColor = pickRandom(bgColorList);
    let bgLinear = ctx.createRadialGradient(0,0,720,720);
    bgLinear.addColorStop(0, bgColor.start);
    bgLinear.addColorStop(1, bgColor.stop);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 720, 720)

    ctx.fillStyle = bgLinear;
    // ctx.textAlign = 'center';
    // ctx.fillText(`HARTA\nTAHTA\n${text.toUpperCase()}`, canvas.width / 2, canvas.width / 3)
    CanvasTextWrapper(canvas, `HARTA\nTAHTA\n${text.toUpperCase()}`, options)
    fs.writeFileSync(`${__dirname}/../src/tahta.jpg`, new Buffer.from(canvas.toDataURL('image/jpeg').replace('data:image/jpeg;base64,', ''), 'base64'))
}

module.exports = helper