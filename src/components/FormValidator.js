export default class FormValidator {
    constructor(config = {}, popupSelector) {
        this.popupSelector = document.querySelector(popupSelector);
        this.formSelector = this.popupSelector.querySelector(config.formSelector);
        this.inputList = Array.from(this.formSelector.querySelectorAll(config.inputSelector));
        this.buttonElement = this.formSelector.querySelector(config.submitButtonSelector);
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.errorClass = config.errorClass;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
        console.log()
    };

    _hideInputError(inputElement) {
        const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
          this.buttonElement.classList.add(this.inactiveButtonClass);
          this.buttonElement.setAttribute("disabled", "disabled");
        } else {
          this.buttonElement.classList.remove(this.inactiveButtonClass);
          this.buttonElement.removeAttribute("disabled", "disabled");
        }
    }

    _setEventListeners() {
        this.formSelector.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState();
                this._checkInputValidity(inputElement);
            })
            if (inputElement.value !== '') {
                this._checkInputValidity(inputElement);
            }
        })

        this._toggleButtonState();
    };

    enableValidation() {
      this._setEventListeners();
        // this.formList.forEach((formElement) => {
        //     formElement.closest(this.form), addEventListener('click', () => {
        //         this._setEventListeners(formElement);
        //     })
        // });
    }

};
