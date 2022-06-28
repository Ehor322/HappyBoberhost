const { Schema, model, Types } = require('mongoose');

const schema =  new Schema({
    partner: {type: Types.ObjectId, ref:'Account'},
    author: {type: Types.ObjectId, ref:'Account'},
    lastMessage: { type: Types.ObjectId, ref: 'Message' },
    ad: {type: Types.ObjectId, ref:'Ad'},
}, {
    timestamps: true
});

module.exports = model('Dialog', schema);