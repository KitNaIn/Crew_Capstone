import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import './Home.css';
import avatar from './images/avatar.png';

type Props = {
    login: (username: string, password: string) => Promise<void>,
    register: (username: string, password: string) => Promise<void>
}

enum ButtonType {
    Login,
    Register
}
function Home(props:Props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [buttonType, setButtonType] = useState<ButtonType | undefined>(undefined)
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (buttonType === ButtonType.Login) {
            props.login(username, password)
                .then(() => {
                    setAnimate(true);
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 500);
                }).catch((error) => {
                toast.error(error.message || "Login failed");
            });
        } else if (buttonType === ButtonType.Register) {
            props.register(username, password)
                .then(() => {
                    navigate("/");
                }).catch((error) => {
                toast.error(error.message || "Registration failed");
            });
        }
    }
    useEffect(() => {
        if (animate) {
            setTimeout(() => {
                setAnimate(false);
            }, 500);
        }
    }, [animate]);

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function onClickLogin() {
        setButtonType(ButtonType.Login);
    }

    function onClickRegister() {
        setButtonType(ButtonType.Register);
    }

    return (
        <div className={`background ${animate ? 'slide-out' : 'slide-in'}`}>
        <div className="boxbox">
            <div className="box">
                <img src={avatar} alt="Avatar" className="avatar" />
            <form className="form" onSubmit={onSubmit}>
                <div className="fields">
                <input  type="email"  placeholder="Email" required onChange={onChangeHandlerUsername} style={{ height:"2.5vh", width:"45vw", background:"#035177", color:"white", marginTop:"0.5vh"}}/>
                    <input type="password" placeholder="Password" required minLength={3} onChange={onChangeHandlerPassword} style={{ height:"2.5vh", width:"45vw", marginTop:"1vh", background:"#035177", color:"white"}} />
                    <div style={{display:"flex", marginTop:"2vh", alignItems:"center"}}>
                    <input type="checkbox"/> <p style={{fontSize:"10px", marginRight:"12vw"}}>Remember me</p>
                        <button type="submit" className="register" onClick={onClickRegister} style={{backgroundColor:"#023047", color:"white" }}>Register</button>
                    </div>
                    <button type="submit" className="login" onClick={onClickLogin} style={{ width:"48vw", height:"4.5vh", marginTop:"2vh", backgroundColor:"#023047", color:"white"}}>Login</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Home;