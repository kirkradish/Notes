import { elements, helperFns } from './base';
import * as newNoteView from './newNoteView';

export const buildAddScreen = () => {
	const markup = `
		<div class="add-container">
			<p>Something on your mind?</p>
			<div class="add-circle"></div>
			<p>Write it down!</p>
		</div>
	`;
	elements.appContainer.insertAdjacentHTML('beforeend', markup);

	elements.appContainer.addEventListener('click', (e) => {
		if (e.target.matches('.add-circle, .add-circle *')) {
			const addContainer = document.querySelector('.add-container')
			addContainer.classList.add('disappear')

			setTimeout(() => {
				addContainer.parentNode.removeChild(addContainer)
				newNoteView.newPage()
			}, 200)
		}
	})
}