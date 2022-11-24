const fs = require('fs')

    class Container{
    constructor(object = {}){
     this.name = object?.name || ''
     this.price = object?.price || ''
     this.db = [];
    }

    async init() {
        this.readJson = await this.readData()
   }

    async readData() {
            try {
                let objectsJSON =  await fs.promises.readFile('./api/dataBase.json', 'utf-8')
                return JSON.parse(objectsJSON) 
            }
            catch (err) {
                console.log(err)
            }
    }
    
    async saveFile(obj){
        let db = [];
        await this.init()
        db.push(...this.readJson, obj)
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(db))
        }

    async getById(myId){
        await this.init()
        this.readJson === '' ? {error: 'Producto no encontrado'} : ''
        
        const matchId = this.readJson.find((product)=> product.id === myId)
        return matchId == undefined ? {error: 'Producto no encontrado'} : matchId
        
    }

    async deleteById(myId){
            await this.init()
            const filter = this.readJson.filter(prod => prod.id != myId)
            filter == undefined ? {error: 'Producto no encontrado'} : await this.reloadProds(filter)
        }
    
    async reloadProds(filter){
            this.db = []
            this.db.push(...filter)
            await fs.promises.writeFile('./api/dataBase.json', JSON.stringify(this.db))
        }
        

    async editById(myId, name, price, desc, img, stock, code){ 
        await this.init()
        const matchId = this.readJson.filter((product)=> product.id != myId)
        this.db = []
        this.db.push(...matchId)
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(this.db))
        const timestamp = Date.now()
        const data = {
             id: myId,
             name: name,
             price: price,
             desc: desc,
             img: img,
             stock: stock,
             code: code,
             timestamp: timestamp
        }

        this.db.push(data)
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(this.db))
    }

    deleteAll(){
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(this.db))
    }

    async getAll(){
        await this.init()
        return this.readJson
    }
}

module.exports = Container


// ---