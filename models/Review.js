const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    task: String,
    mamaVersion: String,
    papaVersion: String,
    mamaCheck: Boolean,
    papaCheck: Boolean,
    mamaResolved: Boolean,
    papaResolved: Boolean
}, {
    timestamps: true
}, {
    collection: 'reviews'
});

module.exports = mongoose.model('Review', ReviewSchema);