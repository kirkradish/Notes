import { elements, helperFns } from './base';

export default class NewNoteView {
	constructor() {
		this.formBox = helperFns.createElement('div', 'form-box')
		this.titleInput = helperFns.createElement('input', 'title-field')
		this.titleInput.setAttribute('type', 'text')
		this.titleInput.setAttribute('placeholder', 'Title')
		this.textArea = helperFns.createElement('textarea', 'note-field')
		this.textArea.setAttribute('placeholder', 'What\s up?')

		// Add form to notepad
		this.formBox.append(this.titleInput)
		this.formBox.append(this.textArea)
		document.querySelector('.note-pad-sheet').append(this.formBox)
	}
}