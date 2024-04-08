import mongoose from "mongoose";


const coversationSchema = new mongoose.Schema({
    applicant_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant'
    },
    org_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
},{timestamps:true});

const Conversation = mongoose.model("Conversation",coversationSchema);

export default Conversation;

// Conversation Actions
export const getConversations = () => Conversation.find();
export const getConversationById = (id) => Conversation.findById(id);
export const getConversationsByOrgId = (org_id) => Conversation.find({ org_id });
export const getConversationsByApplicantId = (applicant_id) => Conversation.find({ applicant_id });
export const createConversation = (values) => {
  console.log('Creating conversation with values:', values);
  return new Conversation(values).save()
    .then((conversation) => conversation.toObject())
    .catch((error) => {
      console.error('Error creating conversation:', error);
      throw error;
    });
};
export const deleteConversationById = (id) => Conversation.findOneAndDelete({ _id: id });
export const updateConversationById = (id, values) => Conversation.findByIdAndUpdate(id, values);

