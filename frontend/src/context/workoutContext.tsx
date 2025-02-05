import { createContext, useReducer, useContext, ReactNode } from "react";

export type WorkoutProps = {
    title: string;
    reps: number;
    load: number;
    _id: string;
    createdAt: string;
};

type StateProps = {
    workouts: WorkoutProps[];
};

const initialState: StateProps = {
    workouts: [
        {
            title: "",
            reps: 0,
            load: 0,
            _id: "",
            createdAt: new Date().toISOString(),
        },
    ],
};

type ActionProps =
    | {
          type: "SET_WORKOUTS";
          payload: WorkoutProps[];
      }
    | { type: "ADD_WORKOUT"; payload: WorkoutProps }
    | { type: "DELETE_WORKOUT"; payload: WorkoutProps };

type WorkoutContextProps = {
    state: StateProps;
    dispatch: (action: ActionProps) => void;
};

export const WorkoutContext = createContext<WorkoutContextProps | undefined>(
    undefined
);

const WorkoutReducer = (state: StateProps, action: ActionProps) => {
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

export const useWorkoutContext = (): WorkoutContextProps => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error(
            "useSearchBarContext must be used within a SearchBarProvider"
        );
    }
    return context;
};

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(WorkoutReducer, initialState);

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};
