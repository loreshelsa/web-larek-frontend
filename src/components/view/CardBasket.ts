import { IProduct } from '../../types';
import { settings } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { EventEmitter } from '../base/events';

interface ICardBasket {
	id: string;
	titleCard: string;
	index: number;
	priceCard: number;
}

export class CardBasket extends Component<ICardBasket> {
	private _id: string;
	products: IProduct[] = [];
	removeButton: HTMLButtonElement;
	titleCardElement: HTMLElement;
	indexElement: HTMLElement;
	priceCardElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.titleCardElement = ensureElement(
			settings.basketCardSettings.title,
			this.container
		);
		this.indexElement = ensureElement(
			settings.basketCardSettings.itemIndex,
			this.container
		);
		this.priceCardElement = ensureElement(
			settings.basketCardSettings.price,
			this.container
		);
		this.removeButton = ensureElement<HTMLButtonElement>(
			settings.basketCardSettings.deleteBtn,
			this.container
		);
		this.removeButton.addEventListener('click', (event) => {
			event.stopPropagation();
			events.emit(settings.events.basketRemove, { id: this._id, update: true });
		});
	}

	set id(value: string) {
		this._id = value;
	}

	set titleCard(value: string) {
		this.setText(this.titleCardElement, value);
	}

	set index(value: string) {
		this.setText(this.indexElement, value);
	}

	set priceCard(value: string) {
		if (value !== null) {
			this.setText(this.priceCardElement, `${value} синапсов`);
		} else {
			this.setText(this.priceCardElement, settings.text.invaluable);
		}
	}
}
