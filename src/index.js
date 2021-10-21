// JS MANTRA: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

// const api_url = 'http://localhost:3000/api/v1' 

document.addEventListener('DOMContentLoaded', () => {
    // fetch categories and items

    hideEmptyUncategorized()

    fetchCategories()
    .then(categories => {
        displayCategories(categories)
        appendCategoriesToForm()
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
    createCategoryForm.addEventListener("submit", (e) => createFormHandler(e))
})

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

function appendCategoriesToForm(categories) {
    // add category options to create-item-form
    Category.all.forEach(category => {
        const option = document.createElement('option')
        option.value = category.title 
        option.appendChild(document.createTextNode(category.title))

        const categorySelect = document.querySelector('select#category')
        categorySelect.appendChild(option)

        console.log(categorySelect)
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

    // get category data from form
    const categoryFormData = new FormData(e.target)
    let data = { "category": {} }
    for (var pair of categoryFormData.entries()) {
        data["category"][`${pair[0]}`] = `${pair[1]}`
    }

    // post data to server
    fetch(`${api_url}/categories`, {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}