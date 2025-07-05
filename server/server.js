
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoute.js')
const cartRoutes = require('./routes/cartRoute.js')
const userRoutes = require('./routes/userRoute.js');
// const Books = require('./models/Books.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use('/api/books', bookRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/users', userRoutes);

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL).then(() => {
        console.log('MongoDB connected successfully!')

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    }).catch (err => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
    res.send('Backend is running!')
})

