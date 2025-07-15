import { Component } from './base/component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

interface IModal {
	content: HTMLElement;
}

export class Modal extends Component<IModal> {
	protected container: HTMLElement;
	protected contentElement: HTMLElement;
	protected closeButton: HTMLButtonElement;

	nameWidget: string;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.contentElement = ensureElement('.modal__content', this.container);
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			this.container
		);
		this.closeButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.events.emit('modal:close');
		});
		document.addEventListener('click', (event) => {
			if (
				event.target !== this.contentElement &&
				(event.target as HTMLElement).closest('.modal__content') !==
					this.contentElement
			) {
				this.events.emit('modal:close');
			}
		});
	}

	open() {
		if (!this.container.classList.contains('modal_active')) {
			this.toggleClass(this.container, 'modal_active');
		}
	}

	close() {
		if (this.container.classList.contains('modal_active')) {
			this.toggleClass(this.container, 'modal_active');
		}
	}

	set content(value: HTMLElement) {
		this.contentElement.replaceChildren(value);
	}
}
