import jwt from 'jsonwebtoken';

const generateToken = (_id, _biz) => {
  let token = jwt.sign({ _id: _id, biz: _biz }, process.env.JWT_SECRET, {
    expiresIn: '60mins',
  });
  return token;
};

export default generateToken;
