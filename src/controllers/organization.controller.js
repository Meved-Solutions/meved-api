import { authentication, generateAuthToken, random } from '../helpers/index.js';
import { getOrganizations, getOrganizationById, deleteOrganizationById, updateOrganizationById, createOrganization, getOrganizationByEmail } from '../mongodb/models/organization.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const getOrganizationsController = async (req, res) => {
    try {
        const organizations = await getOrganizations();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrganizationByIdController = async (req, res) => {
    try {
        const organization = await getOrganizationById(req.params.id);
        if (organization == null) {
            return res.status(404).json({ message: 'Cannot find organization' });
        }
        res.organization = organization;
        res.status(200).json(res.organization);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrganizationByIdController = async (req, res) => {
    try {
        const organization = await deleteOrganizationById(req.params.id);
        res.status(200).json({ message: 'Deleted organization' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrganizationByIdController = async (req, res) => {
    try {
        const updatedOrganization = await updateOrganizationById(req.params.id, req.body);
        res.status(200).json(updatedOrganization);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createOrganizationController = async (req, res) => {
    try {
      const { name, location, description, reasonForJoining, email, password, phone } = req.body;
      const logo = req.files['logo'][0];
  
      if (!name || !logo || !location || !description || !reasonForJoining || !email || !password || !phone) {
        return res.status(400).json({ message: 'All required fields are not provided' });
      }

      const salt = random();
      const pass = authentication(salt, password)

      const logoURL = await uploadOnCloudinary(logo.path);
  
      const organization = await createOrganization({ name, logo : logoURL.secure_url, location, description, reasonForJoining, email, authentication : {password : pass , salt : salt }, phone });

      const token  = await generateAuthToken(organization._id);

      return res.status(201).json({organization,token});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All required fields are not provided' });
        }

        const organization = await getOrganizationByEmail(email);
        if (!organization) {
            return res.status(409).send("Organization Doesn't Exist");
        }

        const salt = organization.authentication.salt;
        const pass = authentication(salt, password);

        if (organization.authentication.password !== pass) {
            return res.status(401).send("Invalid Credentials");
        }

        const token = await generateAuthToken(organization._id);
        return res.status(201).json({ organization, token });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};