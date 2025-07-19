import { IProduct } from '../../types';

export class BasketModel {
	protected items: IProduct[] = [];

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
	}

	deleteItem(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
	}

	clear() {
		this.items = [];
	}
}
