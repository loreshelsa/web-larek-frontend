import { settings } from '../../../utils/constants';
import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/component';
import { EventEmitter } from '../../base/events';

interface IContactsModal {
	phoneNumber: string;
	email: string;
	errorMessage: string;
	disabled: boolean;
}

export class ContactsModal extends Component<IContactsModal> {
	private phoneNumber: string = '';
	private email: string = '';

	emailInputElement: HTMLElement;
	phoneInputElement: HTMLElement;
	submitButton: HTMLButtonElement;
	errorMessageElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.emailInputElement = ensureElement(
			settings.contactsSettings.email,
			this.container
		);
		this.phoneInputElement = ensureElement(
			settings.contactsSettings.phone,
			this.container
		);

		this.submitButton = ensureElement<HTMLButtonElement>(
			settings.contactsSettings.contactBtn,
			this.container
		);

		this.errorMessageElement = ensureElement(
			settings.contactsSettings.errorContact,
			this.container
		);

		this.container.addEventListener('submit', (event) => {
			event.stopPropagation();
			event.preventDefault();
			events.emit(settings.events.orderSubmit, {
				email: this.email,
				phoneNumber: this.phoneNumber,
			});
		});

		this.emailInputElement.addEventListener('change', (event) => {
			event.stopPropagation();
			this.email = (event.target as HTMLInputElement).value;
			this.events.emit(settings.events.contactEmailChanged, {
				email: this.email,
			});
		});

		this.phoneInputElement.addEventListener('change', (event) => {
			event.stopPropagation();
			this.phoneNumber = (event.target as HTMLInputElement).value;
			this.events.emit(settings.events.contactPhoneChanged, {
				phone: this.phoneNumber,
			});
		});
	}

	set errorMessage(errorMessageValue: string) {
		this.setText(this.errorMessageElement, errorMessageValue);
	}

	set disabled(value: boolean) {
		this.setDisabled(this.submitButton, value);
	}
}
