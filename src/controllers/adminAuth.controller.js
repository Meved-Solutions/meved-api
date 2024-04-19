import { getAdminByEmail, createAdmin } from '../mongodb/models/admin.js';
import { authentication, generateAuthToken, random } from '../helpers/index.js';

export const register = async(req,res) => {
    try{
        const {email , name , password} = req.body;

        if (!email || !password || !name) {
            return res.sendStatus(400);
        }

        const adminExists = await getAdminByEmail(email);

        if (adminExists) {
            return res.status(409).send('Email already exists');
        }

        const salt = random();
        const pass = authentication(salt, password)

        const newAdmin = await createAdmin({
            name : name,
            email : email,
            authentication : {
                password : pass,
                salt : salt
            }
        });

        const token = await generateAuthToken(newAdmin._id);
        console.log(token);
        return res.status(200).json({newAdmin , token}).end();

    }catch(e){
        console.log(e);
        res.status(500).send('Server error');
    }
}

export const login = async (req,res) => {
    try {
        const { email,password } = req.body;
  
        if (!email || !password) {
          return res.sendStatus(400);
        }
        
        const admin = await getAdminByEmail(email);

        if (!admin) {
            return res.status(401).send('Invalid email');
        }

        const salt = admin.authentication.salt;
        const pass = authentication(salt, password)

        if(admin.authentication.password !== pass){
            return res.status(401).send("Invalid Credentials");
        }

        const token = await generateAuthToken(admin._id);
        return res.status(200).json({admin,token}).end();
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}