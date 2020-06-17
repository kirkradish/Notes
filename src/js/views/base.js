export const elements = {
	appContainer: document.querySelector('.app-container'),
	appHeader: document.querySelector('.app-header')
}

export const helperFns = {
	createElement: (tag, className) => {
		const element = document.createElement(tag)
		if (className) element.classList.add(className)
		return element
	},
	placeEditToggle: (instruction) => {
		const div = helperFns.createElement('div', 'app-editor')
		const p = helperFns.createElement('p')
		const text = document.createTextNode(instruction)

		setTimeout(() => {
			div.append(p)
			p.append(text)
			elements.appHeader.append(div)
		}, 300)
	}
}
