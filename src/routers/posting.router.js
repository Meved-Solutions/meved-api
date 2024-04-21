import express from "express";

import {getpostings, getpostingById, createposting, deletepostingById, updatepostingById, getpostingsByorgId} from '../controllers/posting.controller.js';
import {isLoggedIn} from "../middleware/index.js"

const router = express.Router();

router.route('/getPostings').get(isLoggedIn, getpostings);
router.route('/getPosting/:id').get(isLoggedIn, getpostingById);
router.route('/getPostingsByOrg/:orgId').get(isLoggedIn, getpostingsByorgId);
router.route('/createPosting').post(isLoggedIn, createposting);
router.route('/deletePosting/:id').delete(isLoggedIn, deletepostingById);
router.route('/updatePosting/:id').patch(isLoggedIn, updatepostingById);

export default router;