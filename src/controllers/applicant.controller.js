import { authentication, generateAuthToken, random } from '../helpers/index.js';
import { getApplicants, getApplicantById, deleteApplicantById, updateApplicantById, createApplicant, getApplicantByEmail } from '../mongodb/models/applicant.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const getapplicants = async (req, res) => {
    try {
        const applicants = await getApplicants();
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getapplicantById = async (req, res) => {
    try {
        const applicant = await getApplicantById(req.params.id);
        if (applicant == null) {
            return res.status(404).json({ message: 'Cannot find applicant' });
        }
        res.applicant = applicant;
        res.status(200).json(res.applicant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteapplicantById = async (req, res) => {
    try {
        const applicant = await deleteApplicantById(req.params.id);
        res.status(200).json({ message: 'Deleted applicant' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateapplicantById = async (req, res) => {
    try {
        const updatedApplicant = await updateApplicantById(req.params.id, req.body);
        res.status(200).json(updatedApplicant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createapplicant = async (req, res) => {
    try {
      const { email, password, name, phone, location, gender, bio, physicallyHandiCapped, currentSalary, expectedSalary, noticePeriod, quota, domain, experience, education, linkedInProfile, personalWebsite, otherLinks , resume } = req.body;
      const imageFile = req.files['image'][0];


  
      if (!email || !password || !name || !phone || !location || !gender || !bio || !physicallyHandiCapped || !currentSalary || !expectedSalary || !noticePeriod || !quota || !domain || !experience || !education || !linkedInProfile || !resume || !imageFile) {
        return res.status(400).json({ message: 'All required fields are not provided' });
      }

      const eapplicant = await getApplicantByEmail(email);
      if(eapplicant){
        return res.status(409).send('Email already exists');
      }

  
      const imageURL = await uploadOnCloudinary(imageFile.path);

      const salt = random();
      const pass = authentication(salt, password)
  
      const applicant = await createApplicant({ email, authentication : {password : pass , salt : salt }, name, phone, location, image: imageURL.secure_url, gender, bio, physicallyHandiCapped, currentSalary, expectedSalary, noticePeriod, quota, domain, experience, education, linkedInProfile, personalWebsite, otherLinks, resume});

      const token  = await generateAuthToken(applicant._id);

      return res.status(201).json({applicant,token});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

export const login = async (req,res) => {
    try {
        const {email , password} = req.body;
      
        if(!email || !password){
            return res.status(400).json({ message: 'All required fields are not provided' });
        }
      
        const eapplicant = await getApplicantByEmail(email);
        if(!eapplicant){
          return res.status(409).send("User Doesn't Exist");
        }
        const salt = eapplicant.authentication.salt;
        console.log(salt);
        const pass = authentication(salt, password)


      
        if(eapplicant.authentication.password !== pass ){
            return res.status(401).send("Invalid Credentials");
        }
      
        const token  = await generateAuthToken(eapplicant._id);
        return res.status(201).json({eapplicant,token});
      } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
      }
}