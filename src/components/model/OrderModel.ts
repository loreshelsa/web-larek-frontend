import { IOrder } from '../../types';

export class OrderModel {
	protected address: string;
	protected phone: string;
	protected email: string;
	protected paymentMethod: string;

	setOrderInfo(paymentMethod: string, address: string) {
		this.address = address;
		this.paymentMethod = paymentMethod;
	}

	setContactInfo(phone: string, email: string) {
		this.phone = phone;
		this.email = email;
	}

	collectInfo(): Partial<IOrder> {
		const info: Partial<IOrder> = {
			phone: this.phone,
			email: this.email,
			payment: this.paymentMethod,
			address: this.address,
		};
		return info;
	}

	clear() {
		this.address = '';
		this.phone = '';
		this.email = '';
		this.paymentMethod = '';
	}
}
