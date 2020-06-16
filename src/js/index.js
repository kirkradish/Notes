import { elements } from './views/base';
import HomeAdd from './views/homeView';

const homeAdd = new HomeAdd();

/**
 * CONTROL HOME
 */
const controlHomeScreen = () => {
	console.log('Control Home Screen');
}

elements.appContainer.addEventListener('click', e => {
	if (e.target.matches('.add-circle, .add-circle *')) {
		controlHomeScreen();
	}
})