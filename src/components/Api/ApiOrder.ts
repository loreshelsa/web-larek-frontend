import { IOrder } from '../../types';
import { Api } from '../base/api';

export class ApiOrder {
	private api: Api;

	constructor(api: Api) {
		this.api = api;
	}

	submitOrder(data: IOrder) {
		return this.api.post('/order', data);
	}
}
