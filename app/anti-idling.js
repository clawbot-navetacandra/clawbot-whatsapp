const rp = require('request-promise');
const express = require('express');
const app = express()

class AntiIdling {
    constructor(interval = 60000) {
        this.interval = interval
    }

    run() {
        this.setupServer()
        this.runServer()
        this.URL = process.env.APP_URL
        setInterval(async () => {
            try {
                await rp.get(`http://${this.URL || 'localhost'}/anti-idling`)
            } catch (e) {
                return
            }
        }, this.interval);
    }

    setupServer() {
        app.get('/anti-idling', (req, res) => {
            // req.connection.localAddress
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
            res.json({
                status: 200,
                host: req.hostname,
                protocol: req.protocol,
                ip: ip
            })
        })
    }

    runServer() {
        app.listen(process.env.PORT || 80)
    }
}

module.exports = {
    AntiIdling: new AntiIdling,
    app: app
}