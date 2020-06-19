export const app = document.querySelector('#app');


export const helperFns = {
	showNotePad: () => {
		const notePadSheet = `<div class="notebook-container"></div>`;
		app.insertAdjacentHTML('beforeend', notePadSheet)
		document.querySelector('.notebook-container').classList.add('move-in-up')
	},
	removeNotePad: () => {
		const notePadSheet = `<div class="notebook-container"></div>`;
		const notebookContainer = document.querySelector('.notebook-container')
		notebookContainer.classList.remove('move-in-up')
		notebookContainer.classList.add('move-out-down')
		setTimeout(() => {
			notebookContainer.parentNode.removeChild(notebookContainer)
		}, 300)
	}
}