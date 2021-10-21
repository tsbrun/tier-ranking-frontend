// JS MANTRA: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

// const api_url = 'http://localhost:3000/api/v1' 

document.addEventListener('DOMContentLoaded', () => {
    hideEmptyUncategorized()

    fetchCategories()
    .then(categories => {
        categories.data.forEach(category => {
            const newCategory = new Category(category)

            document.querySelector('.main').appendChild(newCategory.renderCategoryDiv())
        })
    })
    .catch(err => console.log(err))

    showUncategorized()

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

function fetchItems() {
    return fetch(`${api_url}/items`)
    .then(resp => resp.json())
}

function hideEmptyUncategorized() {
    const uncategorized = document.querySelector('div[data-category=null]')
    uncategorized.style.display = "none"
}

function showUncategorized() {
    const uncategorized = document.querySelector('div[data-category=null]')
    uncategorized.style.display = "block"
}