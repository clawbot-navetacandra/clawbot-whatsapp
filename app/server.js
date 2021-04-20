const { spawn } = require('child_process');
const fs = require('fs')

class Helper {
    constructor() {
        this._express = require('express');
        this._app = this._express();
    }

    _main_() {
        
    }

    nulis(teks, name) {
        let d = new Date
        let fontPath = 'app/src/Zahraaa.ttf'
        let inputPath = 'app/src/nulis.jpg'
        let outputPath = 'app/src/hasil-' + name + '.jpg'
        let tgl = d.toLocaleDateString('id-Id')
        let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
        return spawn('convert', [
            inputPath,
            '-font',
            fontPath,
            '-size',
            '1024x784',
            '-pointsize',
            '20',
            '-interline-spacing',
            '1',
            '-annotate',
            '+806+78',
            hari,
            '-font',
            fontPath,
            '-size',
            '1024x784',
            '-pointsize',
            '18',
            '-interline-spacing',
            '1',
            '-annotate',
            '+806+102',
            tgl,
            '-font',
            fontPath,
            '-size',
            '1024x784',
            '-pointsize',
            '20',
            '-interline-spacing',
            '-7.5',
            '-annotate',
            '+344+142',
            teks,
            outputPath
        ]);
    }

    /**
     * 
     * @param {String} text 
     * @param {String} name 
     */
    async _nulis(text, name) {
        try {
            this.nulis(text, name)
            return fs.readFileSync('app/src/hasil-' + name + '.jpg', 'base64')
        } catch (err) {
            return err
        }
    }
}

module.exports = Helper