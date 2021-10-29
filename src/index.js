// JS MANTRA: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

const api_url = 'http://localhost:3000/api/v1' 

document.addEventListener('DOMContentLoaded', () => {
    // display categories and items
    // hideEmptyUncategorized()
    hideTierRanking()

    loadContent()
    appendCategoriesToForm()
    
    // hide tier-ranking div until tier-ranking button is clicked
    const tierRankingButton = document.querySelector('#tier-ranking-button')

    tierRankingButton.addEventListener("click", () => {
        showTierRanking()

        tierRankingButton.innerText = "Save Ranking"

        addItemsToTierRanking()

        const draggables = document.querySelectorAll('.draggable')
        setDraggableEventListeners(draggables)

        const tiers = document.querySelectorAll('.tier')
        setTierEventListeners(tiers)

        tierRankingButton.addEventListener("click", () => {
            tierRankingButton.innerText = "Tier Ranking"

            // change ranking of items based on tier
            rankItems()
            hideTierRanking()
        })
        loadContent()
        appendCategoriesToForm()
    })

    // post new category data to server
    const createCategoryForm = document.querySelector("#create-category-form")
    createCategoryForm.addEventListener("submit", (e) => createCategoryHandler(e))

    // post new item data to server
    const createItemForm = document.querySelector("#create-item-form")
    createItemForm.addEventListener("submit", (e) => createItemHandler(e))
})

function loadContent() {
    // uncomment this and api_url to demonstrate that fetch requests are being made to api

   fetchCategories()
    .then(categories => {
        displayCategories(categories)
        appendCategoriesToForm()
        // console.log(categories)
    })
    .catch(err => console.log(err))

    showUncategorized()

    fetchItems()
    .then(items => {
        displayItems(items)
    })
    .catch(err => console.log(err))

    // hardcode data to demonstrate app functionality -> fetch requests not working for some reason
    // const categoriesData = [
    //     {
    //         "id": 1,
    //         "title": "Books"
    //       },
    //       {
    //         "id": 2,
    //         "title": "Movies"
    //       },
    //       {
    //         "id": 3,
    //         "title": "Fruit"
    //     }
    // ]

    // categoriesData.forEach(category => {
    //     const newCategory = new Category(category)
    //     document.querySelector('.main').appendChild(newCategory.renderCategoryDiv())
    // })

    // const itemsData = [
    //     {
    //         "id": 1,
    //         "name": "The Metamorphosis",
    //         "img": "https://images-na.ssl-images-amazon.com/images/I/51OoETNYFCL.jpg",
    //         "rank": 0,
    //         "category": {
    //           "id": 1,
    //           "title": "Books"
    //         }
    //       },
    //       {
    //         "id": 2,
    //         "name": "Pride and Prejudice",
    //         "img": "http://prodimage.images-bn.com/pimages/9781499369748_p0_v3_s1200x630.jpg",
    //         "rank": 0,
    //         "category": {
    //           "id": 1,
    //           "title": "Books"
    //         }
    //       },
    //       {
    //         "id": 3,
    //         "name": "Dune",
    //         "img": "https://images-na.ssl-images-amazon.com/images/I/41rgl-8wDsL._SX277_BO1,204,203,200_.jpg",
    //         "rank": 0,
    //         "category": {
    //           "id": 1,
    //           "title": "Books"
    //         }
    //       },
    //       {
    //         "id": 4,
    //         "name": "The Hunger Games",
    //         "img": "https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_FMjpg_UX1000_.jpg",
    //         "rank": 0,
    //         "category": {
    //           "id": 2,
    //           "title": "Movies"
    //         }
    //       },
    //       {
    //         "id": 5,
    //         "name": "Avengers: Endgame",
    //         "img": "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810",
    //         "rank": 0,
    //         "category": {
    //           "id": 2,
    //           "title": "Movies"
    //         }
    //       },
        //   {
        //     "id": 6,
        //     "name": "Alita: Battle Angel",
        //     "img": "https://m.media-amazon.com/images/M/MV5BMTQzYWYwYjctY2JhZS00NTYzLTllM2UtZWY5ZTk0NmYwYzIyXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
        //     "rank": 0,
        //     "category": {
        //       "id": 2,
        //       "title": "Movies"
        //     }
        //   },
    //       {
    //         "id": 7,
    //         "name": "Contigo",
    //         "img": "https://m.media-amazon.com/images/I/61VCQaerr9L._AC_SS450_.jpg",
    //         "rank": 0,
    //         "category": null
    //       },
    //       {
    //         "id": 8,
    //         "name": "black and white composition book",
    //         "img": "https://images.squarespace-cdn.com/content/v1/53f6249be4b0fa46860f073c/1591741383305-2SP0KIKOVOBIK4XTXQ4D/composition.jpg?format=300w",
    //         "rank": 0,
    //         "category": null
    //       },
    //       {
    //         "id": 9,
    //         "name": "Island Mango",
    //         "img": "https://b3h2.scene7.com/is/image/BedBathandBeyond/300626668493769p?$690$&wid=690&hei=690",
    //         "rank": 0,
    //         "category": null
    //       }
    // ]
    
    // itemsData.forEach(item => {
    //     const newItem = new Item(item)
    //     if (newItem.category == null) {
    //         document.querySelector('div[data-category=null] > div.items').appendChild(newItem.renderItemDiv())
    //     } else {
    //         document.querySelector(`div[data-category=${newItem.category.title}] > div.items`).appendChild(newItem.renderItemDiv())
    //     }
    // })
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

function appendCategoriesToForm() {
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

    // const itemFormData = new FormData(e.target)
    let data = { "item": {} }

    data["item"]["name"] = document.querySelector('#input-name').value
    data["item"]["img"] = document.querySelector('#input-img').value
    data["item"]["category"] = findCategoryById(Category.all, "id", document.querySelector('select#category').options["selectedIndex"]) // select category value

    fetch(`http://localhost:3000/api/v1/items`, {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
    .then(json => {
        const newItem = new Item(json.data) 
        // select data object nested within json returned by api (just passing json before
        // which meant that newItem was created but all its properties were undefined)
        if (newItem.category == null) {
            document.querySelector('div[data-category=null] > div.items').appendChild(newItem.renderItemDiv())
        } else {
            document.querySelector(`div[data-category=${newItem.category.title}] > div.items`).appendChild(newItem.renderItemDiv())
        }
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

function findItemByName(items, key, value) {
    // items = Item.all
    // key = "name"
    // value = item.innerText
    for (var i = 0; i < items.length; i++) {
        if (items[i][key] === value) {
            return items[i]
        }
    } 
    return null
}

// tier-ranking functions

function hideTierRanking() {
    const tierRanking = document.querySelector('div.tier-ranking')
    tierRanking.style.display = "none"
}

function showTierRanking() {
    const tierRanking = document.querySelector('div.tier-ranking')
    tierRanking.style.display = "block"
}

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

function rankItems() {
    const items = document.querySelectorAll('div.item')
    items.forEach(item => {
        let itemData = findItemByName(Item.all, "name", item.innerText)
        const id = itemData.id
        const data = { "item": {} }
        data["item"]["rank"] = 0

        switch (item.parentElement.classList[1]) {
            case 's-tier':
                data["item"]["rank"] = 6
                patchDataToApi(`http://localhost:3000/api/v1/items/${id}`, data)
                break;
            case 'a-tier':
                data["item"]["rank"] = 5
                patchDataToApi(`http://localhost:3000/api/v1/items/${id}`, data)
                break;
            case 'b-tier':
                data["item"]["rank"] = 4
                patchDataToApi(`http://localhost:3000/api/v1/items/${id}`, data)
                break;
            case 'c-tier':
                data["item"]["rank"] = 3
                patchDataToApi(`http://localhost:3000/api/v1/items/${id}`, data)
                break;
            case 'd-tier':
                data["item"]["rank"] = 2
                patchDataToApi(`http://localhost:3000/api/v1/items/${id}`, data)
                break;
            case 'f-tier':
                data["item"]["rank"] = 1
                patchDataToApi(`http://localhost:3000/api/v1/items/${id}`, data)
                break;
            default: 
                console.log("Rank remains unchanged...")
        }
    })
}

function patchDataToApi(route, data) { 
    fetch(route, {
        method: 'PATCH', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}