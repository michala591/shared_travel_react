import React from 'react'
import SettingUser from './SettingUser'

function MyAccountSetting() {
    return (
        <div><div id="settings" className="card mt-4">
            <div className="card-header">Settings</div>
            <div className="card-body">
                <SettingUser />
            </div>
        </div></div>
    )
}

export default MyAccountSetting