import Notebook from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as formView from './views/formView';
import { app, directs } from './views/base';


const state = {}
// TESTING
window.state = state;



/**
 * START AT HOME
 */
window.addEventListener('load', (event) => {
	state.notebook = new Notebook();
	state.page = 'home';
	homeView.buildHomeScreen();
});

/**
 * HOME: NEW NOTE
 */
app.addEventListener('click', (e) => {
	if (e.target.matches('.add-container__button, .add-container__button *')) {
		state.page = 'new-note';
		directs.homeToForm(state.page);
	}
});


/**
 * FORM
 */
app.addEventListener('click', (e) => {
	// Save Note from Form
	if (e.target.matches('.app-header__editor.save, .app-header__editor.save *')) {
		state.page = 'notebook';
		if (state.editId) {
			state.notebook.notes.forEach(cur => {
				if (cur.id === state.editId) {
					const editValues = formView.getFieldValues(cur)
					cur.title = editValues.title;
					cur.copy = editValues.copy;
					directs.formToNotes(state.page, state.notebook.notes);
					notebookController();
				}
			})
			// Clear id
			state.editId = '';
		} else {
			const noteValues = formView.getFieldValues();
			const noteTitle = document.querySelector('.form-box__title');
			const noteCopy = document.querySelector('.form-box__copy');
			if (noteValues.title !== '' && noteValues.copy !== '') {
				if (noteTitle.classList.contains('red')) noteTitle.classList.remove('red');
				if (noteCopy.classList.contains('red')) noteCopy.classList.remove('red');
				// Add Note to State
				state.notebook.createNewNote(noteValues)
				directs.formToNotes(state.page, state.notebook.notes);
				notebookController();
			} else {
				if (noteValues.title === '') noteTitle.classList.add('red')
				if (noteValues.copy === '') noteCopy.classList.add('red')
			}
		}
	}
	// Trash Note from Form
	if (e.target.matches('.note-utility.trash, .note-utility.trash *')) {
		if (state.page === 'new-note') {
			if (state.notebook.notes.length === 0) {
				state.page = 'home';
				directs.formToHome();
			} else {
				state.page = 'notebook';
				directs.formToNotes(state.page, state.notebook.notes);
				notebookController();
			}
		}
		if (state.page === 'edit-note') {
			const noteId = state.editId;
			state.notebook.deleteNoteFromState(noteId);
			state.page = 'notebook';
			if (state.notebook.notes.length > 0) {
				directs.formToNotes(state.page, state.notebook.notes);
				notebookController();
			} else {
				directs.formToHome();
			}
		}
	}
	// Discard Edits
	if (e.target.matches('.utility-bar .discard, .utility-bar .discard *')) {
		state.page = 'notebook';
		directs.formToNotes(state.page, state.notebook.notes)
		notebookController();
	}
})



/**
 * NOTEBOOK
 */
app.addEventListener('click', (e) => {
	// Add New Note UI
	if (e.target.matches('.app-header__editor.new, .app-header__editor.new *')) {
		state.page = 'new-note';
		directs.notesToForm(state.page);
	}
})



/**
 * NOTEBOOK CONTROLLER
 * To edit
 */
const notebookController = () => {
	const notes = document.querySelectorAll('.note');
	notes.forEach((cur, i) => {
		cur.addEventListener('click', (e) => {
			state.page = 'edit-note';
			const noteToEdit = {
				id: cur.id,
				title: state.notebook.notes[i].title,
				copy: state.notebook.notes[i].copy
			}
			console.log('dope')

			// Populate form with existing content
			directs.notesToForm(state.page, noteToEdit);
			// helperFns.revealEditNoteForm(cur.id, noteTitle, noteCopy);
			state.editId = Number(cur.id);
		})
		
	})
}



/**
 * TRASH NOTE
 * Trash Note from Notebook
 */
// app.addEventListener('click', (e) => {
// 	if (e.target.matches('.delete-box, .delete-box *')) {
// 		const noteId = Number(e.target.closest('.note').id);
// 		const noteToDelete = e.target.closest('.note');

// 		state.notebook.deleteNoteFromState(noteId);
// 		notebookView.removeNoteFromUI(noteToDelete)

// 		if (state.notebook.notes.length === 0) {
// 			directs.notesToHome();
// 		}
// 	}
// })