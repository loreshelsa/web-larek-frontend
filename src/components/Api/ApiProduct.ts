import { IProductResponse } from '../../types';
import { Api } from '../base/api';

export class ApiProduct {
	private api: Api;

	constructor(api: Api) {
		this.api = api;
	}

	getProducts(): Promise<IProductResponse> {
		return this.api.get<IProductResponse>('/product');
	}
}
