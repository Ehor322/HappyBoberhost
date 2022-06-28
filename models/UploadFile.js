const { Schema, model, Types } = require('mongoose');

const schema =   new Schema(
    {
      filename: {type: String},
      size:{type: Number},
      ext: {type: String},
      url: {type: String},
      message: { type: Types.ObjectId, ref: "Message" },
      user: { type: Types.ObjectId, ref: "Account" },
    },
    {
      timestamps: true,
    }
  );

module.exports = model('UploadFile', schema);