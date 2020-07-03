import NotebookModel from './models/NotebookModel';
import * as homeView from './views/homeView';
import * as notebookView from './views/notebookView';
import * as formView from './views/formView';
import { app, directs } from './views/base';


const state = {}
// TESTING
window.state = state;


/**
 * START AT HOME OR NOTEBOOK
 * Whether or not localStorage has notes
 */
window.addEventListener('load', (event) => {
	state.notebookModel = new NotebookModel();
	
	if (state.notebookModel.notes.length > 0) {
		state.page = 'notebook';
		notebookView.showNotebookContainer('maximize-in');
		directs.straightToNotes(state.page, state.notebookModel.notes);
		notebookController();
	} else {
		state.page = 'home';
		homeView.buildHomeScreen();
	}
});

/**
 * HOME 
 * Click new note button
 */
app.addEventListener('click', (e) => {
	if (e.target.matches('.add-container__button, .add-container__button *')) {
		state.page = 'new-note';
		directs.homeToForm(state.page);
	}
});


/**
 * FORM
 * Save (new or edited note)
 * Trash (new, existing (including edited) note)
 * Discard (edits)
 */
app.addEventListener('click', (e) => {
	// Save Note from Form
	if (e.target.matches('.app-header__editor.save, .app-header__editor.save *')) {
		state.page = 'notebook';
		if (state.editId) {
			state.notebookModel.notes.forEach(cur => {
				if (cur.id === state.editId) {
					const editValues = formView.getFieldValues(cur)
					cur.title = editValues.title;
					cur.copy = editValues.copy;
					directs.formToNotes(state.page, state.notebookModel.notes);
					state.notebookModel.addNotesToLocalStorage(state.notebookModel.notes);
					notebookController();
				}
			})
			// Clear id state
			state.editId = '';
		} else {
			// SAVE NEW NOTE
			const noteValues = formView.getFieldValues();
			const noteTitle = document.querySelector('.form-box__title');
			const noteCopy = document.querySelector('.form-box__copy');
			if (noteValues.title !== '' && noteValues.copy !== '') {
				if (noteTitle.classList.contains('red')) noteTitle.classList.remove('red');
				if (noteCopy.classList.contains('red')) noteCopy.classList.remove('red');
				// Add Note Addition to State
				state.notebookModel.createNewNote(noteValues)
				directs.formToNotes(state.page, state.notebookModel.notes);
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
			if (state.notebookModel.notes.length === 0) {
				state.page = 'home';
				directs.formToHome();
			} else {
				state.page = 'notebook';
				directs.formToNotes(state.page, state.notebookModel.notes);
				notebookController();
			}
		}
		if (state.page === 'edit-note') {
			const noteId = state.editId;
			state.notebookModel.deleteNoteFromState(noteId);
			state.page = 'notebook';
			if (state.notebookModel.notes.length > 0) {
				directs.formToNotes(state.page, state.notebookModel.notes);
				notebookController();
			} else {
				directs.formToHome();
			}
		}
		state.notebookModel.addNotesToLocalStorage(state.notebookModel.notes);
	}
	// Discard Edits
	if (e.target.matches('.utility-bar .discard, .utility-bar .discard *')) {
		state.page = 'notebook';
		state.editId = '';
		
		directs.formToNotes(state.page, state.notebookModel.notes)
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
	const domNotes = document.querySelectorAll('.note');
	domNotes.forEach((cur) => {
		cur.addEventListener('click', () => {
			state.page = 'edit-note';
			const curId = Number(cur.id);

			const noteToEdit = state.notebookModel.notes.find(note => note.id === curId);
			// Populate form with existing content
			directs.notesToForm(state.page, noteToEdit);
			// Let form know you're editing
			state.editId = curId;
		})
	})
}
