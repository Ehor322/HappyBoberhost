const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now, required: true },
    lastLogin: { type: Date, default: Date.now, required: true },
    userType: { type: String, enum: ['user', 'admin', 'moderator', 'shelter'], default: 'user', required: true },
    isSubscriber: { type: Boolean, default: false, required: true },
    appLanguage: { type: String, default: 'en', required: true },
    expirySubscription: { type: Date, required: false },
    photo: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/happybober-23252.appspot.com/o/images%2Fno-avatar.webp?alt=media&token=dde65593-05a6-442d-a144-2ee39b196774', required: false },
    region: { type: String, required: false },
    description: { type: String, required: false },
    website: { type: String, required: false },
    favourites: [{ type: Types.ObjectId }],
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_hash: String,
    fullname: { type: String, required: false },
    last_seen: {
        type: Date,
        default: new Date()
    },
    Avatar: { type: String },
    achievments: [{ type: Types.ObjectId }]
}, { timestamps: true });


module.exports = model('Account', schema);