import { getAdmins, getAdminById, deleteAdminById, updateAdminById } from '../mongodb/models/admin.js';

export const getadmins = async (req, res) => {
  try {
    const admins = await Admin.getAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getadminById = async (req, res) => {
  try {
    const admin = await Admin.getAdminById(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteadminById = async (req, res) => {
  try {
    await Admin.deleteAdminById(req.params.id);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateadminById = async (req, res) => {
  try {
    const updatedAdmin = await Admin.updateAdminById(req.params.id, req.body);
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};