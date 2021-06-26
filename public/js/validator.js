'use strict';

class Validator {
	constructor(form) {
		this.patterns = {
			"first name": /^[a-zа-яё]+$/i,
			"last name": /^[a-zа-яё]+$/i,
			phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
			email: /^[\w.-]+@\w+\.[a-z]{2,4}$/i
		};
		this.errors = {
			"first name": 'Имя должно содержать только буквы',
			"last name": 'Имя должно содержать только буквы',
			phone: 'Телефон должен быть указан в формате +7(XXX)XXX-XXXX',
			email: 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
		};
		this.errorClass = 'fieldset__error-msg';
		this.form = form;
		this.valid = false;
	}

	validateForm() {
		let errors = [...document.querySelector(this.form).querySelectorAll(`.${this.errorClass}`)];
		for (let error of errors) {
			error.remove();
		}
		let formFields = [...document.querySelector(this.form).querySelectorAll('input')];
		for (let field of formFields) {
			this.validateField(field);
		}
		if (![...document.querySelector(this.form).querySelectorAll('.fieldset__input_invalid')].length) {
			this.valid = true;
		}
	}

	validateField(field) {
		if (this.patterns[field.name]) {
			if (!this.patterns[field.name].test(field.value)) {
				field.classList.add('fieldset__input_invalid');
				this.addErrorMsg(field);
				this.watchField(field);
			}
		}
	}

	addErrorMsg(field) {
		let error = `<p class="${this.errorClass}">${this.errors[field.name]}</p> `;
		field.insertAdjacentHTML('afterend', error);
	}

	watchField(field) {
		field.addEventListener('input', () => {
			let error = field.parentNode.querySelector(`.${this.errorClass}`);
			if (this.patterns[field.name].test(field.value)) {
				field.classList.remove('fieldset__input_invalid');
				field.classList.add('fieldset__input_valid');
				if (error) {
					error.remove();
				}
			} else {
				field.classList.remove('fieldset__input_valid');
				field.classList.add('fieldset__input_invalid');
				if (!error) {
					this.addErrorMsg(field);
				}
			}
		})
	}
}

window.onload = () => {
	document.querySelector('.feedback-form').addEventListener('submit', event => {
		let valid = new Validator('.feedback-form');
		valid.validateForm();
		if (!valid.valid) {
			event.preventDefault();
		}
	})
}