const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 5173;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "./views");
// push kar diye???
mongoose.connect(
  // ye url github mei bhi hai koi bhi database ke sath cher char kar sakta hai!
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const User = require("./models/User"); // Import the User model
const Image = require("./models/Image");

// Set up Multer for file uploads
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/images", async (req, res) => {
  const images = await Image.find({}).exec();
  res.send(images);
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/places", (req, res) => {
  res.render("places");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/signup", (req, res) => {
  res.render("signup", { message: "" });
});

// Signup route
app.post("/signup", upload.single("avatar"), async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username }).exec();

    if (existingUser) {
      return res.render("signup", { message: "Username already exists" });
    } else {
      // Save the user data and image to MongoDB
      const newUser = new User({
        username,
        password,
      });

      await newUser.save();
      return res.render("login", {
        message: "Signup successful, you can now log in",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

// Login route
app.get("/login", (req, res) => {
  res.render("login", { message: "" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }).exec();

    if (user) {
      res.redirect("/profile/" + user._id);
    } else {
      res.render("login", { message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

// User profile route
app.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).exec();
    const userImages = await Image.find({ userId: req.params.id });

    if (user) {
      res.render("profile", {
        user,
        images: userImages,
        message: "logged in successfully",
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.post("/upload-image", upload.single("image"), async (req, res) => {
  const saveImage = await Image.create({
    userId: req.body.userId,
    filename: req.file.originalname,
    caption: req.body.caption,
    link: `uploads/${req.file.originalname}`,
    likes: 0,
  });
  res.render("success", { message: "Image uploaded successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
