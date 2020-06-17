export default class NotebookModel {
	constructor(note) {
		this.note = note

		this.notes = [
			// {id: 1, date: '06/17/2020', title: 'Placeholder', copy: 'Lorem ipsum dolor sit amet.'}
		]
	}

	addNoteToState() {
		this.notes.push(this.note)
	}
}