class Category {
    constructor(c) {
        this.id = c.id
        this.title = c.title
        Category.all.push(this) // push all instances of Category into an array
    }

    renderCategoryDiv() {
        // title heading
        let title = document.createElement('h2')
        let text = document.createTextNode(this.title)
        title.appendChild(text)

        // div for associated items
        let categoryDiv = document.createElement('div')
        categoryDiv.dataset.category = this.title
        categoryDiv.classList.add('category')

        // append to div.main
        document.querySelector('.main').appendChild(categoryDiv)
        document.querySelector('.main').insertBefore(title, categoryDiv)
    }
}

Category.all = [] // empty array for instances of Category