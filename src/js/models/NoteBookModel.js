import moment from 'moment';

export default class NoteBookModel {
	constructor() {
		this.notebook = [
			{id: 1, date: '06/17/2020', title: 'Placeholder', copy: 'Lorem ipsum dolor sit amet.'}
		]
	}

	addNote() {
		const note = {
			id: Math.floor(1000 + Math.random() * 9000),
			date: moment().format('MMMM D[,] YYYY'),
			title: document.querySelector('.title-field').value,
			copy: document.querySelector('.note-field').value
		}
		this.notebook.push(note)
	}
}