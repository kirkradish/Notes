import moment from 'moment';
import { helperFns } from './base';

export const newPage = () => {
	const markup = `
		<div class="form-box">
			<input type="text" class="title-field" placeholder="Title">
			<textarea class="note-field" placeholder="What's up?"></textarea>
		</div>
	`;
	
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)
}



// These will go in NotebookModel ?
export const createNewNote = () => {
	const note = {
		id: Math.floor(1000 + Math.random() * 9000),
		date: moment().format('MMMM D[,] YYYY'),
		title: getNoteTitle(),
		copy: getNoteCopy()
	}
	return note;
}

export const getNoteTitle = () => {
	return document.querySelector('.title-field').value
}
export const getNoteCopy = () => {
	return document.querySelector('.note-field').value
}
