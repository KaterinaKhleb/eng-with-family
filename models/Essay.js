const mongoose = require('mongoose');

const EssaySchema = mongoose.Schema({
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
    collection: 'essays'
});

module.exports = mongoose.model('Essay', EssaySchema);