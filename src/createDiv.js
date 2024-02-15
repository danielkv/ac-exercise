export function createDivs  (count)  {
	const container = document.getElementById("container")

	for (let i =0; i<count; i++) {
		const newElem = document.createElement('div')
		newElem.setAttribute('data-index', i+1)
		newElem.classList.add('black');
		newElem.classList.add('childDiv');
		

		newElem.addEventListener('click', function () {
			if (!newElem.classList.contains('blue')) {
				newElem.classList.remove('black');
				newElem.classList.add('blue');
				console.log(`Turning ON ${this.getAttribute('data-index')}`)
			} else {
				newElem.classList.add('black');
				newElem.classList.remove('blue');
				console.log(`Turning OFF ${this.getAttribute('data-index')}`)
			}
		})

		container.append(newElem)
	}
}

