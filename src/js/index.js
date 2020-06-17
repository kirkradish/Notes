import NotebookModel from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as newNoteView from './views/newNoteView';
import * as notebookView from './views/notebookView';
import { elements, helperFns } from './views/base';


const state = {}
// TESTING
window.state = state;

// HOME
window.addEventListener('load', (event) => {
	homeView.buildAddScreen();
});


// NEW NOTE
elements.appContainer.addEventListener('click', (e) => {
	if (e.target.matches('.app-editor, .app-editor *')) {
		const instructionBtn = document.querySelector('.app-editor');
		
		if (instructionBtn.textContent === 'Done') {
			// Add Note to state
			const title = newNoteView.getNoteTitle();
			const copy = newNoteView.getNoteCopy();
			
			if (title !== '' && copy !== '') {
				const newNote = newNoteView.createNewNote();
				state.notebookModel = new NotebookModel(newNote);
				state.notebookModel.addNoteToState();
			}

			// Remove new sheet
			document.querySelector('.form-box').classList.add('new-note-right')
			// Remove Done button from UI & DOM
			instructionBtn.classList.add('new-note-right')
			setTimeout(() => {
				instructionBtn.parentNode.removeChild(instructionBtn)
				document.querySelector('.form-box').parentNode.removeChild(document.querySelector('.form-box'))
				notebookController();
			}, 200)
		}
	}
});


// NOTEBOOK CONTROLLER
const notebookController = () => {
	// Slide in notebookView
	notebookView.showNotebook(state.notebookModel.notes);
}