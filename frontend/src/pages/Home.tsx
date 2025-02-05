import { useEffect } from "react";

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

            console.log(data);

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
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
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
