import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faComment, faCalendarDays, faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import JobsGallery from "../jobGallery/jobsGallery";
import CrewCalendar from "../crewCalendar/CrewCalendar";
import './dashboard.css'
import './settingsSheet.css'
import useUser from "../security/useUser";

function Dashboard() {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { logout } = useUser();

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
                    <FontAwesomeIcon icon={faBarsProgress} size="lg" color="darkslategray" />
                    {activeButton === 'Aufträge' && <span className="spans">Aufträge</span>}
                </div>
                <div
                    className={activeButton === 'Kalender' ? 'active' : ''}
                    onClick={() => handleButtonClick('Kalender')}
                >
                    <FontAwesomeIcon icon={faCalendarDays} size="lg" color="darkslategray" />
                    {activeButton === 'Kalender' && <span className="spans">Kalender</span>}
                </div>
                <div
                    className={activeButton === 'Chat' ? 'active' : ''}
                    onClick={() => handleButtonClick('Chat')}
                >
                    <FontAwesomeIcon icon={faComment} size="lg" color="darkslategray" />
                    {activeButton === 'Chat' && <span className="spans">Chat</span>}
                </div>
                <div
                    className={activeButton === 'Einstellungen' ? 'active' : ''}
                    onClick={() => handleSettingsClick()}
                >
                    <FontAwesomeIcon icon={faUserSecret} size="lg" color="darkslategray" />
                    {activeButton === 'Einstellungen' && <span className="spans">Einstellungen</span>}
                </div>
            </div>
            <div className="jobs-gallery-container">
                {activeButton === 'Aufträge' && <JobsGallery />}
                {activeButton === 'Kalender' && <CrewCalendar />}
            </div>
            {isSettingsOpen && (
                <div className="settings-sheet-overlay">
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
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" value="Pedro Duarte" />
                                </div>
                                <div className="settings-sheet-input">
                                    <label htmlFor="username">Username</label>
                                    <input id="username" type="text" value="@peduarte" />
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
