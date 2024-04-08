import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name : {type : String, required : true},
    pasword : {type : String,required : true},
    email : {type: String, required:true},
    image : {type: String , required : true},
    role : {type : String,required : true},
    verifiedByPlatformAdmin : {type : Boolean, required : true , default:false }
},{timestamps:true});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

// Admin Actions
export const getAdmins = () => Admin.find();
export const getAdminById = (id) => Admin.findById(id);
export const getAdminByEmail = (email) => Admin.findOne({ email: email });
export const createAdmin = (values) => {
  console.log('Creating admin with values:', values);
  return new Admin(values).save()
    .then((admin) => admin.toObject())
    .catch((error) => {
      console.error('Error creating admin:', error);
      throw error;
    });
};
export const deleteAdminById = (id) => Admin.findOneAndDelete({ _id: id });
export const updateAdminById = (id, values) => Admin.findByIdAndUpdate(id, values, { new: true });