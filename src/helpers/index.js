import  jwt  from "jsonwebtoken";
import {randomBytes , createHmac } from 'crypto';

export const generateAuthToken = async (id) => {
    try {
      const token = await jwt.sign(
        {
          _id: id,
        },
        process.env.AUTH_SECRET
      );
      return token;
    } catch (error) {
      console.log(error);
    }
}


export const authentication = (salt, password)=> {
  return createHmac('sha256', [salt, password].join('/')).update(process.env.AUTH_SECRET).digest('hex');
}

export const random = () => randomBytes(128).toString('base64');
