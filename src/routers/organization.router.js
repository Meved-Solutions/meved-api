import express from "express";

import { getOrganizationsController, getOrganizationByIdController, deleteOrganizationByIdController, updateOrganizationByIdController, createOrganizationController, login } from '../controllers/organization.controller.js';
import { isLoggedIn, upload } from "../middleware/index.js"

const router = express.Router();

router.route('/getOrganizations').get(isLoggedIn, getOrganizationsController);
router.route('/getOrganization/:id').get(isLoggedIn, getOrganizationByIdController);
router.route('/deleteOrganization/:id').delete(isLoggedIn, deleteOrganizationByIdController);
router.route('/updateOrganization/:id').patch(isLoggedIn, updateOrganizationByIdController);
router.route('/createOrganization').post(upload.fields([
    { name: 'logo', maxCount: 1 }
  ]), createOrganizationController);
router.route('/login').post(login);

export default router;