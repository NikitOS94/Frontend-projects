module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this._size = 0;
    this._data = [];
}

// Методы коллекции
Collection.prototype.values = function () {
    return this._data;
};

Collection.prototype.append = function (element) {
    if (element instanceof Collection)
        this._data = this._data.concat(element.values());
    else
        this._data.push(element);
};

Collection.prototype.count = function () {
    return this._data.length;
};

Collection.prototype.at = function (elementPosition) {
    return this._positionValidator(elementPosition) ?  this._data[elementPosition - 1] : null;
};

Collection.prototype.removeAt = function (elementPosition) {
    var isValid = this._positionValidator(elementPosition);
    if (isValid) this._data.splice(elementPosition - 1, 1);
    return isValid;
};

Collection.prototype._positionValidator = function (position) {
    return position > 0 && position <= this.count();
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (array) {
    return array.reduce(
        function (collection, item) {
            collection.append(item);

            return collection;
        },
        new Collection()
    );
};
