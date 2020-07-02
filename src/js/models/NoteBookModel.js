import moment from 'moment';

export default class NotebookModel {
	constructor() {
		// this.notes = [];
		this.notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []
	}

	createNewNote(newNote) {
		this.notes.push(
			{
				id: Math.floor(1000 + Math.random() * 9000),
				date: moment().format('MMMM D[,] YYYY'),
				title: newNote.title,
				copy: newNote.copy
			}
		)
		this.addNotesToLocalStorage(this.notes);
	}

	addNotesToLocalStorage(notes) {
		localStorage.setItem('notes', JSON.stringify(notes))
	}

	deleteNoteFromState(noteId) {
		state.notebookModel.notes.forEach((cur, i) => {
			if (cur.id === noteId) {
				state.notebookModel.notes.splice([i], 1);
			}
		})
	}
}