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
 * CONTROL HOME
 */
app.addEventListener('click', (e) => {
	if (e.target.matches('.add-circle, .add-circle *')) {
		directs.homeToForm();
		state.page = 'new-note';
	}
});


/**
 * CONTROL NEW NOTE
 */
app.addEventListener('click', (e) => {
	// Save
	if (e.target.matches('.app-editor, .app-editor *')) {
		directs.formToNotes();
		state.page = 'notebook';
	}
	// Trash
	if (e.target.matches('.note-utility.trash, .note-utility.trash *')) {
		directs.formToHome();
		state.page = 'home';
	}
})




/**
 * ADD NEW NOTE
 * Go to New Note page with form
 */
app.addEventListener('click', (e) => {
	// If on Notebook (archive) page
	if (e.target.matches('.note-utility.new, .note-utility.new *')) {
		state.page = 'new-note';
		notebookView.hideNotebook()
		headerView.removeHeaderUtility()
		utilityBarView.removeUtilityBar()
		setTimeout(() => {
			newNoteView.newPageForm()
			headerView.showHeaderUtility('Save')
			utilityBarView.showUtilityBar(null, 'trash')
		}, 200)
	}
})



/**
 * SAVE NOTE
 */
app.addEventListener('click', (e) => {
	if (e.target.matches('.app-editor, .app-editor *')) {
		const instructionBtn = document.querySelector('.app-editor');
		
		// Save Note
		if (instructionBtn.textContent === 'Save') {
			// Add Note to state
			const noteValues = newNoteView.getFieldValues();
			
			if (noteValues.title !== '', noteValues.copy !== '') {
				state.notebook.createNewNote(noteValues)
				// Remove new sheet
				document.querySelector('.form-box').classList.add('new-note-right')
				// Remove 'Save' button from UI & DOM
				instructionBtn.classList.add('new-note-right')
				setTimeout(() => {
					instructionBtn.parentNode.removeChild(instructionBtn)
					document.querySelector('.form-box').parentNode.removeChild(document.querySelector('.form-box'))
					utilityBarView.removeUtilityBar()
					notebookController();
				}, 200)
			} else {
			// 	console.log('Do something if user enters no notes');
			}
		}
	}
});



/**
 * NOTEBOOK CONTROLLER
 */
const notebookController = () => {
	// Slide in notebookView
	utilityBarView.showUtilityBar(null, 'new')
	notebookView.showNotebook(state.notebook.notes);
	headerView.showHeaderUtility('Edit')

	const notes = document.querySelectorAll('.note');
	notes.forEach((cur, i) => {
		cur.addEventListener('click', (e) => {
			const noteTitle = notes[i].querySelector('.note-title').textContent;
			const noteCopy = notes[i].querySelector('.note-copy').textContent;
			
			// helperFns.removeNotePad();
			helperFns.revealEditNoteForm(noteTitle, noteCopy);

		})
	})
}



/**
 * EDIT NOTE
 */
app.addEventListener('click', (e) => {
	if (e.target.matches('.app-editor, .app-editor *')) {
		const instructionBtn = document.querySelector('.app-editor');
		if (instructionBtn.textContent === 'Edit') {
			notebookView.onEditNote()
			headerView.removeHeaderUtility()
			headerView.showHeaderUtility('Done')
		}
		if (instructionBtn.textContent === 'Done') {
			notebookView.onDoneEditingNote()
			headerView.removeHeaderUtility()
			headerView.showHeaderUtility('Edit')
		}
	}
})



/**
 * TRASH NOTE
 */
app.addEventListener('click', (e) => {
	// Trash Existing Note
	if (e.target.matches('.delete-box, .delete-box *')) {
		const noteId = Number(e.target.closest('.note').id);
		const noteToDelete = e.target.closest('.note');

		// Delete from State
		state.notebook.notes.forEach((cur, i) => {
			if (cur.id === noteId) {
				state.notebook.notes.splice(state.notebook.notes[i], 1);
			}
		})
		// Delete from UI
		noteToDelete.parentNode.removeChild(noteToDelete)
		if (state.notebook.notes.length === 0) {
			helperFns.notepadToHomepage();
		}
	}

})