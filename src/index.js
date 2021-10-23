// JS MANTRA: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

// const api_url = 'http://localhost:3000/api/v1' 

document.addEventListener('DOMContentLoaded', () => {
    // hide tier-ranking div until tier-ranking button is clicked
    hideTierRanking()

    const tierRankingButton = document.querySelector('#tier-ranking-button')

    tierRankingButton.addEventListener("click", () => {
        showTierRanking()

        tierRankingButton.innerText = "Save Ranking"

        // add items to tier-items container
        addItemsToTierRanking()

        const draggables = document.querySelectorAll('.draggable')
        setDraggableEventListeners(draggables)

        const tiers = document.querySelectorAll('.tier')
        setTierEventListeners(tiers)

        tierRankingButton.addEventListener("click", () => {
            hideTierRanking()
            loadPage()
        })
    })

        // seed data to test tier-ranking feature
        const moviesData = { "id": 1, "title": "Movies" }
        const newCategory = new Category(moviesData)
        const hungerGamesData = { "id": 1, "name": "The Hunger Games", "img": "https://images-na.ssl-images-amazon.com/images/I/71WSzS6zvCL.jpg", "rank": 0, "category": Category.all[0] }
        const hungerGames = new Item(hungerGamesData)
        const duneData = { "id": 2, "name": "Dune", "img": "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg", "rank": 0, "category": Category.all[0] }
        const dune = new Item(duneData)
        const valerianData = { "id": 3, "name": "Valerian", "img": "https://upload.wikimedia.org/wikipedia/en/0/07/Valerian_and_the_City_of_a_Thousand_Planets.jpg", "rank": 0, "category": Category.all[0] }
        const valerian = new Item(valerianData)

    // display the rest of the page 
    loadPage()

    // post new category data to server
    const createCategoryForm = document.querySelector("#create-category-form")
    createCategoryForm.addEventListener("submit", (e) => createCategoryHandler(e))

    // post new item data to server
    const createItemForm = document.querySelector("#create-item-form")
    createItemForm.addEventListener("submit", (e) => createItemHandler(e))
})

function loadPage() {
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
}

// fetch, create, and display functions

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
        option.value = category.id 
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

function createCategoryHandler(e) {
    e.preventDefault()

    // get category data from form
    const categoryFormData = new FormData(e.target)
    let data = { "category": {} }
    for (var pair of categoryFormData.entries()) {
        data["category"][`${pair[0]}`] = `${pair[1]}`
    }

    // post data to server
    fetch(`http://localhost:3000/api/v1/categories`, {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function createItemHandler(e) {
    e.preventDefault()

    const itemFormData = new FormData(e.target)
    let data = { "item": {} }

    data["item"]["name"] = itemFormData.get("name")
    data["item"]["img"] = itemFormData.get("img")
    data["item"]["category"] = findCategoryById(Category.all, "id", parseInt(itemFormData.get("category")))

    fetch(`http://localhost:3000/api/v1/items`, {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function findCategoryById(categories, key, value) {
    for (var i = 0; i < categories.length; i++) {
        if (categories[i][key] === value) {
            return categories[i];
        }
    }
    return null;
}

function hideTierRanking() {
    const tierRanking = document.querySelector('div.tier-ranking')
    tierRanking.style.display = "none"
}

function showTierRanking() {
    const tierRanking = document.querySelector('div.tier-ranking')
    tierRanking.style.display = "block"
}

// tier-ranking functions

function addItemsToTierRanking() {
    const items = Item.all 

    items.forEach(item => {
        const draggableItem = item.renderItemDiv()
        draggableItem.classList.add('draggable')

        document.querySelector('div.tier-items').appendChild(draggableItem)
    })
}

function setDraggableEventListeners(draggables) {
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })
}

function setTierEventListeners(tiers) {
    tiers.forEach(tier => {
        tier.addEventListener('dragover', e => {
            e.preventDefault() // allow item to be dropped into the tier container (not allowed by default)
            const afterElement = getDragAfterElement(tier, e.clientY)
            const draggable = document.querySelector('.dragging')

            if (afterElement == null) {
                tier.appendChild(draggable)
            } else {
                tier.insertBefore(draggable, afterElement) 
            }
        })
    })
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}