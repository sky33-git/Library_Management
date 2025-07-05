const mongoose = require('mongoose');
const AutoIncrementFactory = require("mongoose-sequence")(mongoose)

const bookSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    isbn: { type: String },
    pageCount: { type: Number },
    publishDate: { type: String },
    thumbnailUrl: { type: String },
    shortDescription: { type: String },
    longDescription: { type: String },
    status: { type: String },
    authors: { type: [String], required: true },
    categories: { type: [String] },
}, { timestamps: true })

bookSchema.plugin(AutoIncrementFactory, {
    inc_field: "id",
    start_seq: 1000
})

module.exports = mongoose.model('Book', bookSchema)