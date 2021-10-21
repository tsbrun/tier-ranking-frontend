class Category {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        Category.all.push(this) // push all instances of Category into an array
    }

    renderCategoryDiv() {
        // create category div
        let div = document.createElement('div')
        div.dataset.category = this.title 
        div.classList.add('category')

        // create category heading
        let title = document.createElement('h2')
        let text = document.createTextNode(this.title)
        title.appendChild(text)

        // create items div
        let items = document.createElement('div')
        items.classList.add('items')

        div.appendChild(title)
        div.appendChild(items)

        return div
    }
}

Category.all = [] // empty array for instances of Category