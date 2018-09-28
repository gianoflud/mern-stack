const express = require("express");

// bringing in mongoose, whatever that is
const mongoose = require("mongoose");

// Include req body parser
const bodyParser = require("body-parser");

const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body partser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db) // The action
  .then(() => console.log("MongoDB Connected")) // If success
  .catch(err => console.log(err)); // If error

// Password middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes ('routes', file)
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
