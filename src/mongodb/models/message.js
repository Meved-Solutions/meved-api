import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    convo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    sent_by : { type : String,enum:["Applicant","Organization"], requried : true },
    message_content : {type : String,requried:true},
},{timestamps:true});

const Message = mongoose.model("Message", messageSchema);

export default Message;

// Message Actions
export const getMessages = () => Message.find();
export const getMessageById = (id) => Message.findById(id);
export const getMessagesByConvoId = (convo_id) => Message.find({ convo_id });
export const createMessage = (values) => {
  console.log('Creating message with values:', values);
  return new Message(values).save()
    .then((message) => message.toObject())
    .catch((error) => {
      console.error('Error creating message:', error);
      throw error;
    });
};
export const deleteMessageById = (id) => Message.findOneAndDelete({ _id: id });
export const updateMessageById = (id, values) => Message.findByIdAndUpdate(id, values);