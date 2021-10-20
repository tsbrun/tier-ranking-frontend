console.log("in index.js") // log to console in order to check connection

// When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

// const api_url = 'http://localhost:3000/api/v1' 

// event: page loads
// fetch: GET items with associated categories (including items w/o categories)
// DOM: list categories and append associated items underneath (w/ div for uncategorized)

document.addEventListener('DOMContentLoaded', () => {
    // fetch categories
    // markup titles as headings 
    // append divs underneath titles 
    // div class = category.name
    fetchCategories()
    .then(categories => {
        categories.data.forEach(category => {
            renderCategory(category)
        })
    })
    .catch(err => console.log(err))

    // fetch items
    // markup items as images w/ names underneath
    // append to div where class == item.category.name
    // if category == false, append to div.uncategorized
    fetchItems()
    .then(items => {
        items.data.forEach(item => {
            renderItem(item)
        })
    })
    .catch(err => console.log(err))
})

function fetchCategories() {
    return fetch(`${api_url}/categories`)
    .then(resp => resp.json())
}

function renderCategory(category) {
    // title heading
    let title = document.createElement('h2')
    let text = document.createTextNode(category.title)
    title.appendChild(text)

    // div for associated items
    let categoryDiv = document.createElement('div')
    categoryDiv.classList.add(category.title)

    // append to div.main
    document.querySelector('.main').appendChild(categoryDiv)
    document.querySelector('.main').insertBefore(title, categoryDiv)
}

function fetchItems() {
    return fetch(`${api_url}/items`)
    .then(resp => resp.json())
}

function renderItem(item) {
    // clickable image 
    let itemDiv = document.createElement('div')
    item.classList.add('item')
    let img = document.createElement('img')
    img.src = item.img
    itemDiv.appendChild(img)

    // display name under image
    let name = document.createElement('p')
    let text = document.createTextNode(item.name)
    name.appendChild(text)
    itemDiv.appendChild(name)

    // append to correct div
    if (item.category == null) {
        document.querySelector('.null').appendChild(itemDiv)
    } else {
        document.querySelector(`.${item.category.title}`).appendChild(itemDiv)
    }
}