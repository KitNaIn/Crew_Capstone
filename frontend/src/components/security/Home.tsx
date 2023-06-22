import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

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

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (buttonType === ButtonType.Login) {
            props.login(username, password)
                .then(() => {
                    navigate("/dashboard");
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
        <div>
            <h1>Login & Registration</h1>
            <p>Please fill out the form below to register for an account!</p>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" required onChange={onChangeHandlerUsername}/>
                <input type="password" placeholder="Password" required minLength={3} onChange={onChangeHandlerPassword} />
                <button type="submit" className="login" onClick={onClickLogin}>Login</button>
                <button type="submit" className="register" onClick={onClickRegister}>Register</button>
            </form>
        </div>
    );
}

export default Home;