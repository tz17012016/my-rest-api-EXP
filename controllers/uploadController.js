import fs from 'fs';
import asyncHandler from 'express-async-handler';

export const upload = asyncHandler(async (req, res, next) => {
  let myFile = req.files.myFile;
  if (!myFile) {
    return res.status(400).json({ message: 'you must send file!' });
  }
  if (!fs.existsSync('public/users_images/5555')) {
    fs.mkdirSync('public/users_images/5555');
  } else if (myFile.size >= 5 * 1024 * 1024) {
    return res.status(400).json({ message: 'Error, file zise is too big' });
  }
  myFile.mv('public/users_images/5555/' + myFile.name, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    res.json({ message: 'file uploaded' });
  });
});
