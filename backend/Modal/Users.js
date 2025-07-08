const db = require("../util/db");
const bcrypt = require("bcrypt");

const Users = class {
  static async exists(email, username) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM USERS WHERE email = ? OR username = ?",
        [email, username]
      );

      if (rows.length === 0) {
        return false;
      } else return true;
    } catch (e) {
      return { message: "An error has occured : ", error: e.message };
    }
  }

  static async signup(email, username, password) {
    if (await Users.exists(email, username)) {
      return { success: false, message: "Email / username already exists" };
    }

    try {
      const [rows] = await db.execute(
        "INSERT INTO users (email, username, password) VALUES (?,?,?)",
        [email, username, password]
      );

      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
  static async signIn(email, password) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = rows[0];

    if (!user) return { success: false, message: "No users found" };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return { success: false, message: "Incorrect password" };

    return { success: true, user };
  }
  static async ForgotPass(email, password) {
    if (!(await Users.exists(email, null))) {
      return { success: false, message: "Email does not exists" };
    }
    try {
      const [rows] = await db.execute(
        "UPDATE users SET password = ? WHERE email = ?",
        [password, email]
      );

      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
};

module.exports = Users;
