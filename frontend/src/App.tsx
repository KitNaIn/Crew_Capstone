import React from 'react';
import './App.css';
import Dashboard from './components/dashboard-component/dashboard';
import useUser from "./components/security/useUser";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import Home from "./components/security/Home";
import ProtectedRoutesUser from "./components/security/model/ProtectedRoutesUser";



function App() {
    const {login, register, logout, user} = useUser();


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
            <header>
                <div>  {user !== undefined ? <button id="logout-button" onClick={logout}>Logout</button> : <></>}

                </div>

                <div className="App">
                    <Routes>
                        <Route path={"/"} element={<Home login={login} register={register}/>}></Route>
                        <Route element={<ProtectedRoutesUser user={user}/>}/>
                        <Route path={"dashboard"} element={<Dashboard/>}/>

                    </Routes>

                </div>
            </header>
        </div>

    );

}

export default App;