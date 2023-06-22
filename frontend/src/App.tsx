import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard-component/dashboard';
import useUser from './components/security/useUser';
import { ToastContainer } from 'react-toastify';
import Home from './components/security/Home';
import ProtectedRoutesUser from './components/security/model/ProtectedRoutesUser';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const { login, register, logout, user } = useUser();

    return (
        <Router>
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
                <header>
                    <div>
                        {user !== undefined ? (
                            <button id="logout-button" onClick={logout}>
                                Logout
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </header>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home login={login} register={register} />} />
                        <Route element={<ProtectedRoutesUser user={user} />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
);
}

export default App;
