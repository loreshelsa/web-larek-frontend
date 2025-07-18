import { settings } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { EventEmitter } from '../base/events';

interface IPage {
	productsList: HTMLElement[];
	totalProducts: number;
}

export class Page extends Component<IPage> {
	protected productsContainer: HTMLElement;
	protected totalProductsBasket: HTMLElement;
	protected basketIcon: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.productsContainer = ensureElement(settings.pageSettings.pageContainer, this.container);
		this.totalProductsBasket = ensureElement(
			settings.pageSettings.headerBasketCounter,
			this.container
		);
		this.basketIcon = ensureElement(settings.pageSettings.headerBasket, this.container);

		this.basketIcon.addEventListener('click', (event) => {
			event.stopPropagation();
      this.events.emit(settings.events.basketOpen);
		});
	}

	set productsList(products: HTMLElement[]) {
		this.productsContainer.replaceChildren(...products);
	}

	set totalProducts(value: number) {
		this.setText(this.totalProductsBasket, value);
	}
}
