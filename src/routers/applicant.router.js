import express from "express";

import {getapplicants, getapplicantById, deleteapplicantById, updateapplicantById, createapplicant} from '../controllers/applicant.controller.js';
import {isLoggedIn} from "../middleware/index.js"

const router = express.Router();

router.route('/getApplicants').get(isLoggedIn, getapplicants);
router.route('/getApplicant/:id').get(isLoggedIn, getapplicantById);
router.route('/deleteApplicant/:id').delete(isLoggedIn, deleteapplicantById);
router.route('/updateApplicant/:id').patch(isLoggedIn, updateapplicantById);
router.route('/createApplicant').post(isLoggedIn, createapplicant);

export default router;