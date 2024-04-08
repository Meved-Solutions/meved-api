import mongoose from "mongoose";


const postingSchema = new mongoose.Schema({
    title : {type : String , required : true},
    job_descripton : {type : String, required: true},
    minExperience: { type: Number, required: true },
    job_type : {type : String , enum : ["remote","in-office","hybrid"] , required : true},
    location : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    }],
    notice_period : {type : String , required : true},
    roleType : {type : String , enum : ["Full-Time","Part-Time","Internship","Contractual"],required:true},
    roles : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    },
    salary : {
      min : {
        type : Number,
        required : true,
      },
      max : {
        type : Number,
        required : true,
      },
    },
    department : {type : String, required : false},
    domain : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Domain'
    },
    skils : [{
      type : String,
      required : true,
    }],
    org_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    },
},{timestamps:true});

const Posting = mongoose.model("Posting",postingSchema);

export default Posting;


// Posting Actions
export const getPostings = () => Posting.find();
export const getPostingById = (id) => Posting.findById(id);
export const getPostingsByDomainId = (domainId) => Posting.find({ domain_id: domainId });
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