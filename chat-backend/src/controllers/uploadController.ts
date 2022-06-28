import express from 'express';
import { UploadFileModel } from "../models";

class UserController{

    create = (req: any, res: express.Response) => {
        const userId: string = req.user._id;


        const file:any = req.file;
        
        const fileDate = {
            filename: file.originalname,
            size: file.size,
            ext: (file.mimetype).split('image/')[1],
            url: file.path,
            user: userId,
        };
        const uploadFile = new UploadFileModel(fileDate);

        uploadFile.save().then((fileObj: any) => {
            res.json({
                status: 'success',
                file: fileObj
            });
        }).catch((err: any) => {
            res.json({
              status: "error",
              message: err,
            });
        });
    }

    delete = (req: express.Request, res: express.Response) => {
        
    }
   
}

export default UserController;