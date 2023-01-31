const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

usersSchema.index({ updatedAt: -1 })
usersSchema.index({ email: 1 })

const Users = mongoose.model("Users", usersSchema);

const insertUser = (name, email, password) => {
  const user = new Users({
    name,
    email,
    password,
  });

  return user.save();
};

const selectUserByEmail = (email) => {
  return Users.find({ email });
};

const updatePassword = (id, password) => {
  return Users.update({ _id: id }, { $set: { password }});
};

module.exports = {
  insertUser,
  selectUserByEmail,
  updatePassword,
};
