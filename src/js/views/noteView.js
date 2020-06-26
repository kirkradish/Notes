export const onEditMode = () => {
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

export const onDoneEditMode = () => {
	document.querySelectorAll('.note-preview').forEach(cur => {
		cur.classList.remove('edit-note')
		cur.parentNode.removeChild(document.querySelector('.delete-box'))
	})
}