import users from "../models/usersModels.js";
import bcrypt from "bcrypt";

// @docs Register a new user
// @route /auth/register
// @method POST
const registerUser = async (req, res) => {
  const { userName, age, email, gender, password } = req.body;
  try {
    const userExist = users.find((user) => user.email === email);
    if (userExist) {
      return res.status(400).json({ message: "Invalid this user" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      id: users.length + 1,
      userName,
      age,
      email,
      gender,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @docs Login user
// @route /auth/login
// @method POST
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({
        success: true,
        message: "Login successfully",
        user,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { registerUser, loginUser };
