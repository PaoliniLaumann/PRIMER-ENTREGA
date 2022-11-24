const express = require('express')
const productsRouter = require('./router/productsRouter.js')
const cartRouter = require('./router/cartRouter.js')

const app = express()

app.use('/', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', cartRouter)
app.use('/api', productsRouter)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, ()=>{
    console.log(`Server http on  http://localhost:${PORT}`);
})
server.on('error', error => console.log('Error on server', error))