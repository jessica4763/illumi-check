import { useState } from 'react';
import Checkbox from './Checkbox'
import './Settings.css'


function Settings() {
    const [settings, setSettings] = useState({
        ambient: {
            isChecked: false,
        }
    })

    return (
        <div className="settings-container settings-container-text">
            <p>
                If your answer didn't pass all test cases, drag and drop the output image directly 
                from CodeRunner into the box above for some feedback. 
                <br/>
                <br/>
                Optionally configure the feedback tool below. If the Phong lighting of your scene 
                includes an ambient term, tick the box labeled "included ambient term".
            </p>
            <Checkbox 
                id="ambient" 
                description="included ambient term" 
                state={settings.ambient.isChecked} 
                setState={() => setSettings({...settings, ambient: {...settings.ambient, isChecked: !settings.ambient.isChecked}})}
            />
        </div>
    )
}


export default Settings;
