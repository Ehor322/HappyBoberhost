import jwt from "jsonwebtoken";
const config = require('config');

export default (token:string) => new Promise((resolve, reject) => {
    jwt.verify(token, config.get('jwtSecret') || "", (err: any, decodedData: unknown) => {
        if (err || !decodedData) {
            return reject(err);
        }

        resolve(decodedData);
    });
});