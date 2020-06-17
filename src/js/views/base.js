export const elements = {
	appContainer: document.querySelector('.app-container'),
	appHeader: document.querySelector('.app-header')
}

export const helperFns = {
	showNotePad: () => {
		const notePadSheet = `<div class="notebook-container"></div>`;
		elements.appContainer.insertAdjacentHTML('beforeend', notePadSheet)
	},
	placeEditToggle: (instruction) => {
		const instructionDiv = `<div class="app-editor"><p>${instruction}</p></div>`;

		setTimeout(() => {
			elements.appHeader.insertAdjacentHTML('beforeend', instructionDiv)
			const instructionBtn = document.querySelector('.app-editor')
		}, 300)
	}
}
