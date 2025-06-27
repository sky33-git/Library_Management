const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', async (req, res) => {
    try {
        const books = await Cart.find({}, { _id: 0 })
        res.json(books)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {

    const { title, isbn, pageCount, thumbnailUrl, shortDescription, longDescription,
        status, authors, categories } = req.body

    try {
        const cartBook = new Cart({
            title,
            isbn,
            pageCount,
            thumbnailUrl,
            shortDescription,
            longDescription,
            status,
            authors,
            categories
        })
        const savedBook = await cartBook.save()
        res.status(201).json(savedBook);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }
        console.error('Error adding book in Cart', error)
        res.status(500).json({ message: 'Server error. Could not add the book.' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const book = await Cart.findOne({ cartId: req.params.id }, { _id: 0 })

        res.json(book);
        if (!book) return res.status(404).json({ message: 'Book not found' })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const book = await Cart.findOne({ cartId: req.params.id }, { _id: 0 })
        if (!book) return res.status(404).json({ message: 'Book not found' })

        await Cart.deleteOne({ id: req.params.id })
        res.json({ message: 'Book deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message })

    }
})

module.exports = router