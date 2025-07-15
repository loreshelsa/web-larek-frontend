import { Component } from './base/component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';
import { IProduct } from '../types';

export interface ICardPreviewModal {
	id: string;
	title: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
	inBasket: boolean;
}

export class CardPreviewModal extends Component<ICardPreviewModal> {
	private _id: string;
	private added: boolean;
	private _price: number;
	protected titleElement: HTMLElement;
	protected categoryElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected priceElement: HTMLElement;
	protected addBasket: HTMLButtonElement;
	protected descriptionElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.titleElement = ensureElement('.card__title', this.container);
		this.categoryElement = ensureElement('.card__category', this.container);
		this.imageElement = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);
		this.priceElement = ensureElement('.card__price', this.container);
		this.addBasket = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.container
		);

		this.descriptionElement = ensureElement('.card__text', this.container);

		this.addBasket.addEventListener('click', (event) => {
			event.stopPropagation();
			if (!this.added) {
				this.addProductToBasket();
				this.added = true;
				this.setText(this.addBasket, 'Удалить из корзины');
			} else {
				this.removeProductFromBasket();
				this.added = false;
				this.setText(this.addBasket, 'Купить');
			}
		});
	}

	addProductToBasket() {
		const product: Partial<IProduct> = {
			id: this.id,
			title: this.title,
			category: this.category,
			image: this.image,
			price: this.price,
		};
		this.events.emit('basket:add', product);
	}

	removeProductFromBasket() {
		this.events.emit('basket:remove', { id: this._id, update: false });
	}

	set id(value: string) {
		this._id = value;
	}

	get id() {
		return this._id;
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
		this.imageElement.alt = value;
	}

	get title(): string {
		return this.titleElement.textContent as string;
	}

	set category(value: string) {
		this.setText(this.categoryElement, value);
	}

	get category(): string {
		return this.categoryElement.textContent as string;
	}

	set price(value: number) {
		if (value !== null) {
			this.setText(this.priceElement, `${value} синапсов`);
		} else {
			this.setText(this.priceElement, 'Бесценно');
		}
		this._price = value;
	}

	get price(): number {
		return this._price;
	}

	set image(src: string) {
		this.imageElement.src = src;
	}

	get image(): string {
		return this.imageElement.getAttribute('src') as string;
	}

	set description(value: string) {
		this.setText(this.descriptionElement, value);
	}

	set inBasket(value: boolean) {
		this.added = value;
		if (this.added) {
			this.setText(this.addBasket, 'Удалить из корзины');
		} else {
			this.setText(this.addBasket, 'Купить');
		}
	}
}
