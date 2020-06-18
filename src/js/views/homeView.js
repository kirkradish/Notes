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
}

export const removeAddScreen = (showNextPage) => {
	elements.appContainer.addEventListener('click', (e) => {
		if (e.target.matches('.add-circle, .add-circle *')) {
			const addContainer = document.querySelector('.add-container')
			addContainer.classList.add('disappear')

			setTimeout(() => {
				addContainer.parentNode.removeChild(addContainer)
				showNextPage();
			}, 200)
		}
	})
}