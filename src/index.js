// JS MANTRA: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

// const api_url = 'http://localhost:3000/api/v1' 

document.addEventListener('DOMContentLoaded', () => {
    // fetch categories and items

    hideEmptyUncategorized()

    fetchCategories()
    .then(categories => {
        displayCategories(categories)
    })
    .catch(err => console.log(err))

    showUncategorized()

    fetchItems()
    .then(items => {
        displayItems(items)
    })
    .catch(err => console.log(err))

    // post new category data to server

    const createCategoryForm = document.querySelector("#create-category-form")
    createCategoryForm.addEventListener("submit", (e) => {
        createFormHandler(e)
    })
})

// event: click on Create New Category
    // event listener on Create New Category
// fetch: POST 
    // fetch(`api_url/categories`) -> how to specify POST?
// DOM: display new category -> we already have a function for that

function fetchCategories() {
    return fetch(`${api_url}/categories`)
    .then(resp => resp.json())
}

function displayCategories(categories) {
    categories.data.forEach(category => {
        const newCategory = new Category(category)

        document.querySelector('.main').appendChild(newCategory.renderCategoryDiv())
    })
}

function fetchItems() {
    return fetch(`${api_url}/items`)
    .then(resp => resp.json())
}

function displayItems(items) {
    items.data.forEach(item => {
        const newItem = new Item(item)

        if (newItem.category == null) {
            document.querySelector('div[data-category=null] > div.items').appendChild(newItem.renderItemDiv())
        } else {
            document.querySelector(`div[data-category=${newItem.category.title}] > div.items`).appendChild(newItem.renderItemDiv())
        }
    })
}

function hideEmptyUncategorized() {
    const uncategorized = document.querySelector('div[data-category=null]')
    uncategorized.style.display = "none"
}

function showUncategorized() {
    const uncategorized = document.querySelector('div[data-category=null]')
    uncategorized.style.display = "block"
}

function createFormHandler(e) {
    e.preventDefault()
    console.log(e)
}