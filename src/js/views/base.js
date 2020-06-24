import * as headerView from './headerView';
import * as utilityBarView from './utilityBarView';
import * as homeView from './homeView';
import * as newNoteView from './newNoteView';

export const app = document.querySelector('#app');

export const helperFns = {
	showNotePad: () => {
		if (!document.body.contains(document.querySelector('.notebook-container'))) {
			const notePadSheet = `<div class="notebook-container"></div>`;
			app.insertAdjacentHTML('beforeend', notePadSheet)
			document.querySelector('.notebook-container').classList.add('move-in-up')
		}
	},
	removeNotePad: () => {
		const notePadSheet = `<div class="notebook-container"></div>`;
		const notebookContainer = document.querySelector('.notebook-container')
		notebookContainer.classList.remove('move-in-up')
		notebookContainer.classList.add('move-out-down')
		setTimeout(() => {
			notebookContainer.parentNode.removeChild(notebookContainer)
		}, 300)
	},
	notepadToHomepage: () => {
		headerView.removeHeader()
		helperFns.removeNotePad()
		utilityBarView.removeUtilityBar()
		setTimeout(() => {
			homeView.buildAddScreen()
		}, 100)
	},
	revealNoteForm: (title, copy) => {
		setTimeout(() => {
			helperFns.showNotePad()
			setTimeout(() => {
				newNoteView.newPageForm();
				document.querySelector('.title-field').value = title;
				document.querySelector('.note-field').textContent = copy;
			}, 300);
		}, 300);
	}
}