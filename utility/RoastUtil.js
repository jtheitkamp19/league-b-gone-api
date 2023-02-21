var DatabaseUtil = require('../utility/DatabaseUtil');
var Util = require('./Util');

exports.getIdForRoast = function(type, paramId) {
    if (!_.isUndefined(paramId)) {
        return _.isNumber(paramId) && !_.isNaN(paramId) ? paramId : parseInt(paramId);
    }

    var randomId = Util.getRandomInclusiveNumber(1, getCountForType(type));
    return randomId;
};

exports.getRoast = function(type, id) {
    var selectStatement = `SELECT * FROM ${type} WHERE id = ${id}`;
    return DatabaseUtil.executeGet(selectStatement);
};

exports.saveRoast = function(type, roastData, module) {
    var roastDataModule = new module(roastData);
    return DatabaseUtil.executePost(roastDataModule.getSQLInsertionString());
};

function getCountForType(type) {
    var COUNT_COLUMN_NAME = 'count';
    var selectStatement = `SELECT COUNT(*) as ${COUNT_COLUMN_NAME} FROM ${type}`;

    return DatabaseUtil.executeGet(selectStatement)[COUNT_COLUMN_NAME];
};

module.exports = exports;