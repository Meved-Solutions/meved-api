import mongoose from "mongoose";


const organizationSchema = new mongoose.Schema({
    name : {type : String , requried : true},
    logo : {type : String, required : true},
    location : {type : String, required : true},
    organizationDescription : {type : String , required : true},
    reasonForJoining : {type : String , required : true},
    approvedByAdmin : {type : Boolean , required: true},
    orgEmail : {type : Boolean , required : true}
},{timestamps:true});

const Organization = mongoose.model("Organization",organizationSchema);


// Organization Actions
export const getOrganizations = () => Organization.find();
export const getOrganizationById = (id) => Organization.findById(id);
export const createOrganization = (values) => {
  console.log('Creating organization with values:', values);
  return new Organization(values).save()
    .then((organization) => organization.toObject())
    .catch((error) => {
      console.error('Error creating organization:', error);
      throw error;
    });
};
export const deleteOrganizationById = (id) => Organization.findOneAndDelete({ _id: id });
export const updateOrganizationById = (id, values) => Organization.findByIdAndUpdate(id, values);