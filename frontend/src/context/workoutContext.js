import { createContext, useReducer, useContext } from "react";

export const WorkoutContext = createContext();

const initialState = {
    workouts: null,
};

const WorkoutReducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case "SET_WORKOUTS":
            return { ...state, workouts: payload };
        case "ADD_WORKOUT":
            return { ...state, workouts: [...state.workouts, payload] };
        case "DELETE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.filter((w) => w._id !== payload._id),
            };
        default:
            return state;
    }
};

export const useWorkoutContext = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(WorkoutReducer, initialState);

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};
