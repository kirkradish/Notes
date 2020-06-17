import { elements, helperFns } from './views/base';
import HomeView from './views/homeView';
import NewNoteView from './views/newNoteView';
import NoteBookView from './views/noteBookView';


// const state = {}

const screen = {}
screen.homeView = new HomeView();

// TESTING
// ---------------------------------------------
// window.state = state;
// ---------------------------------------------

// ADD NEW SCREEN: CLICK ON ADD CIRCLE
elements.appContainer.addEventListener('click', (e) => {
	if (e.target.matches('.add-circle, .add-circle *')) {
		document.querySelector('.add-container').classList.add('disappear')
		setTimeout(() => {
			// Remove from screen
			elements.appContainer.removeChild(document.querySelector('.add-container'))
			// Remove from state
			delete screen.homeView;
		}, 200) // keep time same as disappear animate style in css (or a little slower)

		// Pull up New Note Pad
		helperFns.showNotePad()
		screen.newNoteView = new NewNoteView()
		helperFns.placeEditToggle('Done')
	}
})


// NEW NOTE SCREEN: CLICK ON DONE
elements.appContainer.addEventListener('click', (e) => {
	if (e.target.matches('.app-editor, .app-editor *')) {
		// If user clicks Done -> save note
		if (screen.newNoteView) {
			document.querySelector('.form-box').classList.add('new-note-right')
			document.querySelector('.app-editor').classList.add('new-note-right')
			setTimeout(() => {
				// Remove from screen
				document.querySelector('.note-pad-sheet').removeChild(document.querySelector('.form-box'))
				document.querySelector('.app-header').removeChild(document.querySelector('.app-editor'))
				// Remove from state
				delete screen.newNoteView;
			}, 200) // keep time same as disappear animate style in css (or a little slower)
		}

		// Pull up Notebook
		screen.noteBookView = new NoteBookView()
		helperFns.placeEditToggle('Edit')
	}
})


// NOTEBOOK SCREEN