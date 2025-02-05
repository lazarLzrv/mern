import React, { useState, useEffect } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutContext } from "../context/workoutContext";

const Home = () => {
    const { state, dispatch } = useWorkoutContext();
    const { workouts } = state;

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts");

            const data = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: data.workouts });
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts &&
                    workouts
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((item) => (
                            <WorkoutDetails key={item._id} workout={item} />
                        ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
