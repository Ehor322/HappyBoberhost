const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    picture: { type: String, required: false },
    description: { type: String, required: false }
});


module.exports = model('Achievment', schema);