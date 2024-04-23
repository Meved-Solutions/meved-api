import mongoose from "mongoose";


const postingSchema = new mongoose.Schema({
    postingStatus : {type : Boolean,required :true, default: true},
    title : {type : String , required : true},
    job_description : {type : String, required: true},
    minExperience: { type: String, required: true },
    job_type :  {type : String , enum : ["Full-Time","Part-Time","Internship","Contractual"],required:true},
    location : [{
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
    }],
    numberOfVacancies : {type : String , required : true},
    notice_period : {type : String , required : true},
    salaryRange : {
      min: {type : String, required : true},
      max : {type : String , required : true},
    },
    department : {type : String, required : false},
    domain : {type : String , required : true},
    skills : [{
      type : String,
      required : true,
    }],
    evaluation : [{
      question : {type : String, required : false},
    }],
    org_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    },
    org_name: {type : String , required : true},
},{timestamps:true});

const Posting = mongoose.model("Posting",postingSchema);

export default Posting;


// Posting Actions
export const getPostings = () => Posting.find();
export const getPostingById = (id) => Posting.findById(id);
export const getPostingsByOrgId = (orgId) => Posting.find({ org_id: orgId });
export const createPosting = (values) => {
  console.log('Creating posting with values:', values);
  return new Posting(values).save()
    .then((posting) => posting.toObject())
    .catch((error) => {
      console.error('Error creating posting:', error);
      throw error;
    });
};
export const deletePostingById = (id) => Posting.findOneAndDelete({ _id: id });
export const updatePostingById = (id, values) => Posting.findByIdAndUpdate(id, values);