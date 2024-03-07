import { getDomains, getDomainById, createDomain, deleteDomainById, updateDomainById } from '../mongodb/models/domain.js';

export const getdomains = async (req, res) => {
    try {
        const domains = await getDomains();
        res.status(200).json(domains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getdomainById = async (req, res) => {
    try {
        const domain = await getDomainById(req.params.id);
        if (domain == null) {
            return res.status(404).json({ message: 'Cannot find domain' });
        }
        res.domain = domain;
        res.status(200).json(res.domain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createdomain = async (req, res) => {
    try {
        const domain = await createDomain(req.body);
        res.status(201).json(domain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletedomainById = async (req, res) => {
    try {
        const domain = await deleteDomainById(req.params.id);
        res.status(200).json({ message: 'Deleted domain' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatedomainById = async (req, res) => {
    try {
        const updatedDomain = await updateDomainById(req.params.id, req.body);
        res.status(200).json(updatedDomain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};