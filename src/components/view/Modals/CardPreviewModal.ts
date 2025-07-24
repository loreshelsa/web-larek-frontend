import { Component } from '../../base/component';
import { EventEmitter } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { IProduct } from '../../../types';
import { CDN_URL, settings } from '../../../utils/constants';

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
	protected titleElement: HTMLElement;
	protected categoryElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected priceElement: HTMLElement;
	protected addBasket: HTMLButtonElement;
	protected descriptionElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.titleElement = ensureElement(
			settings.cardSettings.title,
			this.container
		);
		this.categoryElement = ensureElement(
			settings.cardSettings.category,
			this.container
		);
		this.imageElement = ensureElement<HTMLImageElement>(
			settings.cardSettings.image,
			this.container
		);
		this.priceElement = ensureElement(
			settings.cardSettings.price,
			this.container
		);
		this.addBasket = ensureElement<HTMLButtonElement>(
			settings.cardSettings.btn,
			this.container
		);

		this.descriptionElement = ensureElement(
			settings.cardSettings.description,
			this.container
		);

		this.addBasket.addEventListener('click', (event) => {
			event.stopPropagation();
			if (!this.added) {
				this.addProductToBasket();
				this.added = true;
				this.setText(this.addBasket, settings.text.btnDeleteFromBasket);
			} else {
				this.removeProductFromBasket();
				this.added = false;
				this.setText(this.addBasket, settings.text.btnBuyProduct);
			}
		});
	}

	addProductToBasket() {
		const product: Partial<IProduct> = {
			id: this.id,
		};
		this.events.emit(settings.events.basketAdd, product);
	}

	removeProductFromBasket() {
		this.events.emit(settings.events.basketRemove, {
			id: this.id,
			update: false,
		});
	}

	set id(value: string) {
		this._id = value;
	}

	get id() {
		return this._id;
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
	}

	get title(): string {
		return this.titleElement.textContent as string;
	}

	set category(value: string) {
		this.setText(this.categoryElement, value);
	}

	set price(value: number | null) {
		if (value !== null) {
			this.setText(this.priceElement, `${value} синапсов`);
		} else {
			this.setText(this.priceElement, settings.text.invaluable);
		}
	}

	set image(src: string) {
		this.setImage(this.imageElement, `${CDN_URL}${src}`, this.title);
	}

	set description(value: string) {
		this.setText(this.descriptionElement, value);
	}

	set inBasket(value: boolean) {
		this.added = value;
		if (this.added) {
			this.setText(this.addBasket, settings.text.btnDeleteFromBasket);
		} else {
			this.setText(this.addBasket, settings.text.btnBuyProduct);
		}
	}
}
