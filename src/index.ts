import { App } from './components/App';
import { Product } from './components/view/Product';
import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { EventEmitter } from './components/base/events';
import { ProductModel } from './components/model/ProductModel';
import { Modal } from './components/view/Modals/Modal';
import { CardPreviewModal } from './components/view/Modals/CardPreviewModal';
import { BasketModel } from './components/model/BasketModel';
import { IOrder, IProduct } from './types';
import { BasketModal } from './components/view/Modals/BasketModal';
import { CardBasket } from './components/view/CardBasket';
import { OrderModal } from './components/view/Modals/OrderModal';
import { ContactsModal } from './components/view/Modals/ContactsModal';
import { PaymentSuccessModal } from './components/view/Modals/PaymentSuccessModal';
import { OrderModel } from './components/model/OrderModel';
import { ApiOrder } from './components/Api/ApiOrder';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';

const events = new EventEmitter();
const productModel = new ProductModel();
const basketModel = new BasketModel();
const api = new Api(API_URL);
const apiOrder = new ApiOrder(api);

const app = new App(events, productModel);
const page = new Page(
	ensureElement(settings.pageSettings.pageWrapper, document.body) as HTMLElement,
	events
);
const template = ensureElement<HTMLTemplateElement>(
	settings.catalogTemplate, document.body
) as HTMLTemplateElement;

const cardPreviewTemplate = ensureElement<HTMLTemplateElement>(
	settings.cardTemplate, document.body
) as HTMLTemplateElement;

const modal = new Modal(
	ensureElement(settings.modalTemplate, document.body) as HTMLElement,
	events
);
const cardPreviewModal = new CardPreviewModal(
	cloneTemplate(cardPreviewTemplate),
	events
);
const basketTemplate = ensureElement<HTMLTemplateElement>(
	settings.basketTemplate,
	document.body
);
const basketCardTemplate = ensureElement<HTMLTemplateElement>(
	settings.basketCardTempate,
	document.body
) as HTMLTemplateElement;

const basketModal = new BasketModal(cloneTemplate(basketTemplate), events);

const orderTemplate = ensureElement<HTMLTemplateElement>(
	settings.orderTemplate, document.body
) as HTMLTemplateElement;

const orderModal = new OrderModal(cloneTemplate(orderTemplate), events);

const contactsTemplate = ensureElement<HTMLTemplateElement>(
	settings.contactsTemplate, document.body
) as HTMLTemplateElement;

const contactsModal = new ContactsModal(
	cloneTemplate(contactsTemplate),
	events
);

const finishPaymentTemplate = ensureElement<HTMLTemplateElement>(
	settings.finishPaymentTemplate, document.body
) as HTMLTemplateElement;

const finishPaymentModal = new PaymentSuccessModal(
	cloneTemplate(finishPaymentTemplate),
	events
);

const orderModel = new OrderModel();


events.on(settings.events.productsChanged, () => {
	const productsHTMLArray = productModel
		.getProducts()
		.map((product) =>
			new Product(cloneTemplate(template), events).render(product)
		);

	page.render({
		productsList: productsHTMLArray,
	});
});

events.on(settings.events.productOpen, (product: IProduct) => {
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

events.on(settings.events.modalClose, () => {
	modal.close();
});

events.on(settings.events.basketAdd, (product: IProduct) => {
	basketModel.addProductToBasket(product);
	events.emit(settings.events.basketChanged);
});

events.on(settings.events.basketChanged, () => {
	const productsTotal = basketModel.countProducts;
	page.render({
		totalProducts: productsTotal,
	});
});

events.on(settings.events.basketOpen, () => {
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
	settings.events.basketRemove,
	({ id, update }: { id: string; update: boolean }) => {
		basketModel.deleteItem(id);
		if (update) {
			events.emit(settings.events.basketOpen);
		}
		events.emit(settings.events.basketChanged);
	}
);

events.on(settings.events.orderStart, () => {
	const orderModalContent = orderModal.render();
	modal.render({ content: orderModalContent });
	modal.open();
});

events.on(
	settings.events.orderFirstStepComplete,
	({ address, paymentMethod }: { address: string; paymentMethod: string }) => {
		orderModel.setOrderInfo(paymentMethod, address);
		const contactsModalContent = contactsModal.render();
		modal.render({ content: contactsModalContent });
		modal.open();
	}
);

events.on(
	settings.events.orderSubmit,
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
			events.emit(settings.events.orderCompleted);
		});
	}
);

events.on(settings.events.orderCompleted, () => {
	const finishPaymentModalContent = finishPaymentModal.render({
		total: basketModel.totalPrice,
	});
	modal.render({ content: finishPaymentModalContent });
	modal.open();
});

events.on(settings.events.orderSuccess, () => {
	basketModel.clear();
	orderModel.clear();
	events.emit(settings.events.basketChanged);
	events.emit(settings.events.modalClose);
});
