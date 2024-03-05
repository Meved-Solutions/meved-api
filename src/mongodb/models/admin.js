import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type: String, required:true},
    image : {type: String , required : true},
    password : {type : String, required : false},
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

// Application Actions
export const getApplications = () => Application.find();
export const getApplicationById = (id) => Application.findById(id);
export const getApplicationsByPostingId = (postingId) => Application.find({ posting_id: postingId });
export const getApplicationsByApplicantId = (applicantId) => Application.find({ applicant_id: applicantId });
export const createApplication = (values) => {
  console.log('Creating application with values:', values);
  return new Application(values).save()
    .then((application) => application.toObject())
    .catch((error) => {
      console.error('Error creating application:', error);
      throw error;
    });
};
export const deleteApplicationById = (id) => Application.findOneAndDelete({ _id: id });
export const updateApplicationById = (id, values) => Application.findByIdAndUpdate(id, values);