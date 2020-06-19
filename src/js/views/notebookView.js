import { helperFns } from './base';

export const showNotebook = (notes) => {
	const markup = `<div class="notebook notebook-to-right"></div>`
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)

	notes.forEach(note => addNoteToUI(note))
}

export const addNoteToUI = (note) => {
	const markup = `
		<div class="note">
			<header class="note-header">
				<h2 class="note-title">${note.title}</h2>
				<p class="note-date">${note.date}</p>
			</header>
			<p class="note-copy">${note.copy}</p>
		</div>
	`; 
	document.querySelector('.notebook').insertAdjacentHTML('afterbegin', markup)
}