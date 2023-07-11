import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faComment, faCalendarDays, faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import JobsGallery from "../jobGallery/jobsGallery";
import CrewCalendar from "../crewCalendar/CrewCalendar";
import './dashboard.css'
import './settingsSheet.css'
import useUser from "../security/useUser";
import GroupChat from "../chat/group-chat";
import {Provider} from "react-redux";
import {store} from "../chat/chatRedux/store";
import axios from "axios";
import {User} from "../security/model/User";


function Dashboard() {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { user, logout } = useUser();
    const [userName, setUserName] = useState('');

    const fetchUserName = async (user: string) => {
        try {
            const response = await axios.get('/api/user/me');
            const username = response.data.username;
            setUserName(username);
        } catch (error) {
            console.error('Error fetching userId: ', error);
        }
    };

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    }

    const handleSettingsClick = () => {
        setIsSettingsOpen(true);
    }

    const closeSettings = () => {
        setIsSettingsOpen(false);
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div
                    className={activeButton === 'Aufträge' ? 'active' : ''}
                    onClick={() => handleButtonClick('Aufträge')}
                >
                    <FontAwesomeIcon icon={faBarsProgress} size="2xl" color="darkslategrey" />
                    {activeButton === 'Aufträge' && <span className="spans">Aufträge</span>}
                </div>
                <div
                    className={activeButton === 'Kalender' ? 'active' : ''}
                    onClick={() => handleButtonClick('Kalender')}
                >
                    <FontAwesomeIcon icon={faCalendarDays} size="2xl" color="darkslategrey" />
                    {activeButton === 'Kalender' && <span className="spans">Kalender</span>}
                </div>
                <div
                    className={activeButton === 'Chat' ? 'active' : ''}
                    onClick={() => handleButtonClick('Chat')}
                >
                    <FontAwesomeIcon icon={faComment} size="2xl" color="darkslategrey" />
                    {activeButton === 'Chat' && <span className="spans">Chat</span>}
                </div>
                <div
                    className={activeButton === 'Einstellungen' ? 'active' : ''}
                    onClick={() => handleSettingsClick()}
                >
                    <FontAwesomeIcon icon={faUserSecret} size="2xl" color="darkslategrey" />
                    {activeButton === 'Einstellungen' && <span className="spans">Einstellungen</span>}
                </div>
            </div>
            <div className="jobs-gallery-container">
                {activeButton === 'Aufträge' && <JobsGallery />}
                {activeButton === 'Kalender' && <CrewCalendar />}
                {activeButton === 'Chat' && <Provider store={store}><GroupChat/></Provider>}
            </div>
            {isSettingsOpen && (
                <div className={`settings-sheet-overlay ${isSettingsOpen ? 'open' : ''}`}>
                    <div className="settings-sheet">
                        <div className="settings-sheet-header">
                            <h2 className="settings-sheet-title">Edit profile</h2>
                            <p className="settings-sheet-description">
                                Make changes to your profile here. Click save when you're done.
                            </p>
                        </div>
                        <div className="settings-sheet-content">
                            <div className="settings-sheet-form">
                                <div className="settings-sheet-input">
                                    <label htmlFor="name">UserId</label>
                                    <input id="name" type="text" value={user?.id} />
                                </div>
                                <div className="settings-sheet-input">
                                    <label htmlFor="username">Username</label>
                                    <input id="username" type="text" value={userName} />
                                </div>
                            </div>
                        </div>
                        <div className="settings-sheet-footer">
                            <button className="settings-sheet-close" onClick={closeSettings}>
                                Save changes
                            </button>
                            <button id="logout-button" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Dashboard;
