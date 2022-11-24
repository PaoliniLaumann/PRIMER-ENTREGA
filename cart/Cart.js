const fs = require('fs')

class Cart{
    constructor(file){
        this.file = file
        try {
            console.log('Initializing...')
            this.init()
        }
        catch(error) {
            console.log(`Error Initializing ${error}`)
        }
    }

    async init() {
         this.cart = await this.readCart()
    }

    async readCart() {
        try {
            let objectsJSON = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(objectsJSON) 
        }
        catch (err) {
            console.log(err)
        }
    }

    async createCart(id){
        await this.init()
        const timestamp = Date.now()
        const newCart = {"id": id, timestamp, "products":[]}
        this.cart.push(newCart)
        await fs.promises.writeFile(this.file, JSON.stringify(this.cart))
    }

    async saveCart(obj, id) {
        try {
            await this.init()
            const match = this.cart.find(cartId => cartId.id === id)
            this.cart.push(match.products.push(obj))
            await fs.promises.writeFile(this.file, JSON.stringify(this.cart))
        }
        catch (error) {
            console.log('hay error', error)
        }
    }

    getCart(id){
        this.init()
        const match = this.cart.find(cartId => cartId.id === id)
        return match.products
    }

    async deleteCart(id){
        try {
            await this.init()
            const filter = this.cart.filter(cart => cart.id != id)
            await fs.promises.writeFile(this.file, JSON.stringify(filter))
        } catch (error) {
            console.log('hay error', error)
        }
    }

    async deleteProd(cartId, prodId){
        await this.init()
        let match = this.cart.find(actualCartId => actualCartId.id === cartId)
        const filterProd = match.products.filter(prod => prod.id != prodId)
        await this.deleteCart(cartId)
        await this.reloadProds(match, filterProd)
        
    }

    async reloadProds(match, filterProd){
        match.products = []
        match.products.push(...filterProd)
        await this.init()
        this.cart.push(match)
        await fs.promises.writeFile(this.file, JSON.stringify(this.cart))
    }
        

}

module.exports = Cart
