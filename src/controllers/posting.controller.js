import { getOrganizationById } from '../mongodb/models/organization.js';
import { getPostings, getPostingById, createPosting, deletePostingById, updatePostingById, getPostingsByOrgId } from '../mongodb/models/posting.js';

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



export const getpostingsByorgId = async (req, res) => {
    try {
        const postings = await getPostingsByOrgId(req.params.orgId);
        res.status(200).json(postings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createposting = async (req, res) => {
    try {
        
        const { title, job_description, minExperience, job_type, location, numberOfVacancies, notice_period, salaryRange, department, domain, skills, evaluation, org_id, org_name } = req.body;
        
        if (!title || !job_description || !minExperience || !job_type || !location || !numberOfVacancies || !notice_period || !salaryRange  || !domain || !skills || !evaluation || !org_id || !org_name) {
            return res.status(400).json({ message: 'All required fields are not provided' });
        }
        const eorg = await getOrganizationById(org_id);
        console.log(job_description);

        if(!eorg){
            return res.status(404).send('Org Not found');
        }
        
        const posting = await createPosting({ title, job_description, minExperience, job_type, location, numberOfVacancies, notice_period, salaryRange, department, domain, skills, evaluation, org_id, org_name });
        return res.status(201).json(posting);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
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
        const {
            postingStatus,
            newEvaluationQuestions,
            job_description
          } = req.body;

          const _id = req.params.id;

          const checkPosting = await getPostingById(_id);

          if(!checkPosting){
            return res.status(404).json({ message: 'No Existing Posting' });
        }

        if(postingStatus){
            checkPosting.postingStatus = postingStatus;
        }
        if(newEvaluationQuestions){
            checkPosting.evaluation = [...checkPosting.evaluation , newEvaluationQuestions];
        }
        if(job_description){
            checkPosting.job_description = job_description;
        }

        await checkPosting.save();

        res.status(200).json(checkPosting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};