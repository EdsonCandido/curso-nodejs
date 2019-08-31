const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    login: {
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    dataAt:{
        type: Date,
        default: Date.now(),
    }
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;