import { settings } from '../../../utils/constants';
import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/component';
import { EventEmitter } from '../../base/events';

interface IBasketModal {
	products: HTMLElement[];
	totalPrice: number;
}

export class BasketModal extends Component<IBasketModal> {
	protected container: HTMLElement;
	protected productContainer: HTMLUListElement;
	protected orderButton: HTMLButtonElement;
	protected totalPriceElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.productContainer = ensureElement<HTMLUListElement>(
			settings.basketSettings.itemsList,
			this.container
		);
		this.orderButton = ensureElement<HTMLButtonElement>(
			settings.basketSettings.btnBasket,
			this.container
		);
		this.totalPriceElement = ensureElement(settings.basketSettings.basketPrice, this.container);
		this.orderButton.addEventListener('click', (event) => {
			event.stopPropagation();
			events.emit(settings.events.orderStart);
		});
	}

	set products(value: HTMLElement[]) {
		if (value.length) {
			this.productContainer.replaceChildren(...value);
			this.orderButton.removeAttribute(settings.basketSettings.disabledClass);
		} else {
			this.orderButton.setAttribute(settings.basketSettings.disabledClass, settings.basketSettings.disabledClass);
			this.setText(this.productContainer, settings.text.emptyBasket);
		}
	}
	set totalPrice(value: number) {
		this.setText(this.totalPriceElement, `${value} синапсов`);
	}
}
