import { elements, helperFns } from './base';

export default class NoteBookView {
	constructor() {
		this.note = helperFns.createElement('div', 'note')
		this.header = helperFns.createElement('header', 'note-header')
		this.title = helperFns.createElement('h2', 'note-title')
		this.date = helperFns.createElement('p', 'note-date')
		this.copy = helperFns.createElement('p', 'note-copy')

		this.note.append(this.header)
		this.header.append(this.title)
		this.header.append(this.date)
		this.note.append(this.copy)
		document.querySelector('.note-pad-sheet').append(this.note)
	}
}