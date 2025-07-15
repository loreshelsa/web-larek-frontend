import { ensureElement } from '../utils/utils';
import { Component } from './base/component';
import { EventEmitter } from './base/events';

interface IContactsModal {
	phoneNumber: string;
	email: string;
}

export class ContactsModal extends Component<IContactsModal> {
	private phoneNumber: string;
	private email: string;

	emailInputElement: HTMLElement;
	phoneInputElement: HTMLElement;
	submitButton: HTMLButtonElement;
	errorMessageElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.emailInputElement = ensureElement(
			'.form__input[name=email]',
			this.container
		);
		this.phoneInputElement = ensureElement(
			'.form__input[name=phone]',
			this.container
		);

		this.submitButton = ensureElement<HTMLButtonElement>(
			'.button',
			this.container
		);

		this.errorMessageElement = ensureElement('.form__errors', this.container);

		this.container.addEventListener('submit', (event) => {
			event.stopPropagation();
			event.preventDefault();
			events.emit('order:submit', {
				email: this.email,
				phoneNumber: this.phoneNumber,
			});
		});

		this.emailInputElement.addEventListener('input', (event) => {
			event.stopPropagation();
			this.email = (event.target as HTMLInputElement).value;
			if (this.email.length) {
				this.setText(this.errorMessageElement, '');
			} else {
				this.setText(
					this.errorMessageElement,
					'Необходимо указать электронный адрес'
				);
			}
			this.checkInputsEmpty();
		});

		this.phoneInputElement.addEventListener('input', (event) => {
			event.stopPropagation();
			this.phoneNumber = (event.target as HTMLInputElement).value;
			if (this.phoneNumber.length) {
				this.setText(this.errorMessageElement, '');
			} else {
				this.setText(this.errorMessageElement, 'Необходимо указать телефон');
			}
			this.checkInputsEmpty();
		});
	}

	checkInputsEmpty() {
		if (this.email?.length && this.phoneNumber?.length) {
			this.setDisabled(this.submitButton, false);
		} else {
			this.setDisabled(this.submitButton, true);
		}
	}
}
