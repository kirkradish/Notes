export const newPageForm = () => {
	const markup = `
		<div class="form-box">
			<input type="text" class="title-field" placeholder="Title">
			<textarea class="note-field" placeholder="What's up?"></textarea>
		</div>
	`;
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)
}

export const removeNewPageForm = (moverClass) => {
	clearForm();
	const formBox = document.querySelector('.form-box');
	formBox.classList.add(moverClass);
	setTimeout(() => {
		formBox.parentNode.removeChild(formBox);
	}, 200);
}

export const clearForm = () => {
	document.querySelector('.title-field').value = '';
	document.querySelector('.note-field').value = '';
}

export const getFieldValues = () => {
	return {
		title: document.querySelector('.title-field').value,
		copy: document.querySelector('.note-field').value
	}
}

export const revealEditNoteForm = (note) => {
	document.querySelector('.title-field').value = note.title;
	document.querySelector('.note-field').textContent = note.copy;
}