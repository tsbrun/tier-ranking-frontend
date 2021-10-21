class Category {
    constructor(id, title) {
        this.id = id
        this.title = title
        Category.all.push(this) // push all instances of Category into an array
    }
}
