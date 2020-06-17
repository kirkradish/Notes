import { elements } from './views/base';
import HomeView from './views/homeView';
import NewNoteView from './views/newNoteView';


const state = {}
state.homeView = new HomeView();

window.state = state;

elements.appContainer.addEventListener('click', (e) => {
	if (e.target.matches('.add-circle, .add-circle *')) {
		document.querySelector('.add-container').classList.add('disappear')
		setTimeout(() => {
			elements.appContainer.removeChild(document.querySelector('.add-container'))
		}, 300)
		// keep time same as disappear animate style in css (or a little slower)

		delete state.homeView;
		state.newNoteView = new NewNoteView()
	}
})