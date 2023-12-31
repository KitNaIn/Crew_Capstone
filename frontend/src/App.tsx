import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './components/dashboard-component/dashboard';
import useUser from './components/security/useUser';
import { ToastContainer } from 'react-toastify';
import Home from './components/security/Home';
import ProtectedRoutesUser from './components/security/model/ProtectedRoutesUser';
import 'react-toastify/dist/ReactToastify.css';
import JobsGallery from "./components/jobGallery/jobsGallery";
import CrewCalendar from "./components/crewCalendar/CrewCalendar";


function App() {
    const { login, register, user } = useUser();

    return (

            <div className="Apps">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <div className='stars'/>
                <div className='stars2'/>
                <div className='stars3'/>
                <div className="App">
                    <Routes>

                        <Route path="/login" element={<Home login={login} register={register} />} />
                        <Route element={<ProtectedRoutesUser user={user} />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/jobs" element={<JobsGallery/>}/>
                        <Route path="/calendar" element={<CrewCalendar/>}/>

                    </Routes>
                </div>


            </div>

);
}

export default App;
