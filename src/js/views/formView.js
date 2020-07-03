export const newPageForm = () => {
	const markup = `
		<div class="form-box">
			<input type="text" class="form-box__title" placeholder="Title">
			<textarea class="form-box__copy" placeholder="What's up?"></textarea>
		</div>
	`;
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)
	// Allow the for to appear before selecting it's child
	setTimeout(() => {
		document.querySelector('.form-box__title').focus()
	}, 200)

	document.querySelector('.form-box').childNodes.forEach(cur => {
		cur.addEventListener('keyup', function(e) {
			if (e.keyCode === 13) {
				e.preventDefault();
				document.querySelector('.app-header__editor.save').click();
			}
		})
	})
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
	document.querySelector('.form-box__title').value = '';
	document.querySelector('.form-box__copy').value = '';
}

export const getFieldValues = () => {
	return {
		title: document.querySelector('.form-box__title').value,
		copy: document.querySelector('.form-box__copy').value
	}
}

export const populateEditForm = (note) => {
	document.querySelector('.form-box__title').value = note.title;
	document.querySelector('.form-box__copy').textContent = note.copy;
}