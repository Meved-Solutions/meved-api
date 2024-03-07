import { getPostings, getPostingById, getPostingsByDomainId, createPosting, deletePostingById, updatePostingById } from '../mongodb/models/posting.js';

export const getpostings = async (req, res) => {
    try {
        const postings = await getPostings();
        res.status(200).json(postings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getpostingById = async (req, res) => {
    try {
        const posting = await getPostingById(req.params.id);
        if (posting == null) {
            return res.status(404).json({ message: 'Cannot find posting' });
        }
        res.posting = posting;
        res.status(200).json(res.posting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getpostingsByDomainId = async (req, res) => {
    try {
        const postings = await getPostingsByDomainId(req.params.domainId);
        res.status(200).json(postings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createposting = async (req, res) => {
    try {
        const posting = await createPosting(req.body);
        res.status(201).json(posting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletepostingById = async (req, res) => {
    try {
        const posting = await deletePostingById(req.params.id);
        res.status(200).json({ message: 'Deleted posting' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatepostingById = async (req, res) => {
    try {
        const updatedPosting = await updatePostingById(req.params.id, req.body);
        res.status(200).json(updatedPosting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};