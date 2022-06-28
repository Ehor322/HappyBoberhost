const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    type: { type: String, required: false },
    gender: { type: String, required: false },
    color: { type: String, required: false },
    information: { type: String, required: false },
    age: { type: Number, required: false },
    breed: { type: String, required: false },
    price: { type: Number, required: false },
    animalName: { type: String, required: false },
    date: { type: Date, default: Date.now, required: true },
    picture: [{ type: String, required: false }],
    isTop: { type: Boolean, default: false, required: false },
    topEnd: { type: Date, required: false },
    location: { type: String, required: false },
    account: { type: Types.ObjectId, ref: 'Account' }
});


module.exports = model('Ad', schema);