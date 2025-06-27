const mongoose = require('mongoose');
const AutoIncrementFactory = require("mongoose-sequence")(mongoose)

const cartSchema = new mongoose.Schema({
    // cartId: {type: Number},
    title: { type: String, required: true },
    isbn: { type: String, },
    pageCount: { type: Number },
    publishDate: { type: Date },
    thumbnailUrl: { type: String },
    shortDescription: { type: String },
    longDescription: { type: String },
    status: { type: String },
    author: { type: [String], required: true },
    categories: { type: [String] },
}, { timestamps: true }, { _id: false })

cartSchema.plugin(AutoIncrementFactory, {
    inc_field: "cartId",
    start_seq: 1
})

module.exports = mongoose.model('Cart', cartSchema);