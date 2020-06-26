import { app } from './base';

const createHeader = () => {
	const markup = `<header class="app-header"></header>`;
	app.insertAdjacentHTML('afterbegin', markup);
	setTimeout(() => {
		document.querySelector('.app-header').insertAdjacentHTML('afterbegin', markup)
	}, 200)
}

export const showAppTitle = () => {
	const markup = `<h1 class="app-title">Notes</h1>`;
	createHeader();
	setTimeout(() => {
		document.querySelector('.app-header').insertAdjacentHTML('afterbegin', markup)
	}, 200)
}

export const removeHeader = () => {
	const header = document.querySelector('.app-header')
	header.parentNode.removeChild(header)
}

const ctaSave = `<div class="app-editor save"><p>Save</p></div>`;
const ctaNew = `<div class="app-editor new"><p>New</p></div>`;

export const showHeaderUtility = (page) => {
	const header = document.querySelector('.app-header')
	setTimeout(() => {
		if (page === 'new-note' || page === 'edit-note') {
			header.insertAdjacentHTML('beforeend', ctaSave);
		} else if (page === 'notebook') {
			header.insertAdjacentHTML('beforeend', ctaNew);
		}
	}, 200);
}

export const removeHeaderUtility = () => {
	setTimeout(() => {
		const editToggle = document.querySelector('.app-editor')
		editToggle.classList.add('move-down-out')
		editToggle.parentNode.removeChild(editToggle)
	}, 200);
}