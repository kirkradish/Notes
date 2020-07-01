export const showNotebookContainer = (moverClass) => {
	const notePadSheet = `<div class="notebook-container"></div>`;
	app.insertAdjacentHTML('beforeend', notePadSheet)
	if (moverClass != '') {
		document.querySelector('.notebook-container').classList.add(`${moverClass}`)
	}
}

export const removeNotebookContainer = (moverClass) => {
	const notebookContainer = document.querySelector('.notebook-container');
	notebookContainer.classList.add(moverClass);
	setTimeout(() => {
		notebookContainer.parentNode.removeChild(notebookContainer);
	}, 200)
}

export const addNoteToUI = (note) => {
	const markup = `
		<div class="note" id="${note.id}">
			<div class="note__preview">
				<header class="note__header">
					<h2 class="note__title">${note.title}</h2>
					<p class="note__date">${note.date}</p>
				</header>
				<p class="note__copy">${shortenNotePreview(note.copy)}</p>
			</div>
		</div>
	`;
	document.querySelector('.notebook').insertAdjacentHTML('afterbegin', markup)
}

export const removeNoteFromUI =(note) => {
	note.parentNode.removeChild(note)
}

export const showNotebook = (notes, moverClass) => {
	const markup = `<div class="notebook ${moverClass}"></div>`
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)

	if (notes) {
		notes.forEach(note => addNoteToUI(note))
	}
}

export const removeNotebook = () => {
	const notebook = document.querySelector('.notebook')
	notebook.classList.add('move-out-down')
	notebook.parentNode.removeChild(notebook)
}

const shortenNotePreview = (noteCopy) => {
	return (noteCopy.length > 100) ? `${noteCopy.slice(0, 100)}...` : noteCopy;
}