import { Component } from '../../base/component';
import { EventEmitter } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { settings } from '../../../utils/constants';

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
		this.contentElement = ensureElement(settings.modalSettings.content, this.container);
		this.closeButton = ensureElement<HTMLButtonElement>(
			settings.modalSettings.close,
			this.container
		);
		this.closeButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.events.emit(settings.events.modalClose);
		});
		document.addEventListener('click', (event) => {
			if (
				event.target !== this.contentElement &&
				(event.target as HTMLElement).closest(settings.modalSettings.content) !==
					this.contentElement
			) {
				this.events.emit(settings.events.modalClose);
			}
		});
	}

	open() {
		if (!this.container.classList.contains(settings.modalSettings.activeClass)) {
			this.toggleClass(this.container, settings.modalSettings.activeClass);
		}
	}

	close() {
		if (this.container.classList.contains(settings.modalSettings.activeClass)) {
			this.toggleClass(this.container, settings.modalSettings.activeClass);
		}
	}

	set content(value: HTMLElement) {
		this.contentElement.replaceChildren(value);
	}
}
