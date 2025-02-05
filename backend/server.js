require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const workoutsRoutes = require("./routes/workouts");

app.use("/api/workouts/", workoutsRoutes);

mongoose
    .connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected and listen on port 4000");
        });
    })
    .catch(({ errorResponse }) => {
        console.log("error", errorResponse);
    });
