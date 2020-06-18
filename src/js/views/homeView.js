import { elements, helperFns } from './base';

export const buildAddScreen = () => {
	const markup = `
		<div class="add-container">
			<p>Something on your mind?</p>
			<div class="add-circle"><i class="fas fa-plus"></i></div>
			<p>Write it down!</p>
		</div>
	`;
	elements.appContainer.insertAdjacentHTML('beforeend', markup);
	document.querySelector('.add-container').classList.add('appear')
}

export const removeAddScreen = (showNextPage) => {
	const addContainer = document.querySelector('.add-container')
	document.querySelector('.add-container').classList.remove('appear')
	addContainer.classList.add('disappear')

	setTimeout(() => {
		addContainer.parentNode.removeChild(addContainer)
	}, 200)
}