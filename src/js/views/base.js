import * as headerView from './headerView';
import * as utilityBarView from './utilityBarView';
import * as homeView from './homeView';
import * as formView from './formView';
import * as notebookView from './notebookView';

export const app = document.querySelector('#app');

export const directs = {
	straightToNotes: (page, notes) => {
		headerView.showAppTitle();
		headerView.showHeaderUtility(page);
		notebookView.showNotebook(notes, 'maximize-in');
		utilityBarView.showUtilityBar(page, notes);
	},
	homeToForm: (page) => {
		homeView.removeHomeScreen();
		headerView.showAppTitle();
		headerView.showHeaderUtility(page)
		notebookView.showNotebookContainer('move-in-up');
		formView.newPageForm();
		utilityBarView.showUtilityBar(page);
	},
	formToHome: () => {
		headerView.removeHeader();
		formView.clearForm();
		notebookView.removeNotebookContainer('move-down-out');
		utilityBarView.removeUtilityBar();
		homeView.buildHomeScreen();
	},
	formToNotes: (page, notes) => {
		headerView.removeHeaderUtility();
		headerView.showHeaderUtility(page);
		utilityBarView.removeUtilityBar();
		utilityBarView.showUtilityBar(page, notes);
		formView.removeNewPageForm('move-right-out')
		notebookView.showNotebook(notes, 'move-right-in');
	},
	notesToHome: () => {
		notebookView.removeNotebookContainer('move-down-out');
		headerView.removeHeader();
		homeView.buildHomeScreen();
		utilityBarView.removeUtilityBar();
	},
	notesToForm: (page, note = null) => {
		headerView.removeHeaderUtility();
		headerView.showHeaderUtility(page);
		notebookView.removeNotebook();
		formView.newPageForm();
		utilityBarView.removeUtilityBar();
		utilityBarView.showUtilityBar(page);
		if (note) formView.populateEditForm(note);
	}
}