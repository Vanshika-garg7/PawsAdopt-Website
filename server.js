const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.use(express.static(path.join(__dirname, "..", "frontend")));
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/pawsadoptDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// Define routes
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect(`/index.html?user=${newUser.firstName}`);
  } catch (error) {
    res.send(`
        <script>
            alert('Error registering user');
            window.location.href = '/login.html';
        </script>
    `);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send(`
            <script>
            alert('Error logging in : Invalid Email or Password');
            window.location.href = '/login.html';
        </script>
            `);
    }

    res.redirect(`/index.html?user=${user.firstName}`);
  } catch (error) {
    // Handle errors
    res.status(500).send(`
        <script>
        alert('Error logging in');
        window.location.href = '/login.html';
    </script>
        `);
  }
});

module.exports = router;
