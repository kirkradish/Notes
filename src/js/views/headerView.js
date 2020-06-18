import { elements, helperFns } from './base';

const createHeader = () => {
	const markup = '<header class="app-header"></header>';
	elements.appContainer.insertAdjacentHTML('afterbegin', markup);
}

export const showAppTitle = () => {
	const markup = `
		<h1 class="app-title">Notes</h1>
	`;
	createHeader();
	setTimeout(() => {
		document.querySelector('.app-header').insertAdjacentHTML('afterbegin', markup)
	}, 200)
	// add class to animate title up
}

export const removeHeader = () => {
	const header = document.querySelector('.app-header')
	header.parentNode.removeChild(header)
	// add class to animate title down
}

export const showHeaderUtility = (instruction) => {
	const header = document.querySelector('.app-header')
	const instructionDiv = `<div class="app-editor"><p>${instruction}</p></div>`;

	setTimeout(() => {
		header.insertAdjacentHTML('beforeend', instructionDiv)
		const instructionBtn = document.querySelector('.app-editor')
	}, 200)
}

export const removeHeaderUtility = () => {
	const editToggle = document.querySelector('.app-editor')
	editToggle.classList.add('move-out-down')
	editToggle.parentNode.removeChild(editToggle)
}