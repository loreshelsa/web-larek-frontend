import { settings } from '../../../utils/constants';
import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/component';
import { EventEmitter } from '../../base/events';

interface IOrderModal {
	address: string;
	paymentMethod: string;
}

export class OrderModal extends Component<IOrderModal> {
	private address: string = '';
	private paymentMethod: string;

	addressInputElement: HTMLInputElement;
	paymentCardMethodElement: HTMLButtonElement;
	paymentCashMethodElement: HTMLButtonElement;
	submitButton: HTMLButtonElement;
	errorMessageElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.addressInputElement = ensureElement<HTMLInputElement>(
			settings.orderSettings.orderForm,
			this.container
		);
		this.paymentCardMethodElement = ensureElement<HTMLButtonElement>(
			settings.orderSettings.cardPay,
			this.container
		);
		this.paymentCashMethodElement = ensureElement<HTMLButtonElement>(
			settings.orderSettings.cashPay,
			this.container
		);
		this.submitButton = ensureElement<HTMLButtonElement>(
			settings.orderSettings.orderBtn,
			this.container
		);
		this.errorMessageElement = ensureElement(
			settings.orderSettings.error,
			this.container
		);

		this.setActiveButton(
			this.paymentCardMethodElement,
			this.paymentCashMethodElement
		);

		this.container.addEventListener('submit', (event) => {
			event.stopPropagation();
			event.preventDefault();
			if (this.address && this.paymentMethod) {
				events.emit(settings.events.orderFirstStepComplete, {
					address: this.address,
					paymentMethod: this.paymentMethod,
				});
			}
		});

		this.addressInputElement.addEventListener('input', (event) => {
			event.stopPropagation();
			this.address = (event.target as HTMLInputElement).value;

			if (this.address.length) {
				this.setText(this.errorMessageElement, '');
				this.setDisabled(this.submitButton, false);
			} else {
				this.setText(
					this.errorMessageElement,
					settings.text.errorMessageAddress
				);
				this.setDisabled(this.submitButton, true);
			}
		});

		this.paymentCardMethodElement.addEventListener('click', (event) => {
			event.stopPropagation();
			this.setActiveButton(
				this.paymentCardMethodElement,
				this.paymentCashMethodElement
			);
		});

		this.paymentCashMethodElement.addEventListener('click', (event) => {
			event.stopPropagation();
			this.setActiveButton(
				this.paymentCashMethodElement,
				this.paymentCardMethodElement
			);
		});
	}

	private setActiveButton(
		activeBtn: HTMLButtonElement,
		inactiveBtn: HTMLButtonElement
	) {
		this.paymentMethod = activeBtn.getAttribute('name');
		activeBtn.classList.add(settings.orderSettings.activeBtn);
		inactiveBtn.classList.remove(settings.orderSettings.activeBtn);
	}
}
