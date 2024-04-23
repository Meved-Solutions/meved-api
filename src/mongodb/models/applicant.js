import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    email : {type : String , required : true},
    authentication: {
      password: { type: String, required: true },
      salt: { type: String, required: true,  },
    },
    name : {type : String , required : true},
    phone : {type : String , required : true},
    location : {
      name : {
        type : String,
        requried : true,
      },
      state : {
        type : String,
        requried : true,
      },
      country : {
        type : String,
        requried : true,
      }
    },
    image : {type : String , requried : true},
    gender : {type :String, enum : ["Male","Female","others"] ,required : true},
    bio : {type : String,required : true},
    physicallyHandiCapped : {type : Boolean,required : true},
    currentSalary : {type : String, required : true},
    expectedSalary : {type : String, required : true},
    noticePeriod : {type : String,required : true},
    quota : {type : String , enum : ["General","OBC","SC","ST"],required:true},
    domain : {
      type: String,
      requried : true
    },
    experience : [{
        role : {type : String , required : true},
        company : {type : String,required : true},
        description : {type : String,required : true},
        timePeriod : {type : String,required : true},
    }],
    education : [{
        institute_name : {type : String , required : true},
        type : {type : String , required : true},
        specialization : {type : String , required : true},
        marks : {type : String , required : true},
        year : {type : Number , required : true},
        work_done : {type : String,requried : false}
    }],
    linkedInProfile : {type : String, required : true},
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