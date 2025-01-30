import React, { useState } from 'react';
import '../styles/systemsetting.css';
import isUserAuthenticated from '../userAuthentication';

const SystemSetting = () => {
    isUserAuthenticated();
    const [language, setLanguage] = useState('English');
    const [theme, setTheme] = useState('light');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [password, setPassword] = useState('');
    const [accountStatus, setAccountStatus] = useState('active');
    const [privacySettings, setPrivacySettings] = useState({
        shareLocation: false,
        allowTracking: false,
        dataSharing: false,
    });

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAccountStatusChange = () => {
        setAccountStatus(accountStatus === 'active' ? 'deactivated' : 'active');
    };

    const handlePrivacyChange = (e) => {
        const { name, checked } = e.target;
        setPrivacySettings((prevSettings) => ({
            ...prevSettings,
            [name]: checked,
        }));
    };

    return (
        <div className={`settings-container ${theme}`}>
            <h1>System Settings</h1>

            <div className="setting">
                <h3>Language</h3>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="setting-input">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                </select>
            </div>

            <div className="setting">
                <h3>Theme</h3>
                <button className="toggle-btn" onClick={handleThemeChange}>
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
            </div>

            <div className="setting">
                <h3>Email Notifications</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <div className="setting">
                <h3>Change Password</h3>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="setting-input"
                />
                <button className="btn">Save Password</button>
            </div>

            <div className="setting">
                <h3>Account Status</h3>
                <button className="toggle-btn" onClick={handleAccountStatusChange}>
                    {accountStatus === 'active' ? 'Deactivate Account' : 'Activate Account'}
                </button>
            </div>

            <div className="setting">
                <h3>Privacy Settings</h3>
                <div className="privacy-options">
                    <label>
                        <input
                            type="checkbox"
                            name="shareLocation"
                            checked={privacySettings.shareLocation}
                            onChange={handlePrivacyChange}
                        />
                        Share Location
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="allowTracking"
                            checked={privacySettings.allowTracking}
                            onChange={handlePrivacyChange}
                        />
                        Allow Tracking
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dataSharing"
                            checked={privacySettings.dataSharing}
                            onChange={handlePrivacyChange}
                        />
                        Share Data with Partners
                    </label>
                </div>
            </div>

        </div>
    );
};

export default SystemSetting;
