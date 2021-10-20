console.log("in index.js") // log to console in order to check connection

// When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

// const api_url = 'http://localhost:3000/api/v1'

// event: page loads
// fetch: GET items with associated categories (including items w/o categories)
// DOM: list categories and append associated items underneath (w/ div for uncategorized)

document.addEventListener('DOMContentLoaded', () => {
    fetchItems()
    .then(items => console.log(items))
})

function fetchItems() {
    return fetch(`${api_url}/items`)
    .then(resp => resp.json())
}