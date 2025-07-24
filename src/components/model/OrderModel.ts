import { IOrder } from '../../types';
import { settings } from '../../utils/constants';

export class OrderModel {
	protected address: string;
	protected phone: string = '';
	protected email: string = '';
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

	validationAddress(address: string): string {
		this.address = address;
		if (address.length) {
			return '';
		} else {
			return settings.text.errorMessageAddress;
		}
	}

	get addressDisabled(): boolean {
		return this.address.length === 0;
	}

	validationEmail(email: string): string {
		this.email = email;
		if (email.length) {
			return '';
		} else {
			return settings.text.errorMessageEmail;
		}
	}

	validationPhone(phone: string): string {
		this.phone = phone;
		if (phone.length) {
			return '';
		} else {
			return settings.text.errorMessagePhone;
		}
	}

	get contactDisabled(): boolean {
		return this.email.length === 0 || this.phone.length === 0;
	}
}
