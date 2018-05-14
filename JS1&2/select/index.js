/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var attributes = arguments[1];
    var filter = arguments[2];
    var result = [];
    collection.forEach(function (value) {
        if (filter(value))
            result.push(attributes(value));
    });
    return result;
}

/**
 * @params {String[]}
 */
function select() {
    var attributes = [].slice.call(arguments);
    return function (row) {
        var item = {};
        attributes.forEach(function (attr) {
            item[attr] = row[attr];
        });
        return item;
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function (item) {
        return (values.indexOf(item[property]) != -1);
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
