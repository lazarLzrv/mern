const express = require("express");
const routes = express.Router();

const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
} = require("../controllers/workoutController");

routes.get("/", getWorkouts);

routes.post("/", createWorkout);

routes.get("/:id", getWorkout);

routes.delete("/:id", deleteWorkout);

routes.patch("/:id", updateWorkout);

module.exports = routes;
