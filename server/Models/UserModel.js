const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Check if password length is at least 8 characters
        const isValidLength = value.length >= 8;
        // Check if password contains at least one uppercase letter
        const hasUpperCase = /[A-Z]/.test(value);
        // Check if password contains at least one lowercase letter
        const hasLowerCase = /[a-z]/.test(value);
        // Check if password contains at least one digit
        const hasDigit = /[0-9]/.test(value);
        // Check if password contains at least one special character
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        return (
          isValidLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasDigit &&
          hasSpecialChar
        );
      },
      message: (props) => `Password does not meet the required criteria.`,
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
UserSchema.methods.checkPassword = async function (givenPassword) {
  try {
      return await bcrypt.compare(givenPassword, this.password);
  } catch (err) {
      throw new Error('User password does not match');
  }
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
