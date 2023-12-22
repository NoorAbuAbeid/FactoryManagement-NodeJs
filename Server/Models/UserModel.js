const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        FullName: String,
        NumOfActions: Number
    },
    { versionKey: false }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;


