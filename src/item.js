class Item {
    constructor(data) {
        this.id = data.id,
        this.name = data.name,
        this.img = data.img,
        this.rank = data.rank
        this.category = data.category
        Item.all.push(this)
    }

    renderItemDiv() {
        // item and image divs
        let itemDiv = document.createElement('div')
        itemDiv.classList.add('item')
    
        let itemImg = document.createElement('div')
        itemImg.classList.add('item-img')
        itemDiv.appendChild(itemImg)
    
        // display image
        let img = document.createElement('img')
        img.src = item.img
        itemImg.appendChild(img)
    
        // display name under image
        let name = document.createElement('p')
        let text = document.createTextNode(item.name)
        name.appendChild(text)
        itemDiv.appendChild(name)

        // return div
    
        // append to correct div
        if (item.category == null) {
            document.querySelector('div[data-category=null] > div.items').appendChild(itemDiv)
        } else {
            document.querySelector(`div[data-category=${item.category.title}] > div.items`).appendChild(itemDiv)
        }
    }
}

Item.all = []