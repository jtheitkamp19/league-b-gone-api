exports.getRandomInclusiveNumber = function(min, max) {
    console.log(`Generating random number between ${min} and ${max}`);
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(`value: ${value}`);
    return value;
};

module.exports = exports;