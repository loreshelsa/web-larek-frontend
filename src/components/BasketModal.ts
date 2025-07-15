import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/component';
import { EventEmitter } from './base/events';

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
			'.basket__list',
			this.container
		);
		this.orderButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container
		);
		this.totalPriceElement = ensureElement('.basket__price', this.container);
		this.orderButton.addEventListener('click', (event) => {
			event.stopPropagation();
			events.emit('order:start');
		});
	}

	set products(value: HTMLElement[]) {
		if (value.length) {
			this.productContainer.replaceChildren(...value);
			this.orderButton.removeAttribute('disabled');
		} else {
			this.orderButton.setAttribute('disabled', 'disabled');
			this.setText(this.productContainer, 'Корзина пуста');
		}
	}
	set totalPrice(value: number) {
		this.setText(this.totalPriceElement, `${value} синапсов`);
	}
}
