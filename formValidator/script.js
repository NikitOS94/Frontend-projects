'use strict';

function lettersValidator(str) {
    var reg = /^[a-zа-я]*$/;
    return reg.test(str.toLowerCase());
}

function intNumberValidator(field, className) {
    if (isNaN(field.value))
        field.classList.add(className);
}

function isNumberBetween(num, min, max) {
    var isValid = true;

    if (max != NaN) isValid = (num <= max);
    if (min != NaN && isValid) isValid = (num >= min);

    return isValid;
}

function isRegexValid(reg, value) {
    var regr = new RegExp(reg);
    return regr.test(value) || value.length === 0;
}

function focus(field, className) {
    field.classList.remove(className);
}

function checkEmptyString(field) {
    return (field.value.length == 0);
}

function isNumber(num) {
    return !isNaN(num);
}

function checkForm(form, fields, inputErrorClass, formValidClass) {
    var isFormValid = true;
    fields.forEach(function (field) {
        if ('required' in field.dataset)
            if (checkEmptyString(field)) {
                field.classList.add(inputErrorClass);
                isFormValid = false;
            }
        switch (field.dataset.validator) {
            case 'number':
                if (!isNumber(field.value)) {
                    field.classList.add(form.inputErrorClass);
                    isFormValid = false;
                }

                if ('validatorMin' in field.dataset && 'validatorMax' in field.dataset)
                    if (!isNumberBetween(
                            Number(field.value),
                            Number(field.dataset.validatorMin),
                            Number(field.dataset.validatorMax)
                        )) {
                        field.classList.add(form.inputErrorClass);
                        isFormValid = false;
                    }
                break;

            case 'regexp':
                if (!isRegexValid(field.dataset.validatorPattern, field.value)) {
                    field.classList.add(form.inputErrorClass);
                    isFormValid = false;
                }
                break;

            case 'letters':
                if (!lettersValidator(field.value)) {
                    event.target.classList.add(form.inputErrorClass);
                    isFormValid = false;
                }
                break;
        }
    });

    form.classList.add(isFormValid ? formValidClass : inputErrorClass);
    form.classList.remove(isFormValid ? inputErrorClass : formValidClass);
}

// Код валидации формы
function validateForm(form) {
    var forma = document.querySelector('#' + form.formId);
    var button = document.querySelector('#' + form.formId + ' > button');
    var inputs = Array.from(document.querySelectorAll('#' + form.formId + ' > input'));
    var hasNotError = true;

    button.addEventListener('click', function (event) {
        checkForm(forma, inputs, form.formInvalidClass, form.formValidClass);
        event.preventDefault();
    });

    button.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            // checkForm(forma, inputs, form.formInvalidClass, form.formValidClass);
            event.preventDefault();
        }
    });

    inputs.forEach(function (value) {
        value.addEventListener('focus', function (event) {
            focus(event.target, form.inputErrorClass);
        });

        if ('required' in value.dataset) {
            value.addEventListener('blur', function (event) {
                if (checkEmptyString(event.target))
                    value.classList.add(form.inputErrorClass);
            });
        }
        switch (value.dataset.validator) {
            case 'number':
                value.addEventListener('blur', function (event) {
                    if (!isNumber(event.target.value))
                        event.target.classList.add(form.inputErrorClass);
                });

                if ('validatorMin' in value.dataset && 'validatorMax' in value.dataset)
                    value.addEventListener('blur', function (event) {
                        var field = event.target;
                        if (!isNumberBetween(
                                Number(field.value),
                                Number(field.dataset.validatorMin),
                                Number(field.dataset.validatorMax)
                            ))
                            field.classList.add(form.inputErrorClass);
                    });
                break;

            case 'regexp':
                value.addEventListener('blur', function (event) {
                    if (!isRegexValid(event.target.dataset.validatorPattern, event.target.value))
                        event.target.classList.add(form.inputErrorClass);
                });
                break;

            case 'letters':
                value.addEventListener('blur', function (event) {
                    if (!lettersValidator(event.target.value))
                        event.target.classList.add(form.inputErrorClass);
                });
                break;
        }
    });
}