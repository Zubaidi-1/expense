const Users = require("../Modal/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await Users.signup(email, username, hashed);
    if (user.success === false) {
      return res.status(409).json({ success: false, message: user.message });
    }
    return res.status(200).json({ success: true, user });
  } catch (e) {
    return res.status(401).json({ success: false, error: e.message });
  }
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.signIn(email, password);
    if (user.success === false) {
      return res.status(409).json({ success: false, message: user.message });
    }
    const token = jwt.sign(
      { id: user.user.id, email: user.user.email },
      process.env.SECRET,
      { expiresIn: "4h" }
    );
    return res.status(200).json({ success: true, user, token });
  } catch (e) {
    return res.status(401).json({ success: false, error: e.message });
  }
};

exports.forgotPass = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await Users.ForgotPass(email, hashed);
    if (user.success === false) {
      return res.status(409).json({ success: false, message: user.message });
    }

    return res.status(200).json({ success: true, user });
  } catch (e) {
    return res.status(401).json({ success: false, error: e.message });
  }
};
