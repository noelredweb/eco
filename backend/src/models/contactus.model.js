const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactusSchema = new Schema({
  fullName: { type: String, required: true },
  message: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

contactusSchema.index({ updatedAt: -1})

const Contactus = mongoose.model("Contactus", contactusSchema);

const createContactUs = ({ fullName, email, message }) => {
  const contactus = new Contactus({
    fullName, email, message
  });

  return contactus.save();
};

module.exports = {
  createContactUs
};
