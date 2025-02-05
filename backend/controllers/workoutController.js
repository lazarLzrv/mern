const mongoose = require("mongoose");
const Workout = require("../models/workoutsModel");

const checkIsValid = (res, id, message) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: message });
    }
};

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json({ workout });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort("createdAt");
        res.status(200).json({ workouts });
    } catch (error) {
        res.status(404).json({ error: "No workouts found" });
    }
};

const getWorkout = async (req, res) => {
    const { id } = req.params;

    checkIsValid(res, id, "No workout found");

    const workout = await Workout.findById({ _id: id });
    res.status(200).json({ workout });
};

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    const errorMessage = "No workout found";

    checkIsValid(res, id, errorMessage);

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
        return res.status(404).json({ error: errorMessage });
    }

    res.status(200).json({ workout });
};

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    checkIsValid(res, id, "No workout found");

    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body);
        res.status(200).json({ workout });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
};
