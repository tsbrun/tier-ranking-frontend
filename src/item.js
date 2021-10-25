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
        img.src = this.img
        itemImg.appendChild(img)
    
        // display name under image
        let name = document.createElement('p')
        let text = document.createTextNode(this.name)
        name.appendChild(text)
        itemDiv.appendChild(name)

        // display star ranking
        let starDiv = document.createElement('div')
        starDiv.classList.add('stars')

        var checked = this.rank
        for(var i = 0; i < checked; i++) {
            let star = document.createElement('span')
            star.classList.add('fa', 'fa-star', 'checked') 
            starDiv.appendChild(star)
        }

        var unChecked = 6 - this.rank 
        for(var i = 0; i < unChecked; i++) {
            let star = document.createElement('span')
            star.classList.add('fa', 'fa-star')
            starDiv.appendChild(star)
        }

        // var times = this.rank -> (create spans with .checked class)
        // var times = 6 (total # of stars) - this.rank -> (create spans w/o .checked class)

        itemDiv.appendChild(starDiv)

        return itemDiv
    }

}

Item.all = []