import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { matchPassword } from '..//middleware/authMiddleware.js';
import User, {
  validateUser,
  validateCards,
  validLoginUser,
} from '../models/userModel.js';
import CardModel from '../models/cardModel.js';

const getMyCards = asyncHandler(async (req, res, next) => {
  if (!req.query.numbers) {
    res
      .status(400)
      .json({ msg: 'YOu need to send query numbers of real cards' });
  }
  let cardNumbers_ar = req.query.numbers.split(',');
  let cardsData = await CardModel.find({ bizNumber: { $in: cardNumbers_ar } });
  res.json(cardsData);
});

const updateMyCards = asyncHandler(async (req, res, next) => {
  let { error } = validateCards(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  try {
    let cards = await User.findOneAndUpdate({ _id: req.user._id }, req.body);

    res.json(cards);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let { error } = validLoginUser(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const user = await User.findOne({ email });

  if (user && (await matchPassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      biz: user.biz,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.biz),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, biz } = req.body;

  let { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    biz,
  });
  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      biz: user.biz,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      biz: user.biz,
      cards: user.cards,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      biz: updatedUser.biz,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.biz = req.body.biz;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      biz: updatedUser.biz,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getMyCards,
  updateMyCards,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
