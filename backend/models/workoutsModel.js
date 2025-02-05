const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const WorkoutSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Model = model("Workout", WorkoutSchema);

module.exports = Model;
