import mongoose from 'mongoose';
import Joi from 'joi';

const cardSchema = new mongoose.Schema(
  {
    bizName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    bizDescription: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    bizAddress: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 400,
    },
    bizPhone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 10,
    },
    bizImage: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 1024,
    },
    bizNumber: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 99999999999,
    },
    // הטייפ אומר שזה מסוג איי די של מונגו
    // והריף בעצם מרמז שזה מפתח זר מקולקשן יוזר
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const CardModel = mongoose.model('cards', cardSchema);

// דואג להביא מספר רנדומלי ותמיד בודק שהוא לא במסד נתונים
// ואם כן יביא אחד אחר עד שהוא ימצא אחד שלא קיים
export const generateBizNumber = async (CardModel) => {
  // ישאר בלולאה עד שלא ימצא מספר רנדומלי שלא קיים
  while (true) {
    let randomNumber = Math.floor(Math.random() * 899000) + 100000;
    let card = await CardModel.findOne({ bizNumber: randomNumber });
    // אם לא מוצא את המספר במסד נתונים יחזיר אותו
    if (!card) {
      return String(randomNumber);
    }
  }
};

export const validateCard = (_card) => {
  const schema = Joi.object({
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    // regexp -> אומר שניתן להכניס רק מספרים בסטרינג
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024),
  });

  return schema.validate(_card);
};

export default CardModel;
