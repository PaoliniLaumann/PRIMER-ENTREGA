const express = require('express');
const { Router } = express
const Container = require('../container/container.js') 

const dataBase = new Container()
const router = Router();

router.get(`/products/:id?`, async (req, res) =>{
  const myId = Number(req.params.id)
  const valide = isNaN(myId)
  if (valide) {
     const data = await dataBase.getAll()
      res.json(data) 
  }else{
     const dataId = await dataBase.getById(myId)
     res.json([dataId]) 
  }
})

router.delete(`/products/:id`, (req, res) =>{
  const admin = req.headers.admin
  console.log(admin);
  if (admin === 'true') {
      const myId = Number(req.params.id)
      console.log(myId);
      const dataId = dataBase.deleteById(myId)
      res.json(dataId)
  } else {
      res.json({error: '-1, route /products method post not autorized'})
  }
  
})

router.post('/products', (req, res) =>{
  const admin = req.headers.admin
  if (admin === 'true') {
      const id = Math.floor(Math.random() * 999999)
      const timestamp = Date.now()
      const {name, price, desc, img, stock, code} = req.body
      dataBase.saveFile({id, name, price, desc, img, stock, code, timestamp})
  } else {
      res.json({error: '-1, route /products method post not autorized'})
  }
  

})

router.put(`/products/:id`, async (req, res) => {
  const admin = req.headers.admin
  if (admin === 'true') {
      const data = await dataBase.getAll()
      const myId = Number(req.params.id)
      
      const checkStock = data.some((product)=> product.id === myId)
      if (checkStock == true) {
          const {name, price, desc, img, stock, code} = req.body
          dataBase.editById(myId, name, price, desc, img, stock, code)
          res.send(`El id ${myId} se modificó con éxito`)
      } else {
          res.status(404).send(`No se encontró el id ${myId}.`)
      }
  }else{
      res.json({error: '-1, route /products method post not autorized'})
  }
  
})


module.exports = router;