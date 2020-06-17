import { elements, helperFns } from './base';

export const showNotebook = () => {
	const markup = `<div class="notebook notebook-to-right"></div>`
	document.querySelector('.notebook-container').insertAdjacentHTML('beforeend', markup)

	addNote();
	helperFns.placeEditToggle('Edit')
}

const addNote = () => {
	const markup = `
		<div class="note">
			<header class="note-header">
				<h2 class="note-title">Title of Note</h2>
				<p class="note-date">6/12/2020</p>
			</header>
			<p class="note-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	`;
	document.querySelector('.notebook').insertAdjacentHTML('beforeend', markup)
}