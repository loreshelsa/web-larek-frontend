import { settings } from '../../../utils/constants';
import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/component';
import { EventEmitter } from '../../base/events';

interface IPaymentSuccessModal {
	total: number;
}

export class PaymentSuccessModal extends Component<IPaymentSuccessModal> {
	totalPriceElement: HTMLElement;
	successButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.totalPriceElement = ensureElement(
			settings.finishPaymentSettings.orderSuccessDescription,
			this.container
		);
		this.successButton = ensureElement<HTMLButtonElement>(
			settings.finishPaymentSettings.orderSuccessClose,
			this.container
		);

    this.successButton.addEventListener('click', (event) => {
			event.stopPropagation();
			event.preventDefault();
			events.emit(settings.events.orderSuccess);
		});
	}

	set total(value: number) {
		this.setText(this.totalPriceElement, `${value} синапсов`);
	}
}
