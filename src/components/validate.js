export default class FormValidator {
    constructor(config = {}, form) {
        this.formSelector = config.formSelector;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.errorClass = config.errorClass;
        this.form = form;
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
        console.log(2)
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
        console.log(1)
    };

    _checkInputValidity(formElement, inputElement) {
        console.log('check')
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
        }
    }

    _setEventListeners(formElement) {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
        const buttonElement = formElement.querySelector(this.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function() {
                this._toggleButtonState(inputList, buttonElement);
                this._checkInputValidity(formElement, inputElement);
            })
            if (inputElement.value !== '') {
                this._checkInputValidity(formElement, inputElement);
            }
        })
        this._toggleButtonState(inputList, buttonElement);
    };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this.formSelector));
        formList.forEach((formElement) => {
            formElement.closest(this.form), addEventListener('click', () => {
                this._setEventListeners(formElement);
            })
        });
    }

};