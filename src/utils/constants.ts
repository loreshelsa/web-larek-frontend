export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

	productSettings: {
		title: '.card__title',
		category: '.card__category',
		price: '.card__price',
		image: '.card__image',
	},

	catalogTemplate: '#card-catalog',
	catalogSettings: {
		item: '.gallery__item',
		title: '.card__title',
		category: '.card__category',
		price: '.card__price',
		image: '.card__image',
	},

	cardTemplate: '#card-preview',
	cardSettings: {
		title: '.card__title',
		category: '.card__category',
		price: '.card__price',
		image: '.card__image',
		description: '.card__text',
		btn: '.card__button',
	},

	basketTemplate: '#basket',
	
	basketSettings: {
		itemsList: '.basket__list',
		itemClass: '.basket__item',
		btnBasket: '.basket__button',
		basketPrice: '.basket__price',
		disabledClass: 'disabled',
	},
	
	basketCardTempate: '#card-basket',
	basketCardSettings : {
		title: '.card__title',
		price: '.card__price',
		itemIndex: '.basket__item-index',
		deleteBtn: '.basket__item-delete',
	},

	orderTemplate: '#order',
	orderSettings: {
		orderForm: '.form__input',
		cardPay: '.button_alt[name=card]',
		cashPay: '.button_alt[name=cash]',
		orderBtn: '.order__button',
		error: '.form__errors',
		activeBtn: 'button_alt-active',
		
	},

	contactsTemplate: '#contacts',
	contactsSettings: {
		email: '.form__input[name=email]',
		phone: '.form__input[name=phone]',
		contactBtn: '.button',
		errorContact: '.form__errors',
	},

	finishPaymentTemplate: '#success',
	finishPaymentSettings: {
		orderSuccessDescription : '.order-success__description',
		orderSuccessClose : '.order-success__close',
	},

	modalTemplate: '#modal-container',
	modalSettings: {
		content: '.modal__content',
		close: '.modal__close',
		activeClass: 'modal_active',
	},

	pageSettings: {
		pageContainer: '.gallery',
		pageWrapper: '.page__wrapper',
		headerBasketCounter: '.header__basket-counter',
		headerBasket: '.header__basket',
	},

	text: {
		invaluable: 'Бесценно',
		btnDeleteFromBasket: 'Удалить из корзины',
		emptyBasket: 'Корзина пуста',
		btnBuyProduct: 'Купить',
		errorMessageAddress: 'Необходимо указать адрес',
		errorMessageEmail: 'Необходимо указать электронный адрес',
		errorMessagePhone: 'Необходимо указать телефон',
	},
	events: {
		productsChanged: 'products:changed',
		productOpen: 'product:open',
		modalClose: 'modal:close',
		basketOpen: 'basket:open',
		basketAdd: 'basket:add',
		basketChanged: 'basket:changed',
		basketRemove: 'basket:remove',
		orderStart: 'order:start',
		orderFirstStepComplete: 'order:firstStepComplete',
		orderSubmit: 'order:submit',
		orderCompleted: 'order:completed',
		orderSuccess: 'order:success',
	},
};
