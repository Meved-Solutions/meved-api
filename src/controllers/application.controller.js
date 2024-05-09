import { getApplicantById } from '../mongodb/models/applicant.js';
import { getApplications, getApplicationById, getApplicationsByPostingId, getApplicationsByApplicantId, createApplication, deleteApplicationById, updateApplicationById } from '../mongodb/models/application.js';
import { getOrganizationById } from '../mongodb/models/organization.js';
import { getPostingById } from '../mongodb/models/posting.js';

import { transporter } from '../utils/nodemail.js';
import Mailgen from "mailgen"

export const getapplications = async (req, res) => {
    try {
        const applications = await getApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getapplicationById = async (req, res) => {
    try {
        const application = await getApplicationById(req.params.id);
        if (application == null) {
            return res.status(404).json({ message: 'Cannot find application' });
        }
        res.application = application;
        res.status(200).json(res.application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

export const getapplicationsByPostingId = async (req, res) => {
    try {
        const applications = await getApplicationsByPostingId(req.params.postingId);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getapplicationsByApplicantId = async (req, res) => {
    try {
            
        const applications = await getApplicationsByApplicantId(req.params.id);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createapplication = async (req, res) => {
    try {
        const { posting_id, posting_role,applicant_id, applicant_name,applicant_email, org_id, org_name, reason, evaluation } = req.body;
        
        if (!posting_id || !posting_role ||  !applicant_id || !applicant_name || !org_id || !org_name || !evaluation || !applicant_email) {
            return res.status(400).json({ message: 'All required fields are not provided' });
        }

        const eorg = await getOrganizationById(org_id);
        const eapplicant = await getApplicantById(applicant_id);
        const eposting = await getPostingById(posting_id);

        if(!eorg || !eapplicant || !eposting){
            return res.status(404).send('Org, Applicant or Posting Not found');
        }

        
        const application = await createApplication({ posting_id ,posting_role, applicant_id, applicant_name, org_id, org_name, reason, evaluation });
        
        let MailGenerator  = new Mailgen({
            theme : "default",
            product : {
                name : "Meved Solutions",
                link : "https://github.com/Meved-Solutions"
            }
        })


        let response = {
            body : {
                name : applicant_name,
                intro : `You have sucessfully applied to ${org_name} for the role of ${posting_role}`,
                outro : "All the best"
            }
        }

        let mail = MailGenerator.generate(response);

        let message = {
            from : process.env.GMAIL_ACC,
            to : applicant_email,
            subject : `Successful Application`,
            html : mail
        }

        transporter.sendMail(message)

        
        return res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteapplicationById = async (req, res) => {
    try {
        const application = await deleteApplicationById(req.params.id);
        res.status(200).json({ message: 'Deleted application' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateapplicationById = async (req, res) => {
    try {
        const {id} = req.params;
        const {status , comment} = req.body;

        if(status === "Rejected"){
            const application = await deleteApplicationById(id);
            res.status(200).json(application);
        }

        else{
            const updatedApplication = await updateApplicationById(id, req.body);
            res.status(200).json(updatedApplication);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};