import { helperFns } from './base';

export const showNotebook = (notes) => {
	const markup = `<div class="notebook notebook-to-right"></div>`
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)

	notes.forEach(note => addNoteToUI(note))
}

export const hideNotebook = () => {
	const notebook = document.querySelector('.notebook')
	notebook.classList.add('move-out-down')
	setTimeout(() => {
		notebook.parentNode.removeChild(notebook)
	}, 200)
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

