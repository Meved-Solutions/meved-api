import express from "express";

import {getapplicants, getapplicantById, deleteapplicantById, updateapplicantById, createapplicant, login} from '../controllers/applicant.controller.js';
import {isLoggedIn, upload} from "../middleware/index.js"

const router = express.Router();

router.route('/getApplicants').get(isLoggedIn, getapplicants);
router.route('/getApplicant/:id').get(isLoggedIn, getapplicantById);
router.route('/deleteApplicant/:id').delete(isLoggedIn, deleteapplicantById);
router.route('/updateApplicant/:id').patch(isLoggedIn, updateapplicantById);
router.route('/createApplicant').post(upload.fields([
    { name: 'image', maxCount: 1 },
  ]), createapplicant);
router.route('/login').post(login);

export default router;
