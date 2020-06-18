import NotebookModel from './models/NotebookModel';
import * as homeView from './views/homeView';
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
	homeView.buildAddScreen();

	const setUpNewNote = () => {
		newNoteView.newPage()
		utilityBarView.createUtilityBar(null, 'trash')
	}
	const replaceHome = () => {
		// Remove notepad and utility bar
		helperFns.removeNotePad()
		utilityBarView.removeUtilityBar()
		setTimeout(() => {
			homeView.buildAddScreen();
		}, 200)
	}
	// Attach a click listener to go to next page
	homeView.removeAddScreen(setUpNewNote)

	// Click trash
	elements.appContainer.addEventListener('click', (e) => {
		if (e.target.matches('.note-utility *')) {
			if (e.target.classList.contains('fa-trash-alt')) {
				replaceHome();
			}
		}
	})
});



/**
 * NEW NOTE
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
}