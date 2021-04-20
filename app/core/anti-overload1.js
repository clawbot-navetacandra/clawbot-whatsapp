module.exports = async function (lastMsgId, chatId) {

    const fs = require('fs');

    const logsFile = JSON.parse(fs.readFileSync(`${__dirname}/overload-logs.json`, 'utf-8'));
    const time = new Date().getTime() / 1000

    const botLogs = logsFile.timestampMessage.filter(e => e.id === global.botId);

    if (botLogs.length < 1) {
        logsFile.timestampMessage.push({
            id: global.botId,
            timestamp: [time],
            lastMsgId: [lastMsgId, chatId]
        })
        fs.writeFileSync(`${__dirname}/overload-logs.json`, JSON.stringify(logsFile));
        return false
    } else {

        let log = botLogs[0]
        let logTL = log.timestamp.length

        let timeL = time - log.timestamp[logTL - 1];
        let res = timeL >= 1.5 ? false : true;
        if (res) {
            log.lastMsgId = [lastMsgId, chatId];
            fs.writeFileSync(`${__dirname}/overload-logs.json`, JSON.stringify(logsFile));
            return {
                from: lastMsgId,
                chatId: chatId,
                time: time,
                _is: res
            }
        } else {
            log.lastMsgId = [lastMsgId, chatId];
            log.timestamp.push(time)
            fs.writeFileSync(`${__dirname}/overload-logs.json`, JSON.stringify(logsFile));
            return {
                from: lastMsgId,
                chatId: chatId,
                time: time,
                _is: res
            }
        }

    }


}