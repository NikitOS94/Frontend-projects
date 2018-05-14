/**
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
'use Strict';

module.exports = function (a, b) {
    if(!isNaN(a) && !isNaN(b))
        return parseInt(a, 10)+parseInt(b, 10);
    else return NaN;
};
