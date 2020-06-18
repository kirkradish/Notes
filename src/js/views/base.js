export const elements = {
	appContainer: document.querySelector('.app-container'),
	appHeader: document.querySelector('.app-header'),
}

export const helperFns = {
	showNotePad: () => {
		const notePadSheet = `<div class="notebook-container"></div>`;
		elements.appContainer.insertAdjacentHTML('beforeend', notePadSheet)
		document.querySelector('.notebook-container').classList.add('move-in-up')
	},
	removeNotePad: () => {
		const notePadSheet = `<div class="notebook-container"></div>`;
		const notebookContainer = document.querySelector('.notebook-container')
		notebookContainer.classList.remove('move-in-up')
		notebookContainer.classList.add('move-out-down')
		helperFns.removeEditToggle()
		setTimeout(() => {
			notebookContainer.parentNode.removeChild(notebookContainer)
		}, 300)
	},
	placeEditToggle: (instruction) => {
		const instructionDiv = `<div class="app-editor"><p>${instruction}</p></div>`;

		setTimeout(() => {
			elements.appHeader.insertAdjacentHTML('beforeend', instructionDiv)
			const instructionBtn = document.querySelector('.app-editor')
		}, 300)
	},
	removeEditToggle: () => {
		const editToggle = document.querySelector('.app-editor')
		editToggle.classList.add('move-out-down')
		editToggle.parentNode.removeChild(editToggle)
	}
}
