import { app } from './base';

export const showUtilityBar = (info, icon) => {
	const markup = `
		<div class="utility-bar">
			<div class="note-count">${info}</div>
			<div class="note-utility ${icon === 'new' ? 'new' : 'trash'}">
				<i class="fas ${icon === 'new' ? 'fa-plus-square' : 'fa-trash-alt'}"></i>
			</div>
		</div>
	`;
	app.insertAdjacentHTML('beforeend', markup)
	document.querySelector('.utility-bar').classList.add('move-in-up')
}

export const removeUtilityBar = () => {
	const utilityBar = document.querySelector('.utility-bar');
	setTimeout(() => {
		utilityBar.classList.remove('move-in-up')
		utilityBar.classList.add('move-out-down')
		setTimeout(() => {
			utilityBar.parentNode.removeChild(utilityBar)
		}, 100)
	}, 100)
}