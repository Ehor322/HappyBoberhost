import jwt from "jsonwebtoken";
import { reduce } from "lodash";
const config = require('config');

interface ILoginData {
  email: string;
  password: string;
}

export default (user: ILoginData) => { 
  let token = jwt.sign(
    {
      data: reduce(user, (result:any, value, key) => {
        if (key !== "password") {
          result[key] = value;
        }


        return result;
      }, {})
    },
    config.get('jwtSecret') || "",
    {
     // expiresIn: config.get('jwtSecret'),
      algorithm: "HS256",
    }
  );

  return token;
};