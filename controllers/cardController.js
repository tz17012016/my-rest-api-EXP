import asyncHandler from 'express-async-handler';
import CardModel, {
  generateBizNumber,
  validateCard,
} from '../models/cardModel.js';

export const getAllCards = asyncHandler(async (req, res, next) => {
  let cardData = await CardModel.find({});
  res.json(cardData);
});

export const getCardById = asyncHandler(async (req, res, next) => {
  let cardData = await CardModel.findOne({ _id: req.params.id });
  res.json(cardData);
});

export const craeteCard = asyncHandler(async (req, res, next) => {
  let { error } = validateCard(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    let card = new CardModel(req.body);
    card.user_id = req.user._id;
    card.bizNumber = await generateBizNumber(CardModel);
    let defaultImg =
      'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
    card.bizImage = card.bizImage || defaultImg;

    let cardData = await card.save();
    res.status(201).json(cardData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

export const updateCard = asyncHandler(async (req, res, next) => {
  let { error } = validateCard(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    let defaultImg =
      'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
    req.body.bizImage = req.body.bizImage || defaultImg;
    let cardData = await CardModel.updateOne(
      { _id: req.params.id, user_id: req.user._id },
      req.body
    );
    let cardFind = await CardModel.findOne({ _id: req.params.id });
    res.json(cardFind);
  } catch (err) {
    console.log(err);
  }
});

export const deleteCard = asyncHandler(async (req, res, next) => {
  let card = await CardModel.findOneAndDelete({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card) {
    return res.status(400).json({ msg: 'card not found and cant be delted' });
  }
  res.json(card);
});
