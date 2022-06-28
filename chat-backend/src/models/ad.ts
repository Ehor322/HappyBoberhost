import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAd extends Document{
    type: string;
    gender: string;
    color: string;
    information: string;
    age: number;
    breed: string;
    price: number;
    animalName: string;
    date: Date;
    picture: string;
    isTop: boolean;
    topEnd: Date;
    location: string;
    account: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
}

const AdSchema = new Schema({
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
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

const AdModel = mongoose.model<IAd>('Ad', AdSchema);

export default AdModel;