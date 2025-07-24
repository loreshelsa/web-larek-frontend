import { IProduct } from '../../types/index';
import { CDN_URL, settings } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { EventEmitter } from '../base/events';

export class Product extends Component<IProduct> {
	protected titleElement: HTMLElement;
	protected categoryElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected priceElement: HTMLElement;
	private _id: string;

	product: IProduct;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.titleElement = ensureElement(
			settings.productSettings.title,
			this.container
		);
		this.categoryElement = ensureElement(
			settings.productSettings.category,
			this.container
		);
		this.imageElement = ensureElement<HTMLImageElement>(
			settings.productSettings.image,
			this.container
		);
		this.priceElement = ensureElement(
			settings.productSettings.price,
			this.container
		);
		container.addEventListener('click', (event) => {
			event.stopPropagation();
			this.openProduct();
		});
	}

	openProduct() {
		const product = {
			id: this.id,
		};
		this.events.emit(settings.events.productOpen, product);
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
		return this.titleElement.textContent;
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
}
