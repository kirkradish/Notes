import Notebook from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as headerView from './views/headerView';
import * as newNoteView from './views/newNoteView';
import * as noteView from './views/noteView';
import * as notebookView from './views/notebookView';
import { app, helperFns, directs } from './views/base';


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
		directs.homeToForm();
		state.page = 'new-note';
	}
});


/**
 * FORM
 */
app.addEventListener('click', (e) => {
	// Save Note from Form
	if (e.target.matches('.app-editor, .app-editor *')) {
		if (e.target.closest('.app-editor').classList.contains('save')) {
			if (state.editId) {
				state.notebook.notes.forEach(cur => {
					if (cur.id === state.editId) {
						const editValues = newNoteView.getFieldValues(cur)
						cur.title = editValues.title;
						cur.copy = editValues.copy;
						directs.formToNotes(state.notebook.notes);
						notebookController();
					}
				})
			} else {
				const noteValues = newNoteView.getFieldValues();
				if (noteValues.title !== '', noteValues.copy !== '') {
					// Add Note to State
					state.notebook.createNewNote(noteValues)
					directs.formToNotes(state.notebook.notes);
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
		if (state.notebook.notes.length === 0) {
			directs.formToHome();
			state.page = 'home';
		} else {
			directs.formToNotes(state.notebook.notes);
			notebookController();
		}
	}
})



/**
 * NOTEBOOK
 */
app.addEventListener('click', (e) => {
	// Add New Note UI
	if (e.target.matches('.note-utility.new, .note-utility.new *')) {
		directs.notesToForm();
		state.page = 'new-note';
	}
	// Click Edit for Edit Mode
	if (e.target.matches('.app-editor, .app-editor *')) {
		if (e.target.closest('.app-editor').classList.contains('edit')) {
			noteView.onEditMode()
			headerView.removeHeaderUtility()
			headerView.showHeaderUtility('done', 'Done')
		}
		if (e.target.closest('.app-editor').classList.contains('done')) {
			noteView.onDoneEditMode()
			headerView.removeHeaderUtility()
			headerView.showHeaderUtility('edit', 'Edit')
		}
	}
})



/**
 * NOTEBOOK CONTROLLER
 */
const notebookController = () => {
	const notes = document.querySelectorAll('.note');
	notes.forEach((cur, i) => {
		cur.addEventListener('click', (e) => {
			const noteTitle = notes[i].querySelector('.note-title').textContent;
			const noteCopy = notes[i].querySelector('.note-copy').textContent;

			// Populate form with existing content
			helperFns.revealEditNoteForm(cur.id, noteTitle, noteCopy);
			state.editId = Number(cur.id);
		})
	})
}



/**
 * TRASH NOTE
 */
app.addEventListener('click', (e) => {
	// Trash Note from Notebook
	if (e.target.matches('.delete-box, .delete-box *')) {
		const noteId = Number(e.target.closest('.note').id);
		const noteToDelete = e.target.closest('.note');

		state.notebook.deleteNoteFromState(noteId);
		notebookView.removeNoteFromUI(noteToDelete)

		if (state.notebook.notes.length === 0) {
			directs.notesToHome();
		}
	}
})