import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/component';
import { EventEmitter } from './base/events';

interface ICardBasket {
  id: string;
	titleCard: string;
	index: number;
	priceCard: number;
}

export class CardBasket extends Component<ICardBasket> {
  private _id: string;
	products: IProduct[] = [];
	removeButton: HTMLButtonElement;
	titleCardElement: HTMLElement;
	indexElement: HTMLElement;
	priceCardElement: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.titleCardElement = ensureElement('.card__title', this.container);
		this.indexElement = ensureElement('.basket__item-index', this.container);
		this.priceCardElement = ensureElement('.card__price', this.container);
		this.removeButton = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			this.container
		);
    this.removeButton.addEventListener('click', (event)=>{
      event.stopPropagation();
      events.emit('basket:remove', {id: this._id, update: true});
    })
	}

  set id(value: string){
    this._id = value;
  }

  set titleCard(value: string) {
		this.setText(this.titleCardElement, value);
	}

  set index(value: string) {
		this.setText(this.indexElement, value);
	}

  set priceCard(value: string) {
    if (value !== null) {
			this.setText(this.priceCardElement, `${value} синапсов`);
		} else {
			this.setText(this.priceCardElement, 'Бесценно');
		}
	}
}
