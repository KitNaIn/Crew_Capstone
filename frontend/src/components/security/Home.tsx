import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css';
import avatar from './images/avatar.png';

type Props = {
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
};

enum ButtonType {
    Login,
    Register,
}

enum BoxState {
    Login,
    Register,
}

function Home(props: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [buttonType, setButtonType] = useState<ButtonType | undefined>(undefined);
    const [boxState, setBoxState] = useState<BoxState>(BoxState.Login);
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (buttonType === ButtonType.Login) {
            props.login(username, password)
                .then(() => {
                    setAnimate(true);
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 300);
                })
                .catch((error) => {
                    toast.error(error.message || 'Login failed');
                });
        } else if (buttonType === ButtonType.Register) {
            if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }

            props.register(username, password)
                .then(() => {
                    navigate('/login');
                })
                .catch((error) => {
                    toast.error(error.message || 'Registration failed');
                });
        }
    }

    useEffect(() => {
        if (animate) {
            setTimeout(() => {
                setAnimate(false);
            }, 300);
        }
    }, [animate]);

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    }

    function onChangeHandlerConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    }

    function onClickLogin() {
        setButtonType(ButtonType.Login);
    }

    function onClickRegister() {
        setBoxState(BoxState.Register);
    }

    function onClickBack() {
        setBoxState(BoxState.Login);
    }

    return (
        <div className={`background ${animate ? 'slide-out' : 'slide-in'}`}>
            <div className="boxbox">
                <div className={`box ${boxState === BoxState.Register ? 'register-box' : ''}`}>
                    {boxState === BoxState.Login ? (
                        <>
                            <img src={avatar} alt="Avatar" className="avatar" />
                            <form className="form" onSubmit={onSubmit}>
                                <div className="fields">
                                    <div className="form">
                                        <input
                                            className="input"
                                            placeholder="Email"
                                            required
                                            onChange={onChangeHandlerUsername}
                                            type="email"
                                        />
                                        <span className="input-border"></span>
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Password"
                                            required
                                            minLength={3}
                                            onChange={onChangeHandlerPassword}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '2vh', alignItems: 'center' }}>
                                        <input type="checkbox" />{' '}
                                        <p style={{ display: 'flex', fontSize: '10px', marginRight: '5vw' }}>
                                            Remember me
                                        </p>
                                    </div>
                                    <button type="submit" className="shadow__btn" onClick={onClickLogin}>
                                        Login
                                    </button>
                                </div>
                            </form>
                            <p
                                onClick={onClickRegister}
                                style={{
                                    display: 'flex',
                                    color: 'lightgrey',
                                    marginTop: '1vh',
                                    fontSize: '1.5vh',
                                    cursor: 'pointer',
                                }}
                            >
                                Don't have an Account yet? Sign up!
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 style={{ letterSpacing: '-1px' }}>Register</h2>
                            <form className="form" onSubmit={onSubmit}>
                                <div className="fields">
                                    <div className="form">
                                        <input
                                            className="input"
                                            placeholder="Email"
                                            required
                                            onChange={onChangeHandlerUsername}
                                            type="email"
                                        />
                                        <span className="input-border"></span>
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Password"
                                            required
                                            minLength={3}
                                            onChange={onChangeHandlerPassword}
                                        />
                                        <span className="input-border"></span>
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            minLength={3}
                                            onChange={onChangeHandlerConfirmPassword}
                                        />
                                        <span className="input-border"></span>
                                        {!passwordsMatch && <p style={{color:'indianred'}}>Passwords do not match.</p>}
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '2vh', alignItems: 'center' }}>
                                        <input type="checkbox" />{' '}
                                        <p style={{ display: 'flex', fontSize: '10px', marginRight: '5vw' }}>
                                            Remember me
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="shadow__btn"
                                        onClick={() => setButtonType(ButtonType.Register)}
                                    >
                                        Register
                                    </button>
                                    <p
                                        onClick={onClickBack}
                                        style={{
                                            display: 'flex',
                                            color: 'lightgrey',
                                            marginTop: '1vh',
                                            fontSize: '1.5vh',
                                            cursor: 'pointer',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        Go back to Login
                                    </p>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
