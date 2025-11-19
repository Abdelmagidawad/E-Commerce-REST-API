import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

// Array Test
let data = [
  {
    id: 1,
    name: "Omar",
    age: 25,
    email: "omar@gmail.com",
    gender: "Male",
    password: 12345,
  },
  {
    id: 2,
    name: "Ali",
    age: 20,
    email: "ali@gmail.com",
    gender: "Male",
    password: 6789,
  },
];
//
app.post("/auth/register", (req, res) => {
  const { id, name, age, email, gender, password } = req.body;
  data.push({ id, name, age, email, gender, password });
  res.status(201).json({
    success: true,
    message: "Create new user",
    data,
  });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = data.find((user) => user.email === email);
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
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
