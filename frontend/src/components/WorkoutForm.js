import React, { useState } from "react";
import { useWorkoutContext } from "../context/workoutContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();

    const initialState = {
        title: "",
        reps: "",
        load: "",
    };

    const [state, setState] = useState(initialState);
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;

        setState({
            ...state,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (response.ok) {
            setState(initialState);
            setError(null);

            dispatch({ type: "ADD_WORKOUT", payload: json.workout });
        } else {
            setError(json.error);
        }
    };

    const { title, reps, load } = state;

    return (
        <form onSubmit={onSubmit}>
            <h3>Add a New Workout</h3>

            <label> Title</label>
            <input type='text' name='title' value={title} onChange={onChange} />

            <label> Reps</label>
            <input type='number' name='reps' value={reps} onChange={onChange} />

            <label> Load</label>
            <input type='number' name='load' value={load} onChange={onChange} />

            <button type='submit'>Add workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default WorkoutForm;
