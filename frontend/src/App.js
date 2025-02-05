import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkoutProvider } from "./context/workoutContext";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <WorkoutProvider>
                    <Navbar />
                    <div className='pages'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                        </Routes>
                    </div>
                </WorkoutProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
