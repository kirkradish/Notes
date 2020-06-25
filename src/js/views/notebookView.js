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

export const addNoteToUI = (note) => {
	const markup = `
		<div class="note" id="${note.id}">
			<div class="note-preview">
				<header class="note-header">
					<h2 class="note-title">${note.title}</h2>
					<p class="note-date">${note.date}</p>
				</header>
				<p class="note-copy">${note.copy}</p>
			</div>
		</div>
	`; 
	document.querySelector('.notebook').insertAdjacentHTML('afterbegin', markup)
}

export const removeNoteFromUI =(note) => {
	note.parentNode.removeChild(note)
}

export const onEditNote = () => {
	const markup = `
		<div class="delete-box">
			<i class="fas fa-trash-alt"></i>
		</div>
	`;
	document.querySelectorAll('.note-preview').forEach(cur => {
		cur.classList.add('edit-note')
		setTimeout(() => {
			cur.insertAdjacentHTML('afterend', markup)
		}, 300)
	})
}

export const onDoneEditingNote = () => {
	document.querySelectorAll('.note-preview').forEach(cur => {
		cur.classList.remove('edit-note')
		cur.parentNode.removeChild(document.querySelector('.delete-box'))
	})
}

