import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    email : {type : String , required : true},
    name : {type : String , required : true},
    phone : {type : String , required : true},
    location : {type : String , required : true},
    image : {type : String , requried : false},
    gender : {type :String, enum : ["male","female","others"] ,required : true},
    bio : {type : String,required : true},
    years_of_experience : [{
        role : {type : String , required : true},
        org_name : {type : String,required : true},
        work_done : {type : String,required : true},
    }],
    education : [{
        institute_name : {type : String , required : true},
        marks : {type : String , required : true},
        year : {type : Number , required : true},
        work_done : {type : String,requried : false}
    }],
    resume : {type : String, required : true},
});


const Applicant = mongoose.model("Applicant",applicantSchema);


export default Applicant;

// Applicant Actions
export const getApplicants = () => Applicant.find();
export const getApplicantByEmail = (email) => Applicant.findOne({ email });
export const getApplicantById = (id) => Applicant.findById(id);
export const createApplicant = (values) => {
  console.log('Creating applicant with values:', values);
  return new Applicant(values).save()
    .then((applicant) => applicant.toObject())
    .catch((error) => {
      console.error('Error creating applicant:', error);
      throw error;
    });
};
export const deleteApplicantById = (id) => Applicant.findOneAndDelete({ _id: id });
export const updateApplicantById = (id, values) => Applicant.findByIdAndUpdate(id, values);