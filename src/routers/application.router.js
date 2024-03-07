import express from "express";

import {getapplications, getapplicationById, getapplicationsByPostingId, getapplicationsByApplicantId, createapplication, deleteapplicationById, updateapplicationById} from '../controllers/application.controller.js';
import {isLoggedIn} from "../middleware/index.js"

const router = express.Router();

router.route('/getApplications').get(isLoggedIn, getapplications);
router.route('/getApplication/:id').get(isLoggedIn, getapplicationById);
router.route('/getApplicationsByPosting/:postingId').get(isLoggedIn, getapplicationsByPostingId);
router.route('/getApplicationsByApplicant/:applicantId').get(isLoggedIn, getapplicationsByApplicantId);
router.route('/createApplication').post(isLoggedIn, createapplication);
router.route('/deleteApplication/:id').delete(isLoggedIn, deleteapplicationById);
router.route('/updateApplication/:id').patch(isLoggedIn, updateapplicationById);

export default router;