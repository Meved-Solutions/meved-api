import express from "express";

import {getdomains, getdomainById, createdomain, deletedomainById, updatedomainById} from '../controllers/domain.controller.js';
import {isLoggedIn} from "../middleware/index.js"

const router = express.Router();

router.route('/getDomains').get(isLoggedIn, getdomains);
router.route('/getDomain/:id').get(isLoggedIn, getdomainById);
router.route('/createDomain').post(isLoggedIn, createdomain);
router.route('/deleteDomain/:id').delete(isLoggedIn, deletedomainById);
router.route('/updateDomain/:id').patch(isLoggedIn, updatedomainById);

export default router;