import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    locationName : {type : String , required: true},
    locationState : {type : String, required : true},
    locationCountry : {type : String, required : true},
});

const Location = mongoose.model("Location",locationSchema);

export default Location;


// Location Actions
export const getLocations = () => Location.find();
export const getLocationById = (id) => Location.findById(id);
export const createLocation = (values) => {
  console.log('Creating location with values:', values);
  return new Location(values).save()
    .then((location) => location.toObject())
    .catch((error) => {
      console.error('Error creating location:', error);
      throw error;
    });
};
export const deleteLocationById = (id) => Location.findOneAndDelete({ _id: id });
export const updateLocationById = (id, values) => Location.findByIdAndUpdate(id, values);
