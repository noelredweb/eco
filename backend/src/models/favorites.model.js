const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types

const favoritesSchema = new Schema({
  favorite: {type: Boolean, default: false},
  userId: { type: Types.ObjectId },
  petitionId: { type: Types.ObjectId }
}, { timestamps: true });

favoritesSchema.index({ userId: 1, favorite: 1})
favoritesSchema.index({ petitionId: 1, userId: 1})
favoritesSchema.index({ updatedAt: -1})

const Favorites = mongoose.model("Favorites", favoritesSchema);

const createUpdateFavorite = ({ petitionId, favorite, userId }) => {
  return Favorites.findOneAndUpdate({
    petitionId, userId
  }, { favorite }, { upsert: true });
};

const getMyFavorites = (userId, favorite) => {
  return Favorites.find({ userId, favorite })
}

module.exports = {
  createUpdateFavorite,
  getMyFavorites
};
