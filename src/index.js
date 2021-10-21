// JS MANTRA: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

const api_url = 'http://localhost:3000/api/v1' 

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories()
    .then(categories => {
        categories.data.forEach(category => {
            renderCategory(category)
        })
    })
    .catch(err => console.log(err))

    fetchItems()
    .then(items => {
        items.data.forEach(item => {
            renderItem(item)
        })
    })
    .catch(err => console.log(err))
})

// CATEGORY CLASS

class Category {
    constructor(title) {
        this.title = title
    }
}

// FETCH AND RENDER CATEGORIES

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
    categoryDiv.classList.add('category')

    // append to div.main
    document.querySelector('.main').appendChild(categoryDiv)
    document.querySelector('.main').insertBefore(title, categoryDiv)
}

// FETCH AND RENDER ITEMS

function fetchItems() {
    return fetch(`${api_url}/items`)
    .then(resp => resp.json())
}

function renderItem(item) {
    // item and image divs
    let itemDiv = document.createElement('div')
    itemDiv.classList.add('item')

    let itemImg = document.createElement('div')
    itemImg.classList.add('item-img')
    itemDiv.appendChild(itemImg)

    // display image
    let img = document.createElement('img')
    img.src = item.img
    itemImg.appendChild(img)

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