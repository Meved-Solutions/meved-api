import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    posting_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posting'
    },
    applicant_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant'
    },
    status : {
        type : String,
        enum : ["pending" , "selected" , "rejected"],
        required : true,
    }
});


const Application = mongoose.model("Application",applicationSchema);

export default Application;

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