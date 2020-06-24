import * as headerView from './headerView';
import * as utilityBarView from './utilityBarView';
import * as homeView from './homeView';
import * as newNoteView from './newNoteView';
import * as notebookView from './notebookView';

export const app = document.querySelector('#app');


export const helperFns = {
	removeNotePad: () => {
		const notebookContainer = document.querySelector('.notebook-container')
		notebookContainer.classList.remove('move-in-up')
		notebookContainer.classList.add('move-out-down')
		setTimeout(() => {
			notebookContainer.parentNode.removeChild(notebookContainer)
		}, 300)
	},
	revealEditNoteForm: (title, copy) => {
		const notebook = document.querySelector('.notebook');
		notebook.classList.add('move-right-out');
		setTimeout(() => {
			notebook.parentNode.removeChild(notebook)
			headerView.removeHeaderUtility()
			setTimeout(() => {
				newNoteView.newPageForm()
				headerView.showHeaderUtility('Save')
				document.querySelector('.title-field').value = title;
				document.querySelector('.note-field').textContent = copy;
			}, 200)
		}, 190)
		utilityBarView.removeUtilityBar()
		// utilityBarView.showUtilityBar('Discard Changes', 'trash')
	}
}


export const directs = {
	homeToForm: () => {
		homeView.removeHomeScreen();
		headerView.showAppTitle();
		headerView.showHeaderUtility('save', 'Save')
		notebookView.showNotebookContainer('move-in-up');
		newNoteView.newPageForm();
		utilityBarView.showUtilityBar('trash');
	},
	formToHome: () => {
		headerView.removeHeader();
		newNoteView.clearForm();
		notebookView.removeNotebookContainer('move-down-out');
		utilityBarView.removeUtilityBar();
		homeView.buildHomeScreen();
	},
	formToNotes: (notes) => {
		headerView.removeHeaderUtility();
		headerView.showHeaderUtility('edit', 'Edit');
		utilityBarView.removeUtilityBar();
		utilityBarView.showUtilityBar('new');
		newNoteView.removeNewPageForm('move-right-out')
		notebookView.showNotebook(notes, 'move-right-in');
	},
	notesToHome: () => {
		notebookView.removeNotebookContainer('move-down-out');
		headerView.removeHeader();
		utilityBarView.removeUtilityBar();
		homeView.buildHomeScreen();
	}
}