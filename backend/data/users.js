import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@email",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
