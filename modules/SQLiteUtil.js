var _ = require('underscore');

exports.getEscapedStringForSQL = function(string) {
    var escapedString = '';

    if (_.isString(string)) {
        escapedString = string
            .replace(/[$]/g, '&dollar;')
            .replace(/\r?\n/g, '&#10;')
            .replace(/'/g, '&#39;')
            .replace(/\\/g, '&#92;')
            .replace(/"/g, "&quot;");
    } else if (_.isNumber(string) && !_.isNaN(string)) {
        escapedString = string;
    }

    return escapedString;
};

exports.getUnescapedStringForSQL = function(string) {
    var unescapedString = '';

    if (_.isString(string)) {
        unescapedString = string
            .replace(/&dollar;/g, '$')
            .replace(/&#10;/g, '?')
            .replace(/&#39;/g, "'")
            .replace(/&#039;/g, "'")
            .replace(/&#92;/g, '\\')
            .replace(/&quot;/g, '"');
    } else if (_.isNumber(string) && !_.isNaN(string)) {
        unescapedString = string;
    }

    return unescapedString;
};

exports.parseObject = function(object) {
    if (_.isObject(object)) {
        _.mapObject(object, function(val, key) {
            if (!_.isNaN(val) && _.isNumber(val)) {
                return val;
            } else {
                return exports.getUnescapedStringForSQL(val);
            }
        });
    }
};

exports.parseObjArray = function(array) {
    if (_.isArray(array)) {
        var newArray = [];

        _.each(array, function(objectInList) {
            var newObject = {};

            _.each(_.keys(objectInList), function(keyInList) {
                newObject[keyInList] = exports.getUnescapedStringForSQL(objectInList[keyInList]);
            });

            newArray.push(newObject);
        });

        return newArray;
    }

    return array;
};

module.exports = exports;