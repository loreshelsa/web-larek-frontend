export interface IProduct {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number | null;
  description: string;
}

export interface IProductResponse {
  items: IProduct[];
  total: number;
}

export interface IOrder {
  payment: string,
	email: string,
	phone: string,
  address: string,
	total: number,
	items: string[],
}