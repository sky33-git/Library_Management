const express = require('express');
const router = express.Router();
const Book = require('../models/Books');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}, { _id: 0 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {

    let bookId = req.params.id
    console.log(bookId);
    
    try {
        const book = await Book.findOne({ id: bookId }, { _id: 0 })

        if (!book) return res.status(404).json({ message: 'Book not found' })
        res.json(book);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {

    const { title, isbn, pageCount, thumbnailUrl, shortDescription, longDescription,
        status, authors, categories } = req.body;

    // let id = books.length + 1


    let year = new Date().getFullYear
    let date = new Date().getDate + 1
    let publishDate = `${date}/${year}`


    try {
        const newBook = new Book({
            // id,
            title,
            isbn,
            pageCount,
            publishDate,
            thumbnailUrl,
            shortDescription,
            longDescription,
            status,
            authors,
            categories
        });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook)

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }
        console.error('Error adding new book:', error);
        res.status(500).json({ message: 'Server error. Could not add the book.' });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ id: req.params.id }, { _id: 0 });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (req.body.title != null) res.book.title = req.body.title;
        if (req.body.isbn != null) res.book.isbn = req.body.isbn;
        if (req.body.pageCount != null) res.book.pageCount = req.body.pageCount;
        if (req.body.publishDate != null) res.book.publishDate = req.body.publishDate;
        if (req.body.thumbnailUrl != null) res.book.thumbnailUrl = req.body.thumbnailUrl;
        if (req.body.shortDescriptionDescription != null) res.book.shortDescription = req.body.shortDescription;
        if (req.body.longDescription != null) res.book.longDescription = req.body.longDescription;
        if (req.body.status != null) res.book.status = req.body.status;
        if (req.body.authors != null) res.book.author = req.body.author;
        if (req.body.categories != null) res.book.categories = req.body.categories;

        const bookObject = res.book.toObject();
        delete bookObject._id;

        const updatedBook = await bookObject.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ id: req.params.id }, { _id: 0 });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await Book.deleteOne({ id: req.params.id });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
})

module.exports = router