import bcrypt from 'bcryptjs';
const users = [
  {
    name: 'Admin User',
    email: ' admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    cards: ['706512'],
    biz: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    cards: [],
    biz: true,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    cards: [],
    biz: false,
  },
];
export default users;
