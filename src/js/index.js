import Notebook from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as headerView from './views/headerView';
import * as formView from './views/formView';
import * as noteView from './views/noteView';
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
	if (e.target.matches('.add-circle, .add-circle *')) {
		state.page = 'new-note';
		directs.homeToForm(state.page);
	}
});


/**
 * FORM
 */
app.addEventListener('click', (e) => {
	// Save Note from Form
	if (e.target.matches('.app-editor, .app-editor *')) {
		if (e.target.closest('.app-editor').classList.contains('save')) {
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
				if (noteValues.title !== '', noteValues.copy !== '') {
					// Add Note to State
					state.notebook.createNewNote(noteValues)
					directs.formToNotes(state.page, state.notebook.notes);
					notebookController();
				} else {
					// title must not be blank
					// copy must not be blank
				}
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
	if (e.target.matches('.app-editor.new, .app-editor.new *')) {
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
				title: notes[i].querySelector('.note-title').textContent,
				copy: notes[i].querySelector('.note-copy').textContent
			}

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