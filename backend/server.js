const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const userRouter = require("./routes/userRoute");

const cors = require("cors");

app.use(cors());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected to Mongoose successfully");
    app.listen(process.env.PORT || 8000, (error) => {
      if (error) {
        console.log("Error => ", error);
      } else {
        console.log(
          "Connected successfully on port http://localhost:" + process.env.PORT
        );
      }
    });
  })
  .catch((error) => {
    console.log("Error connecting => ", error);
  });

app.use(userRouter);
