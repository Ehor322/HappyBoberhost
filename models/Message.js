const { Schema, model, Types } = require('mongoose');

const schema =  new Schema({
    text: { type: String },
    dialog: { type: Types.ObjectId, ref: 'Dialog' },
    user: { type: Types.ObjectId, ref: 'Account'},
    readed: {
        type: Boolean,
        default: false
    },
    attachments: [{ type: Types.ObjectId, ref: "UploadFile" }],
    },
    {
        timestamps: true
    }
);

module.exports = model('Message', schema);