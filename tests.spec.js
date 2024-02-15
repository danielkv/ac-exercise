import { it, expect, vi} from 'vitest'
import  {createDivs} from './createDiv.js'
const { JSDOM, VirtualConsole } = require("jsdom");

// const domLoadedAsync = (window) => new Promise((resolve)=>{
// 	window.addEventListener('DOMContentLoaded',  ()=> {
// 		resolve(true)
// 	})
// })

it('Test the number of child divs', ()=>{
	const dom = new JSDOM('<div id="container"></div>');
	globalThis.document = dom.window.document
	
	createDivs(27)

	//await domLoadedAsync(window)
	expect(globalThis.document.querySelectorAll(".childDiv").length).eq(27)
})

it('When click on any child div should toggle the color blue<->black', ()=>{
	const dom = new JSDOM('<div id="container"></div>');
	globalThis.document = dom.window.document
	
	createDivs(3)

	const elem = document.querySelector('.childDiv:first-child');

	expect(elem.classList.contains('black')).toBeTruthy()
	expect(elem.classList.contains('blue')).toBeFalsy()
	elem.click()
	expect(elem.classList.contains('black')).toBeFalsy()
	expect(elem.classList.contains('blue')).toBeTruthy()
	elem.click()
	expect(elem.classList.contains('black')).toBeTruthy()
	expect(elem.classList.contains('blue')).toBeFalsy()
})

it('When click on any child div should toggle ONLY clicked element', ()=>{
	const dom = new JSDOM('<div id="container"></div>');
	globalThis.document = dom.window.document
	
	createDivs(5)

	const indexClicked = 1
	const elem = document.querySelector(`.childDiv:nth-child(${indexClicked})`);
	const allChilds = document.querySelectorAll('.childDiv');

	elem.click()

	allChilds.forEach((el, index) => {
		if (index +1 === indexClicked) {
			expect(el.classList.contains('black')).toBeFalsy()
			expect(el.classList.contains('blue')).toBeTruthy()
		} else {
			expect(el.classList.contains('black')).toBeTruthy()
			expect(el.classList.contains('blue')).toBeFalsy()
		}
	})
})

it('When click on any child div should print out the ON/OFF message', ()=>{
	const dom = new JSDOM('<div id="container"></div>');
	const logFn = vi.fn();

	globalThis.console = { log: logFn }
	globalThis.document = dom.window.document
	
	createDivs(5)
	
	const elem = document.querySelector(`.childDiv:first-child`);
	
	elem.click()
	expect(logFn).toHaveBeenLastCalledWith('Turning ON 1')
	
	elem.click()
	expect(logFn).toHaveBeenLastCalledWith('Turning OFF 1')
})