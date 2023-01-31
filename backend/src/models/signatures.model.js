const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types

const signaturesSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: Types.ObjectId },
  petitionId: { type: Types.ObjectId }
}, { timestamps: true });

signaturesSchema.index({ updatedAt: -1 })
signaturesSchema.index({ userId: 1 })

const Signatures = mongoose.model("Signatures", signaturesSchema);

const createSignature = ({ petitionId, userId, firstName, lastName, email }) => {
  const signature = new Signatures({
    petitionId, userId, firstName, lastName, email
  });

  return signature.save();
};

const getMySignatures = (userId) => {
  return Signatures.find({ userId })
}

module.exports = {
  createSignature,
  getMySignatures
};
