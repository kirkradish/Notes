import { app, helperFns } from './base';

export const buildHomeScreen = () => {
	const markup = `
		<div class="add-container">
			<p>Something on your mind?</p>
			<div class="add-circle"><i class="fas fa-plus"></i></div>
			<p>Write it down!</p>
		</div>
	`;
	app.insertAdjacentHTML('beforeend', markup);
	document.querySelector('.add-container').classList.add('maximize-in')
}

export const removeHomeScreen = () => {
	const addContainer = document.querySelector('.add-container')
	document.querySelector('.add-container').classList.remove('maximize-in')
	addContainer.classList.add('minimize-out')

	setTimeout(() => {
		addContainer.parentNode.removeChild(addContainer)
	}, 200)
}