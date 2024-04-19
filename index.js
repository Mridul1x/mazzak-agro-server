require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/*Routes*/
const userRoutes = require("./routes/user.route");
/*Express App*/
const app = express();

/*Middlewares*/
app.use(express.json());
app.use(cors());

/*Test Api*/
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Mazzak Agro server!" });
});
app.use("/api/users", userRoutes);
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.send({ token });
});
/*Variables*/
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

/*DB connection*/
mongoose
  .connect(uri, { useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port : ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
