const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/UserModel");

class Auth {
  // Register new user

  registerUser = async (req, res) => {
    console.log("register");

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPass;
      const newUser = new UserModel(req.body);
      const { username } = req.body;

      // addition new
      const oldUser = await UserModel.findOne({ username });

      if (oldUser)
        return res.status(400).json({ message: "User already exists" });

      // changed
      const user = await newUser.save();
      const token = jwt.sign(
        { username: user.username, id: user._id },
        "jhkjhkjkjkjjkjkjkjkjk",
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
  // Login User

  // Changed
  loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username: username });

      if (user) {
        const validity = await bcrypt.compare(password, user.password);

        if (!validity) {
          res.status(400).json("wrong password");
        } else {
          const token = jwt.sign(
            { username: user.username, id: user._id },
            "MyNaMeISMUHammadUmaIR",
            { expiresIn: "1h" }
          );
          res.status(200).json({ user, token });
        }
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  };
}

module.exports = new Auth();
