import express from "express";

import {getadmins, getadminById, deleteadminById, updateadminById} from '../controllers/admin.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"

const router = express.Router();

router.route('/getAdmins').get(isLoggedIn, getadmins);
router.route('/getAdmin/:id').get(isLoggedIn, isOwner, getadmins);
router.route('/deleteAdmin/:id').delete(isLoggedIn, isOwner, deleteadminById);
router.route('/updateAdmin/:id').patch(isLoggedIn, isOwner, updateadminById);

export default router;