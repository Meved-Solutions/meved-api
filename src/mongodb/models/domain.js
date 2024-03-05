import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
    name : {type : String , required: true}
});

const Domain = mongoose.model("Domain",domainSchema);


// Domain Actions
export const getDomains = () => Domain.find();
export const getDomainById = (id) => Domain.findById(id);
export const createDomain = (values) => {
  console.log('Creating domain with values:', values);
  return new Domain(values).save()
    .then((domain) => domain.toObject())
    .catch((error) => {
      console.error('Error creating domain:', error);
      throw error;
    });
};
export const deleteDomainById = (id) => Domain.findOneAndDelete({ _id: id });
export const updateDomainById = (id, values) => Domain.findByIdAndUpdate(id, values);
