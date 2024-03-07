import express from "express";

import {getpostings, getpostingById, getpostingsByDomainId, createposting, deletepostingById, updatepostingById} from '../controllers/posting.controller.js';
import {isLoggedIn} from "../middleware/index.js"

const router = express.Router();

router.route('/getPostings').get(isLoggedIn, getpostings);
router.route('/getPosting/:id').get(isLoggedIn, getpostingById);
router.route('/getPostingsByDomain/:domainId').get(isLoggedIn, getpostingsByDomainId);
router.route('/createPosting').post(isLoggedIn, createposting);
router.route('/deletePosting/:id').delete(isLoggedIn, deletepostingById);
router.route('/updatePosting/:id').patch(isLoggedIn, updatepostingById);

export default router;