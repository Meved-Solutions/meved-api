import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    email : {type : String , required : true},
    password : {type : String , required : true},
    name : {type : String , required : true},
    phone : {type : String , required : true},
    location : {
      type: String,
      required : false
    },
    image : {type : String , requried : true},
    gender : {type :String, enum : ["Male","Female","others"] ,required : true},
    bio : {type : String,required : true},
    physicallHandiCapped : {type : Boolean,required : true, default: false},
    currentSalary : {type : String, required : true},
    expectedSalary : {type : String, required : true},
    noticePeriod : {type : String,required : true},
    quota : {type : String , enum : ["General","OBC","SC","ST"],required:true},
    domain : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Domain'
    },
    years_of_experience : [{
        role : {type : String , required : true},
        org_name : {type : String,required : true},
        work_done : {type : String,required : true},
    }],
    education : [{
        institute_name : {type : String , required : true},
        type : {type : String , enum:["Masters","Bachleors" , "Diploma", "Class 12th" , "Class 10th"], required : true},
        marks : {type : String , required : true},
        year : {type : Number , required : true},
        work_done : {type : String,requried : false}
    }],
    hasCompletedDiploma :  {type : Boolean, required : true , default : false},
    hasCompletedBachleors : {type : Boolean, required : true , default : false},
    hasCompletedMasters : {type : Boolean, required : true , default : false},
    linkedInProfile : {type : String, required : true},
    personalWebsite : {type : String,required:false},
    otherLinks : {type : String,required:false},
    resume : {type : String, required : true},
},{timestamps:true});


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