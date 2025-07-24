import { IProduct } from '../../types';
import { settings } from '../../utils/constants';
import { EventEmitter } from '../base/events';

export class BasketModel {
	protected items: IProduct[] = [];

	constructor(protected events: EventEmitter){

	}

	get totalPrice(): number {
		const total = this.items.reduce((item, current) => {
			return item + current.price || 0;
		}, 0);
		return total;
	}

	get countProducts(): number {
		return this.items.length;
	}

	get productsFromBasket(): IProduct[] {
		return this.items;
	}

	addProductToBasket(product: IProduct) {
		this.items.push(product);
		this.events.emit(settings.events.basketChanged);
	}

	deleteItem(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
		this.events.emit(settings.events.basketChanged);
	}

	clear() {
		this.items = [];
		this.events.emit(settings.events.basketChanged);
	}
}
