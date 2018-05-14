// Телефонная книга
var phoneBook = {};

function addPhone(user, numbers) {
    if (phoneBook[user] === undefined)
        phoneBook[user] = numbers;
    else {
        phoneBook[user] = phoneBook[user].concat(numbers);
    }
}

function removePhone(number) {
    var keys = Object.keys(phoneBook);
    var isRemoved = false;
    var id;
    keys.forEach(function (key) {
        id = phoneBook[key].indexOf(number);
        if (id != -1) {
            isRemoved = true;
            phoneBook[key].splice(id, 1);
            return isRemoved;
        }
    });

    return isRemoved;
}

function show() {
    var result = [];
    var keys = Object.keys(phoneBook).sort();
    keys.forEach(function (key) {
        if (phoneBook[key].length > 0)
            result.push(key + ': ' + phoneBook[key].join(', '));
    });
    return result;
}

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    var data = command.split(" ");
    switch (data[0]) {
        case 'ADD':
            addPhone(data[1], data[2].split(","));
            break;
        case 'REMOVE_PHONE':
            return removePhone(data[1]);
            break;
        case 'SHOW':
            return show();
            break;
        default:
    }
};
