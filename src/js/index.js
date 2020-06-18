import NotebookModel from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as headerView from './views/headerView';
import * as newNoteView from './views/newNoteView';
import * as notebookView from './views/notebookView';
import * as utilityBarView from './views/utilityBarView.js';
import { elements, helperFns } from './views/base';


const state = {}
// TESTING
window.state = state;



/**
 * HOME
 */
window.addEventListener('load', (event) => {
	state.page = 'home';
	homeView.buildAddScreen();
});


/**
 * ADD NEW NOTE
 * Go to New Note page with form
 */
elements.appContainer.addEventListener('click', (e) => {
	// If on Home page
	if (e.target.matches('.add-circle, .add-circle *')) {
		homeView.removeAddScreen();
		setTimeout(() => {
			state.page = 'new-note'
			helperFns.showNotePad()
			newNoteView.newPage()
			headerView.showAppTitle();
			headerView.showHeaderUtility('Save')
			utilityBarView.showUtilityBar(null, 'trash')
		}, 100)
	}
	// If on Notebook (archive) page
})


/**
 * TRASH NOTE
 */
elements.appContainer.addEventListener('click', (e) => {
	if (e.target.matches('.note-utility *')) {
		if (e.target.classList.contains('fa-trash-alt')) {
			// If there are 0 notes
			// Go to archive page and give note of 'No notes to show, add one now?'?
			// Use this for now
			headerView.removeHeader()
			helperFns.removeNotePad()
			utilityBarView.removeUtilityBar()
			setTimeout(() => {
				homeView.buildAddScreen()
			}, 100)
		}
		// If note count > 0, remove from state and UI
	}
})


/**
 * SAVE NOTE
 */
elements.appContainer.addEventListener('click', (e) => {
	if (e.target.matches('.app-editor, .app-editor *')) {
		const instructionBtn = document.querySelector('.app-editor');
		
		// Save Note
		if (instructionBtn.textContent === 'Save') {
			// Add Note to state
			const title = newNoteView.getNoteTitle();
			const copy = newNoteView.getNoteCopy();
			
			if (title !== '' && copy !== '') {
				const newNote = newNoteView.createNewNote();
				state.notebookModel = new NotebookModel(newNote);
				state.notebookModel.addNoteToState();
				// Remove new sheet
				document.querySelector('.form-box').classList.add('new-note-right')
				// Remove 'Save' button from UI & DOM
				instructionBtn.classList.add('new-note-right')
				setTimeout(() => {
					instructionBtn.parentNode.removeChild(instructionBtn)
					document.querySelector('.form-box').parentNode.removeChild(document.querySelector('.form-box'))
					notebookController();
				}, 200)
			} else {
				console.log('Do something if user enters no notes');
			}
		}
	}
});



/**
 * NOTEBOOK CONTROLLER
 */
const notebookController = () => {
	// Slide in notebookView
	notebookView.showNotebook(state.notebookModel.notes);
	headerView.showHeaderUtility('Edit')
}