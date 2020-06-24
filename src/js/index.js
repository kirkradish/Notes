import Notebook from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as headerView from './views/headerView';
import * as newNoteView from './views/newNoteView';
import * as notebookView from './views/notebookView';
import * as utilityBarView from './views/utilityBarView.js';
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
			const noteValues = newNoteView.getFieldValues();
			if (noteValues.title !== '', noteValues.copy !== '') {
				state.notebook.createNewNote(noteValues)
				directs.formToNotes(state.notebook.notes);
				state.page = 'notebook';
			} else {
				// title must not be blank
				// copy must not be blank
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
		}
	}
})



/**
 * NOTEBOOK
 */
app.addEventListener('click', (e) => {
	// Add New Note
	if (e.target.matches('.note-utility.new, .note-utility.new *')) {
		directs.notesToForm();
		state.page = 'new-note';
	}
	// Click Edit for Edit Mode
	if (e.target.matches('.app-editor, .app-editor *')) {
		if (e.target.closest('.app-editor').classList.contains('edit')) {
			notebookView.onEditNote()
			headerView.removeHeaderUtility()
			headerView.showHeaderUtility('done', 'Done')
		}
		if (e.target.closest('.app-editor').classList.contains('done')) {
			notebookView.onDoneEditingNote()
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
			
			helperFns.revealEditNoteForm(noteTitle, noteCopy);

		})
	})
}



/**
 * TRASH NOTE
 */
app.addEventListener('click', (e) => {
	// Trash Existing Note
	// if (e.target.matches('.delete-box, .delete-box *')) {
	// 	const noteId = Number(e.target.closest('.note').id);
	// 	const noteToDelete = e.target.closest('.note');

	// 	// Delete from State
	// 	state.notebook.notes.forEach((cur, i) => {
	// 		if (cur.id === noteId) {
	// 			console.log(state.notebook.notes.title)
	// 			state.notebook.notes.splice(state.notebook.notes[i], 1);
	// 		}
	// 	})

	// 	// Delete from UI
	// 	noteToDelete.parentNode.removeChild(noteToDelete)
	// 	if (state.notebook.notes.length === 0) {
	// 		console.log('2')
	// 		directs.notesToHome();
	// 	}
	// }
})