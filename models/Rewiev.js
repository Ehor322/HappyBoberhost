const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    text: { type: String, required: false },
    rating: { type: Number, required: false },
    date: { type: Date, default: Date.now, required: true },
    receiver: { type: Types.ObjectId, ref: 'Account' },
    sender: { type: Types.ObjectId, ref: 'Account' }
});


module.exports = model('Rewiev', schema);