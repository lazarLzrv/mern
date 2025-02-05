import { useWorkoutContext } from "../context/workoutContext";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();
    const { title, reps, load, _id } = workout;

    const handleClick = async () => {
        const response = await fetch("/api/workouts/" + _id, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json.workout });
        }
    };

    return (
        <div className='workout-details'>
            <h4>{title}</h4>
            <p>
                <strong>Loads (kg): </strong>
                {load}
            </p>
            <p>
                <strong>Reps: </strong>
                {reps}
            </p>
            <span className='material-symbols-outlined' onClick={handleClick}>
                delete
            </span>
        </div>
    );
};

export default WorkoutDetails;
