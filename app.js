require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const userRoutes = require("./routes/authRoutes");
const passportConfig = require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const postRoutes = require("./routes/postRoutes");

// port
const PORT = process.env.PORT || 3000;

// middleware: passing from data
app.use(express.urlencoded({ extended: true }));

// session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

// passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// EJS
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
  res.render("home", { title: "Home", user: req.user, error: "" });
});

// routes
app.use("/auth", userRoutes);
app.use("/posts", postRoutes);

// start server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(() => console.log("Database connection failed"));
