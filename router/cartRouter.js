const express = require('express');
const { Router } = express
const Cart = require('../cart/Cart.js')

const dbCart = new Cart('./cart/cart.json')
const router = Router();

router.get('/cart/:id/products', (req, res) => {
    const id = Number(req.params.id)
    const cart = dbCart.getCart(id)
    res.json(cart)
})

router.post('/cart', (req, res) => {
    const id = Math.floor(Math.random() * 999999)
    dbCart.createCart(id)
    res.send(id.toString())
})

router.post('/cart/:id/products', (req, res) =>{
    const id = Number(req.params.id)
    dbCart.saveCart(req.body, id)
    res.send("Added")
})

router.delete(`/cart/:id`, (req, res) =>{
    const id = Number(req.params.id)
    const dataId = dbCart.deleteCart(id)
    res.json(dataId)
})

router.delete(`/cart/:id/products/:prodId`, (req, res) =>{
    const cartId = Number(req.params.id)
    const prodId = Number(req.params.prodId)
    dbCart.deleteProd(cartId, prodId)
    res.json("Borrado")

})

module.exports = router;