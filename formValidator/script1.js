'use strict';

// Код валидации формы

function validateForm(params) {

    function validateInput(input) {
        if (input.dataset.validator === 'letters') {
            return validateLetters(input);
        } else if (input.dataset.validator === 'regexp') {
            return validateRegexp(input);
        } else if (input.dataset.validator === 'number') {
            return validateNumber(input);
        }
        return true;
    }

    function validateLetters(input) {

        var isValid = /^[a-zа-я]*$/.test(input.value.toLowerCase());

        if (isValid && input.dataset.required !== undefined) {
            isValid = input.value.length !== 0;
        }

        return isValid;
    }

    function validateRegexp(input) {
        if (input.value.length === 0)
            return true;
        else {
            var re = new RegExp(input.dataset.validatorPattern);
            var phone = input.value;
            return re.test(phone);
        }

    }

    function validateNumber(input) {
        if (input.value.length === 0)
            return true;
        else {
            var number = Number(input.value);
            var isValid = !isNaN(number);

            if (isValid) {
                var min = input.dataset.validatorMin;
                if (min !== undefined) {
                    isValid = min <= number;
                }
            }

            if (isValid) {
                var max = input.dataset.validatorMax;
                if (max !== undefined) {
                    isValid = number <= max;
                }
            }

            return isValid;
        }
    }

    function validateForm(form, formValidClass, formInvalidClass, inputErrorClass) {
        var validateResult = validateFormFields(form);
        validateResult.valid.forEach(function (input) {
            input.classList.remove(inputErrorClass);
        });

        validateResult.invalid.forEach(function (input) {
            input.classList.add(inputErrorClass);
        });

        if (validateResult.invalid.length !== 0) {
            form.classList.remove(formValidClass);
            form.classList.add(formInvalidClass);
        }
        else {
            form.classList.remove(formInvalidClass);
            form.classList.add(formValidClass);
        }
    }

    function validateFormFields(form) {
        var inputs = Array.from(form.querySelectorAll('input'));
        var validationResult = {valid: [], invalid: []};

        for (var i in inputs) {
            if (validateInput(inputs[i])) {
                validationResult.valid.push(inputs[i]);
            }
            else {
                validationResult.invalid.push(inputs[i]);
            }
        }

        return validationResult;
    }

    function validationHandler(event, formValidClass, formInvalidClass, inputErrorClass) {
        if (event.type === "submit") {
            validateForm(event.target, formValidClass, formInvalidClass, inputErrorClass);
            event.preventDefault();
        } else if (event.type === "blur") {
            var input = event.target;
            if (validateInput(input)) {
                input.classList.remove(inputErrorClass);
            }
            else {
                input.classList.add(inputErrorClass);
            }
        } else if (event.type === "focus") {
            // do nothing
        }
    }

    var form = document.getElementById(params.formId);
    var formValidClass = params.formValidClass;
    var formInvalidClass = params.formInvalidClass;
    var inputErrorClass = params.inputErrorClass;

    // setup handlers
    form.addEventListener("submit", function (event) {
        validationHandler(event, formValidClass, formInvalidClass, inputErrorClass)
    });

    Array.from(form.querySelectorAll('input')).forEach(function (input) {
        input.addEventListener("focus", function (event) {
            validationHandler(event, formValidClass, formInvalidClass, inputErrorClass)
        });
    });

    Array.from(form.querySelectorAll('input')).forEach(function (input) {
        input.addEventListener("blur", function (event) {
            validationHandler(event, formValidClass, formInvalidClass, inputErrorClass)
        });
    });
}


