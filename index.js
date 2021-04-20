const main = require(`${__dirname}/app/main`);
const fs = require('fs');
const path = require('path');
const { AntiIdling } = require('./app/anti-idling')
require('dotenv').config()
global.f = require('firebase');
global.ownerId = process.env.owner_id;
global.ownerContact = [process.env.owner_name, process.env.owner_num];
global.botId = process.env.bot_id;
global.botName = process.env.bot_name;
global.API_URL = process.env.API_URL

require('firebase/database');


(() => {
    global.f.initializeApp({
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DB_URL,
        projectId: process.env.P_ID,
        storageBucket: process.env.S_BUCKET,
        messagingSenderId: process.env.MS_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.M_ID,
    });
    global.commandsFolder = path.join(__dirname, 'app','commands')
    global.commandsFilter = filename => /\.js$/.test(filename)
    global.plugins = {}
    for (let filename of fs.readdirSync(global.commandsFolder).filter(global.commandsFilter)) {
        try {
            global.plugins[filename] = require(path.join(global.commandsFolder, filename))
            let plug = global.plugins[filename]
            if (!plug.commands && !plug.tag && !plug.help) {
                delete global.plugins[filename]
            }
        } catch (e) {
            console.error(e)
            delete global.plugins[filename]
        }
    };
    global.commandsName = [];
    Object.values(global.plugins).forEach(v => v.commands.map(v => global.commandsName.push(v)))
    global.db = global.f.database();
    AntiIdling.run()
    
    main.Run()
    // main.client.clea
    
    process.on('exit', () => {
        // console.clear()
        console.log('ENDED!');
    })
})();