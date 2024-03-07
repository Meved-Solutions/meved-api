import { getApplications, getApplicationById, getApplicationsByPostingId, getApplicationsByApplicantId, createApplication, deleteApplicationById, updateApplicationById } from '../mongodb/models/application.js';

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
        const applications = await getApplicationsByApplicantId(req.params.applicantId);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createapplication = async (req, res) => {
    try {
        const application = await createApplication(req.body);
        res.status(201).json(application);
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
        const updatedApplication = await updateApplicationById(req.params.id, req.body);
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};