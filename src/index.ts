import { App } from './components/App';
import { Product } from './components/Product';
import './scss/styles.scss';
import { cloneTemplate } from './utils/utils';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { ProductModel } from './components/ProductModel';
import { Modal } from './components/Modal';
import { CardPreviewModal } from './components/CardPreviewModal';
import { BasketModel } from './components/BasketModel';
import { IOrder, IProduct } from './types';
import { BasketModal } from './components/BasketModal';
import { CardBasket } from './components/CardBasket';
import { OrderModal } from './components/OrderModal';
import { ContactsModal } from './components/ContactsModal';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { OrderModel } from './components/OrderModel';
import { ApiOrder } from './components/ApiOrder';
import { Api } from './components/base/api';
import { API_URL } from './utils/constants';

const events = new EventEmitter();
const productModel = new ProductModel();
const basketModel = new BasketModel();
const api = new Api(API_URL);
const apiOrder = new ApiOrder(api);

const app = new App(events, productModel);
const page = new Page(
	document.querySelector('.page__wrapper') as HTMLElement,
	events
);
const template = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;

const modal = new Modal(
	document.querySelector('#modal-container') as HTMLElement,
	events
);
const cardPreviewModal = new CardPreviewModal(
	cloneTemplate(cardPreviewTemplate),
	events
);
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const basketCardTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const basketModal = new BasketModal(cloneTemplate(basketTemplate), events);

const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const orderModal = new OrderModal(cloneTemplate(orderTemplate), events);

const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const contactsModal = new ContactsModal(
	cloneTemplate(contactsTemplate),
	events
);

const finishPaymentTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;
const finishPaymentModal = new PaymentSuccessModal(
	cloneTemplate(finishPaymentTemplate),
	events
);

const orderModel = new OrderModel();

events.on('products:changed', () => {
	const productsHTMLArray = productModel
		.getProducts()
		.map((product) =>
			new Product(cloneTemplate(template), events).render(product)
		);

	page.render({
		productsList: productsHTMLArray,
	});
});

events.on('product:open', (product: IProduct) => {
	const inBasket = basketModel.productsFromBasket.some(
		(item) => item.id === product.id
	);
	const previewModalContent = cardPreviewModal.render({
		...product,
		inBasket: inBasket,
	});

	modal.render({ content: previewModalContent });
	modal.open();
});

events.on('modal:close', () => {
	modal.close();
});

events.on('basket:add', (product: IProduct) => {
	basketModel.addProductToBasket(product);
	events.emit('basket:changed');
});

events.on('basket:changed', () => {
	const productsTotal = basketModel.countProducts;
	page.render({
		totalProducts: productsTotal,
	});
});

events.on('basket:open', () => {
	const products = basketModel.productsFromBasket;
	const productsHTMLArray = products.map((item, index) =>
		new CardBasket(cloneTemplate(basketCardTemplate), events).render({
			index: index + 1,
			titleCard: item.title,
			priceCard: item.price,
			id: item.id,
		})
	);
	const totalPrice = basketModel.totalPrice;
	const basketModalContent = basketModal.render({
		products: productsHTMLArray,
		totalPrice: totalPrice,
	});
	modal.render({ content: basketModalContent });
	modal.open();
});

events.on(
	'basket:remove',
	({ id, update }: { id: string; update: boolean }) => {
		basketModel.deleteItem(id);
		if (update) {
			events.emit('basket:open');
		}
		events.emit('basket:changed');
	}
);

events.on('order:start', () => {
	const orderModalContent = orderModal.render();
	modal.render({ content: orderModalContent });
	modal.open();
});

events.on(
	'order:firstStepComplete',
	({ address, paymentMethod }: { address: string; paymentMethod: string }) => {
		orderModel.setOrderInfo(paymentMethod, address);
		const contactsModalContent = contactsModal.render();
		modal.render({ content: contactsModalContent });
		modal.open();
	}
);

events.on(
	'order:submit',
	({ phoneNumber, email }: { phoneNumber: string; email: string }) => {
		orderModel.setContactInfo(phoneNumber, email);
		const orderInfo = orderModel.collectInfo();
		const itemsIds = basketModel.productsFromBasket.map((item) => item.id);
		const totalSum = basketModel.totalPrice;

		const request: IOrder = {
			...orderInfo,
			total: totalSum,
			items: itemsIds,
		} as IOrder;

		apiOrder.submitOrder(request).then(() => {
			events.emit('order:completed');
		});
	}
);

events.on('order:completed', () => {
	const finishPaymentModalContent = finishPaymentModal.render({
		total: basketModel.totalPrice,
	});
	modal.render({ content: finishPaymentModalContent });
	modal.open();
});

events.on('order:success', () => {
	basketModel.clear();
	orderModel.clear();
	events.emit('basket:changed');
	events.emit('modal:close');
});
