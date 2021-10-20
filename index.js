console.log("in index.js") // log to console in order to check connection

// When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

// const api_url = 'http://localhost:3000/api/v1'

// event: page loads
// fetch: GET categories
// DOM: list categories and append items to respective divs

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories()
    .then(categories => console.log(categories))
})

function fetchCategories() {
    return fetch(`${api_url}/categories`)
    .then(resp => resp.json())
}