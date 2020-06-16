import { elements } from './base';

export default class HomeAdd {
	constructor() {
		this.addContainer = this.createElement('div', 'add-container')
		this.newParagraph1 = this.createElement('p')
		this.startText1 = document.createTextNode('Something on your mind?')
		this.addCircle = this.createElement('div', 'add-circle')
		this.newParagraph2 = this.createElement('p')
		this.startText2 = document.createTextNode('Write it down!')

		this.newParagraph1.append(this.startText1)
		this.newParagraph2.append(this.startText2)
		this.addContainer.append(this.newParagraph1)
		this.addContainer.append(this.addCircle)
		this.addContainer.append(this.newParagraph2)
		elements.appContainer.append(this.addContainer)

		// Remove add button from DOM on click
		this.addCircle.addEventListener('click', () => {
			this.addCircle.classList.add('disappear')
			setTimeout(() => {
				elements.appContainer.removeChild(this.addContainer)
				this.createNewPage();
			}, 300)
			// keep time same as disappear animate style in css (or a little slower)
		})
	}

	createElement(tag, className) {
		const element = document.createElement(tag)
		if (className) element.classList.add(className)
		return element
	}

	createNewPage() {
		const notePadSheet = this.createElement('div', 'note-pad-sheet')
		elements.appContainer.append(notePadSheet)
	}
}