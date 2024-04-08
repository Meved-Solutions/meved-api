import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
    name : {type : String , required: true},
    domain : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain'
    },
},{timestamps:true});


const Role = mongoose.model("Role",roleSchema);

export default Role;

// Role Actions
export const getRoles = () => Role.find();
export const getRoleById = (id) => Role.findById(id);
export const getRolesByDomainId = (domainId) => Role.find({ domain: domainId });
export const createRole = (values) => {
  console.log('Creating role with values:', values);
  return new Role(values).save()
    .then((role) => role.toObject())
    .catch((error) => {
      console.error('Error creating role:', error);
      throw error;
    });
};
export const deleteRoleById = (id) => Role.findOneAndDelete({ _id: id });
export const updateRoleById = (id, values) => Role.findByIdAndUpdate(id, values);