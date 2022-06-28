import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import { generatePasswordHash } from '../utils';
import { differenceInMinutes } from 'date-fns'

export interface IUser extends Document{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    registeredAt: Date;
    lastLogin: Date;
    userType: string;
    isSubscriber: boolean;
    appLanguage: string;
    expirySubscription?: boolean;
    photo?: string;
    region?: string;
    description?: string;
    website?: string;
    favourites?: Array<string>;
    fullname: string;
    confirmed: boolean;
    avatar?: string;
    confirm_hash?: string;
    last_seen?: Date;
    achievments: Array<string>;
}

const UserSchema = new Schema({
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
    favourites: [{ type: Schema.Types.ObjectId }],
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_hash: String,
    fullname: { type: String, required: true },
    last_seen: {
        type: Date,
        default: new Date()
    },
    Avatar: { type: String },
    achievments: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true });

UserSchema.virtual("isOnline").get(function (this: any) {
    return differenceInMinutes(new Date(), this.last_seen) < 5;
});

UserSchema.set("toJSON", {
    virtuals: true,
});

UserSchema.pre('save', function(next) {
    const user: IUser = this;

    if (!user.isModified('password')) return next();

    generatePasswordHash(user.password).then(hash => {
        user.password = String(hash);
        generatePasswordHash(+new Date()+ "").then(confirmHash => {
            user.confirm_hash = String(confirmHash);
            next();
        });
    }).catch(err => {
        next(err);
    });
});

const UserModel = mongoose.model<IUser>('Account', UserSchema);

export default UserModel;