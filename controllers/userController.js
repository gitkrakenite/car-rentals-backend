const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// DESC     register a user
// METHOD   POST /api/v1/user/register
// ACCESS   public
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  //   console.log(name, email, profile, password);

  if (!name || !email || !password) {
    res.status(400).send("A value is missing");
    return;
  }

  // check if user exists already
  const useremailExists = await User.findOne({ email });

  // check if user exists already
  const usernameExists = await User.findOne({ name });

  if (useremailExists || usernameExists) {
    res.status(400).send("User already exists");
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    isAdmin,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,

      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// DESC     login a user
// METHOD   POST /api/v1/user/login
// ACCESS   public
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  // console.log(email, password);

  if (!name || !password) {
    res.status(400).send("A value is missing");
    return;
  }

  // Check for user email
  const user = await User.findOne({ name });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,

      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
};

// DESC     get my data
// METHOD   GET /api/v1/user/me
// ACCESS   private to me
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// DESC     get all customers
// METHOD   GET /api/v1/user
// ACCESS   public
const getAllUsers = async (req, res) => {
  const user = await User.find().sort({ $natural: -1 }).select("-password");
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(500).send("Could not fetch users");
  }
};

// DESC     get a customers
// METHOD   GET /api/v1/user/id
// ACCESS   admin
const getAUser = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("ID needed to get user");
    return;
  }

  const user = await User.find({ _id: req.params.id }).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).send("Could not fetch user");
  }
};

// DESC     delete a user
// METHOD   DELETE /api/v1/user/id
// ACCESS   admin
const deleteAUser = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("ID needed to remove user");
    return;
  }
  const userExists = await User.find({ _id: req.params.id });
  if (userExists) {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).send(req.params.id);
  } else {
    res.status(500).send("Could not delete user");
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAUser,
  getAllUsers,
  deleteAUser,
};
