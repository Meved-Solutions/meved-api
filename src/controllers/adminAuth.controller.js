import { getAdminByEmail, createAdmin } from '../mongodb/models/admin.js';
import { generateAuthToken } from '../helpers/index.js';

export const register = async(req,res) => {
    try{
        const {email , name , image} = req.body;

        if (!email || !name || !image) {
            return res.sendStatus(400);
        }

        const adminExists = await getAdminByEmail(email);

        if (adminExists) {
            return res.status(409).send('Email already exists');
        }

        const newAdmin = await createAdmin({
            email : email,
            name : name,
            image : image
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
        const { email } = req.body;
  
        if (!email) {
          return res.sendStatus(400);
        }
        
        const admin = await getAdminByEmail(email);

        if (!admin) {
            return res.status(401).send('Invalid email');
        }

        const token = await generateAuthToken(admin._id);
        return res.status(200).json({admin,token}).end();
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}