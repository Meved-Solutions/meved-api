import { getApplicants, getApplicantById, deleteApplicantById, updateApplicantById, createApplicant } from '../mongodb/models/applicant.js';

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
        const applicant = await createApplicant(req.body);
        res.status(201).json(applicant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};