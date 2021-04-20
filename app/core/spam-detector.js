module.exports = async function (from, time) {

    const fs = require('fs');
    let _log = JSON.parse(fs.readFileSync(`${__dirname}/logs.json`, 'utf-8'));

    let userLog = _log.timestampMessage.filter(e => e.id === from);

    if (userLog.length < 1) {
        _log.timestampMessage.push({
            id: from,
            timestamp: [time]
        })
        fs.writeFileSync(`${__dirname}/logs.json`, JSON.stringify(_log))
        return false
    } else {
        let log = userLog[0];
        let logTimeL = userLog[0].timestamp.length;
        // log
        if (logTimeL >= 2) {
            // let timeL = userLog[0].timestamp[logTimeL - 1] - userLog[0].timestamp[logTimeL - 2];
            let timeL = time - userLog[0].timestamp[logTimeL - 1];
            let res = timeL <= 3 ? true : false;
            if (res) {
                log.timestamp.push(time);
                fs.writeFileSync(`${__dirname}/logs.json`, JSON.stringify(_log))
                return res
            } else {
                log.timestamp.push(time);
                fs.writeFileSync(`${__dirname}/logs.json`, JSON.stringify(_log))
                return res
            }
        } else {
            log.timestamp.push(time);
            fs.writeFileSync(`${__dirname}/logs.json`, JSON.stringify(_log))
        }
    }

}