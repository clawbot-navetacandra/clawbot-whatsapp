module.exports = async function (lastMsgId, chatId) {

    const fs = require('fs');

    const logsFile = JSON.parse(fs.readFileSync(`${__dirname}/overload-logs.json`, 'utf-8'));
    const time = new Date().getTime() / 1000

    const botLogs = logsFile.timestampMessage.filter(e => e.id === global.botId);

    let log = botLogs[0]
    let logTL = log.timestamp.length

    let timeL = time - log.timestamp[logTL - 1];
    let res = timeL >= 2.5 ? false : true;
    if (res) {
        return {
            from: lastMsgId,
            chatId: chatId,
            _is: res
        }
    } else {
        return {
            from: lastMsgId,
            chatId: chatId,
            _is: res
        }
    }


}