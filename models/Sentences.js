const mongoose = require('mongoose');

const SentencesSchema = mongoose.Schema({
    // _id: { type: mongoose.Types.ObjectId, auto: true },
    text: String,
    mamaVersion: String,
    papaVersion: String,
    mamaCheck: Boolean,
    papaCheck: Boolean,
    mamaResolved: Boolean,
    papaResolved: Boolean
}, {
    timestamps: true
}, {
    collection: 'sentences'
});

module.exports = mongoose.model('Sentences', SentencesSchema);