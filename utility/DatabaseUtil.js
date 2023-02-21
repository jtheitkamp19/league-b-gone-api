const DATABASE_LOCATION = '../discord_bot.sqlite';
const db = require('better-sqlite3')(DATABASE_LOCATION, {});
db.pragma('journal_mode = WAL');

exports.executeGet = function(statement) {
    var stmnt = db.prepare(statement);
    return stmnt.get();
};

exports.executePost = function(statement) {
    var stmnt = db.prepare(statement);
    var changeInfo = stmnt.run();
    var status = changeInfo.changes == 1 ? 200 : 400;

    return {
        "status": status,
        "saveId": changeInfo.lastInsertRowid
    };
};

module.exports = exports;