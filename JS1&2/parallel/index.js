/**
 * @param {Function[]} operations
 * @param {Function} callback
 */

module.exports = function (operations, callback) {
    var counter = 0;
    var limit = operations.length;
    var resultArray = [];

    if (limit == 0)
        callback(null, []);
    else {
        function next(error, value) {
            counter++;
            if (error == null) {
                resultArray.push(value);
                if (counter < limit)
                    operations[counter](next);
                else
                    callback(null, resultArray);
            }
            else
                callback(error);
        }

        operations[0](next);
    }
}