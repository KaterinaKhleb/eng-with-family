const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    // _id: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    strikes: Number,
    // weekNumber: Number,

}, {
    timestamps: true
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);