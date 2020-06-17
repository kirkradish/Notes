import { elements, helperFns } from './base';

export default class HomeView {
	constructor() {
		this.addContainer = helperFns.createElement('div', 'add-container')
		this.newParagraph1 = helperFns.createElement('p')
		this.startText1 = document.createTextNode('Something on your mind?')
		this.addCircle = helperFns.createElement('div', 'add-circle')
		this.newParagraph2 = helperFns.createElement('p')
		this.startText2 = document.createTextNode('Write it down!')

		this.newParagraph1.append(this.startText1)
		this.newParagraph2.append(this.startText2)
		this.addContainer.append(this.newParagraph1)
		this.addContainer.append(this.addCircle)
		this.addContainer.append(this.newParagraph2)
		elements.appContainer.append(this.addContainer)
	}
}