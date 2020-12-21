const mongoose = require('mongoose');

const EssaySchema = mongoose.Schema({
    // _id: { type: mongoose.Types.ObjectId, auto: true },
    task: String,
    tesx: String,
    creator: String,
    modifiedText: String,
    resolved: Boolean
}, {
    timestamps: true
}, {
    collection: 'essay'
});

module.exports = mongoose.model('Essay', EssaySchema);