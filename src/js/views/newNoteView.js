import { elements, helperFns } from './base';
import * as notebookView from './notebookView';

export const newPage = () => {
	const markup = `
		<div class="form-box">
			<input type="text" class="title-field" placeholder="Title">
			<textarea class="note-field" placeholder="What's up?"></textarea>
		</div>
	`;
	
	helperFns.showNotePad()
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)
	helperFns.placeEditToggle('Done')
}