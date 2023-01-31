const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types

const petitionsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  goal: { type: Number, required: true },
  performance: { type: Number, required: true, default: 0 },
  favorites:  { type: Number, required: true, default: 0 },
  userId: { type: Types.ObjectId, required: true },
  victory: { type: Boolean, default: false }
}, { timestamps: true });

petitionsSchema.index({ updatedAt: -1 })
petitionsSchema.index({ _id: 1, userId: 1 })
petitionsSchema.index({ userId: 1 })
petitionsSchema.index({ victory: 1 })
petitionsSchema.index({ title: 1 })

const Petitions = mongoose.model("Petitions", petitionsSchema);

const createPetition = ({ title, description, image, goal, userId }) => {
  const petition = new Petitions({
    title,
    description,
    image,
    goal,
    userId,
  });

  return petition.save();
};

const selectPetitionById = (id) => {
  return Petitions.findOne({ _id: id });
};

const updatePetition = ({ id, title, description, image, goal, userId }) => {

  return Petitions.update({ _id: id, userId }, {$set: {
      title,
      description,
      goal,
      ...(image && { image } )
  }});
};

const increasePerformance = async (id) => {
  const petition = await Petitions.findByIdAndUpdate(id, {$inc: { performance: 1 }});
  if (petition?.performance >= petition?.goal) {
    petition.victory = true
    await petition.save()
  }
  return petition
}

const increaseFavorites = (id) => {
  return Petitions.findByIdAndUpdate(id, {$inc: { favorites: 1 }});
}

const deletePetition = (id, userId) => {
  return Petitions.findOneAndDelete({ _id: id, userId })
}

const getMyPetitions = (userId) => {
  return Petitions.find({ userId })
}

const getPetitions = () => {
  return Petitions.find({ })
}

const getVictories = () => {
  return Petitions.find({ victory: true })
}

const searchPetitions = (search) => {
  return Petitions.find({ title: { $regex: search, $options: 'i' } })
}

module.exports = {
  createPetition,
  selectPetitionById,
  updatePetition,
  deletePetition,
  increasePerformance,
  increaseFavorites,
  getMyPetitions,
  searchPetitions,
  getPetitions,
  getVictories,
};
