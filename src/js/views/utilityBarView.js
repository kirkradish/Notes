import { app } from './base';

const buildEditorUtility = () => {
	return `
		<div class="info discard">Discard Edits</div>
		<div class="note-utility trash">
			<i class="fas fa-trash-alt"></i>
		</div>
	`;
}
const buildFormUtility = () => {
	return `
		<div class="info"></div>
		<div class="note-utility trash">
			<i class="fas fa-trash-alt"></i>
		</div>
	`;
}
const buildNotebookUtility = (notes) => {
	return `
		<div class="info note-count">${notes.length} ${notes.length > 1 ? 'notes' : 'note'}</div>
		<div class="note-utility trash"></div>
	`;
}


export const showUtilityBar = (page, notes = null) => {
	let utilityBar = ``;
	switch (page) {
		case 'new-note':
			utilityBar = buildFormUtility();
			break;
		case 'edit-note':
			utilityBar = buildEditorUtility();
			break;
		case 'notebook':
			utilityBar = buildNotebookUtility(notes);
			break;
	}
	const markup = `<div class="utility-bar">${utilityBar}</div>`;

	app.insertAdjacentHTML('beforeend', markup)
	document.querySelector('.utility-bar').classList.add('move-in-up')
}

export const removeUtilityBar = () => {
	const utilityBar = document.querySelector('.utility-bar');
	setTimeout(() => {
		utilityBar.classList.remove('move-in-up')
		utilityBar.classList.add('move-out-down')
		utilityBar.parentNode.removeChild(utilityBar)
	}, 100)
}