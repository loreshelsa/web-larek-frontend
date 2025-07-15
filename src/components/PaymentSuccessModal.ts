import { ensureElement } from '../utils/utils';
import { Component } from './base/component';
import { EventEmitter } from './base/events';

interface IPaymentSuccessModal {
	total: number;
}

export class PaymentSuccessModal extends Component<IPaymentSuccessModal> {
	totalPriceElement: HTMLElement;
	successButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.totalPriceElement = ensureElement(
			'.order-success__description',
			this.container
		);
		this.successButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);

    this.successButton.addEventListener('click', (event) => {
			event.stopPropagation();
			event.preventDefault();
			events.emit('order:success');
		});
	}

	set total(value: number) {
		this.setText(this.totalPriceElement, `${value} синапсов`);
	}
}
