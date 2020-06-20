import Notebook from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as headerView from './views/headerView';
import * as newNoteView from './views/newNoteView';
import * as notebookView from './views/notebookView';
import * as utilityBarView from './views/utilityBarView.js';
import { app, helperFns } from './views/base';


const state = {}
// TESTING
window.state = state;



/**
 * HOME
 */
window.addEventListener('load', (event) => {
	state.notebook = new Notebook();
	state.page = 'home';
	homeView.buildAddScreen();
});


/**
 * ADD NEW NOTE
 * Go to New Note page with form
 */
app.addEventListener('click', (e) => {
	// If on Home page
	if (e.target.matches('.add-circle, .add-circle *')) {
		homeView.removeAddScreen();
		setTimeout(() => {
			state.page = 'new-note';
			helperFns.showNotePad()
			headerView.showAppTitle()
			headerView.showHeaderUtility('Save')
			newNoteView.newPageForm()
			utilityBarView.showUtilityBar(null, 'trash')
		}, 100)
	}
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
	// Trash New Note
	if (e.target.matches('.note-utility *')) {
		if (e.target.classList.contains('fa-trash-alt')) {
			if (state.notebook.notes.length > 0) {
				newNoteView.clearForm()
				newNoteView.removeNewPageForm()
				headerView.removeHeaderUtility()
				utilityBarView.removeUtilityBar()
				notebookController()
			} else {
				// Go to archive page and give note of 'No notes to show, add one now?'?
				// FOR NOW: Go back to homepage
				headerView.removeHeader()
				helperFns.removeNotePad()
				utilityBarView.removeUtilityBar()
				setTimeout(() => {
					homeView.buildAddScreen()
				}, 100)
			}
		}
		// If note count > 0, remove from state and UI
	}
	// Trash Existing Note
	if (e.target.matches('.delete-box, .delete-box *')) {
		const noteId = e.target.closest('.note').id;
		const noteToDelete = e.target.closest('.note');
		console.log(noteId);
		// Delete from State
		// Delete from UI
		noteToDelete.parentNode.removeChild(noteToDelete)

	}

})