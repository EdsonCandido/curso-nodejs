const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const UserSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;