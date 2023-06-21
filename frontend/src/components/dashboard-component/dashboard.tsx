import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserSecret, faComment, faCalendarDays, faBarsProgress} from "@fortawesome/free-solid-svg-icons";
import JobsGallery from "../jobGallery/jobsGallery";
import './dashboard.css';


function Dashboard() {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div
                    className={activeButton === 'Aufträge' ? 'active' : ''}
                    onClick={() => handleButtonClick('Aufträge')}
                >
                    <FontAwesomeIcon icon={faBarsProgress} size="lg" color="#00569e"/>
                    {activeButton === 'Aufträge' && <span className="spans">Aufträge</span>}
                </div>
                <div
                    className={activeButton === 'Kalender' ? 'active' : ''}
                    onClick={() => handleButtonClick('Kalender')}
                >
                    <FontAwesomeIcon icon={faCalendarDays} size="lg" color="#00569e"/>
                    {activeButton === 'Kalender' && <span className="spans">Kalender</span>}
                </div>
                <div
                    className={activeButton === 'Chat' ? 'active' : ''}
                    onClick={() => handleButtonClick('Chat')}
                >
                    <FontAwesomeIcon icon={faComment} size="lg" color="#00569e"/>
                    {activeButton === 'Chat' && <span className="spans">Chat</span>}
                </div>
                <div
                    className={activeButton === 'Einstellungen' ? 'active' : ''}
                    onClick={() => handleButtonClick('Einstellungen')}
                >
                    <FontAwesomeIcon icon={faUserSecret} size="lg" color="#00569e"/>
                    {activeButton === 'Einstellungen' && <span className="spans">Einstellungen</span>}
                </div>
            </div>
            <div className="jobs-gallery-container">
                {activeButton === 'Aufträge' && <JobsGallery/>}
            </div>
        </div>
    );
}

export default Dashboard;
