const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const { createToken } = require("../Utils/CreateToken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all credentials");
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already registered");
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
    const token = createToken(res, newUser._id);

    res.status(200).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error registering user", error);
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill required credentials");
  }
  const user = await User.findOne( {email} );

  if (!user) {
    res.status(400);
    throw new Error("user not found",email,password);
  }
  if (user && (await user.checkPassword(password))) {
    const token = createToken(res, user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      token: token,
      message: `user ${user.name} logged in succesfull`,
    });
  } else {
    res.status(400);
    throw new Error("user password not maching");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).exec(); // Await and execute the query

  if (user && user._id === id) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not authorized");
  }
});

module.exports = {
  register,
  login,
  getMe,
};
