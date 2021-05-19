import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    biz: {
      type: Boolean,
      required: true,
    },
    cards: Array,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const validateCards = (_card) => {
  let schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });
  return schema.validate(_card);
};

export const validLoginUser = (_userBody) => {
  let schema = Joi.object({
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(2).max(100).required(),
  });
  return schema.validate(_userBody);
};

export const validateUser = (_user) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required(),
    biz: Joi.boolean().required(),
  });

  return schema.validate(_user);
};

export default User;
