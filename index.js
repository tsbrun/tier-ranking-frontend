console.log("in index.js") // log to console in order to check connection

// When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

const BACKEND_URL = 'localhost:3000'

// event: page loads
// fetch: GET categories
// DOM: list categories and append items to respective divs

document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded') // check if event listener is functional
})