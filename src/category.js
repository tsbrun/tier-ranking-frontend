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

        // append heading to div
        div.appendChild(title)

        return div
    }
}

Category.all = [] // empty array for instances of Category