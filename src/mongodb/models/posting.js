import mongoose from "mongoose";


const postingSchema = new mongoose.Schema({
    tittle : {type : String , required : true},
    job_descripton : {type : String, required: true},
    experience: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    job_type : {type : String , required : true},
    location : [{ 
        address : {type : String , required : true},
    }],
    notice_period : {type : String , required : true},
    domain_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain'
    },
});

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