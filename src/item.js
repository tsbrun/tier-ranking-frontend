class Item {
    constructor(data) {
        this.id = data.id,
        this.name = data.name,
        this.img = data.img,
        this.rank = data.rank
        this.category = data.category
        Item.all.push(this)
    }
}

Item.all = []