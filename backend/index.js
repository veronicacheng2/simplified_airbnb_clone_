const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const User = require("./models/User");
const Place = require("./models/Place");
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use("/uploads", express.static(`${__dirname}/uploads`));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

// API Endpoints
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password),
    });
    return res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          return res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      return res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

// user information
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findOne({ _id: userData.id });
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// download photos by link (in the server)
app.post("/image-links", async (req, res) => {
  try {
    const { link } = req.body;

    const newName = "photo_" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: `${__dirname}/uploads/${newName}`,
    });
    return res.json(newName);
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

// saving photos to server (receiving image files from client)
const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 30), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app
  .route("/places")
  .get(async (req, res) => {
    res.json(await Place.find());
  })
  .post(async (req, res) => {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
          owner: userData.id,
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        res.json(placeDoc);
      });
    } else {
      res.json(null);
    }
  });

// get places owned by user
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    const { id } = userData;

    const allPlaces = await Place.find({ owner: id });

    res.json(allPlaces);
  });
});

app
  .route("/places/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
  })
  .put((req, res) => {
    const { token } = req.cookies;
    const { id } = req.params;
    const {
      title,
      address,
      addedPhotos: photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      try {
        const placeDoc = await Place.findById(id);

        if (userData.id === placeDoc.owner.toString()) {
          placeDoc.set({
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          await placeDoc.save();
          return res.json("successfully updated");
        }
      } catch (err) {
        return res.status(400).json("Fail to update");
      }
    });
  });

app.listen(4000);
