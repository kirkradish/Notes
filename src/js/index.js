import * as homeView from './views/homeView';
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

			// Remove new sheet
			document.querySelector('.form-box').classList.add('new-note-right')
			// Remove Done button from UI & DOM
			instructionBtn.classList.add('new-note-right')
			setTimeout(() => {
				instructionBtn.parentNode.removeChild(instructionBtn)
				document.querySelector('.form-box').parentNode.removeChild(document.querySelector('.form-box'))
				// Slide in notebookView
				notebookController();
			}, 200)
		}
	}
});


// NOTEBOOK CONTROLLER
const notebookController = () => {
	notebookView.showNotebook();
}