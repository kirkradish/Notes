import moment from 'moment';
import { helperFns } from './base';

export const newPageForm = () => {
	const markup = `
		<div class="form-box">
			<input type="text" class="title-field" placeholder="Title">
			<textarea class="note-field" placeholder="What's up?"></textarea>
		</div>
	`;
	
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)
}

export const getFieldValues = () => {
	return {
		title: document.querySelector('.title-field').value,
		copy: document.querySelector('.note-field').value
	}
}