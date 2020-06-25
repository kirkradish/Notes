import moment from 'moment';

export default class Notebook {
	constructor() {
		this.notes = [];
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
	}

	deleteNoteFromState(noteId) {
		state.notebook.notes.forEach((cur, i) => {
			if (cur.id === noteId) {
				state.notebook.notes.splice([i], 1);
			}
		})
	}
}