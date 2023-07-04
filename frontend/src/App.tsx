import React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/dashboard-component/dashboard';
import useUser from './components/security/useUser';
import { ToastContainer } from 'react-toastify';
import Home from './components/security/Home';
import ProtectedRoutesUser from './components/security/model/ProtectedRoutesUser';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const { login, register, user } = useUser();

    return (

            <div className="App">
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
                <div className="App">
                    <Routes>

                        <Route path="/" element={<Home login={login} register={register} />} />
                        <Route element={<ProtectedRoutesUser user={user} />} />
                        <Route path="dashboard" element={<Dashboard />} />

                    </Routes>
                </div>


            </div>

);
}

export default App;
