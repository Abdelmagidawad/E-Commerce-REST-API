import users from "../models/users.js";

// @docs Register a new user
// @route /auth/register
// @method POST
const registerUser = (req, res) => {
  const { id, name, age, email, gender, password } = req.body;
  users.push({ id, name, age, email, gender, password });
  res.status(201).json({
    success: true,
    message: "Create new user",
    users,
  });
};

// @docs Login user
// @route /auth/login
// @method POST
const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (user && user.password === password) {
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "email or password is wrong",
    });
  }
};

export { registerUser, loginUser };
