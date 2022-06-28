import mongoose, { Schema, Document } from "mongoose";

export interface IDialog extends Document{
    partner: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    author: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    message: [{
        type: Schema.Types.ObjectId;
        ref: string;
    }];
    ad: [{
        type: Schema.Types.ObjectId;
        ref: string;
    }]
}

const DialogSchema = new Schema({
    partner: {type: Schema.Types.ObjectId, ref:'Account'},
    author: {type: Schema.Types.ObjectId, ref:'Account'},
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    ad: {type: Schema.Types.ObjectId, ref:'Ad'},
}, {
    timestamps: true
});

const DialogModel = mongoose.model<IDialog>('Dialog', DialogSchema);

export default DialogModel;