export const elements = {
	appContainer: document.querySelector('.app-container')
}

export const helperFns = {
	createElement: (tag, className) => {
		const element = document.createElement(tag)
		if (className) element.classList.add(className)
		return element
	}
}