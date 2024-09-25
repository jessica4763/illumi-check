import { useState } from 'react';
import Checkbox from './Checkbox'
import './Settings.css'


function Settings() {
    const [settings, setSettings] = useState({
        ambient: {
            isChecked: false,
        },
        diffuse: {
            isChecked: false,
        },
        specular: {
            isChecked: false,
        },
        shadows: {
            isChecked: false,
        },
        distance_attenuation: {
            isChecked: false
        },
    })

    return (
        <div className="settings-container settings-container-text">
            <p>
                If your answer did not pass all test cases, upload or drag and drop the output image directly 
                from CodeRunner into the box above for some feedback.
                <br/>
                <br/>
                Optionally configure the feedback tool below. If the Phong lighting of your scene 
                includes an ambient term, tick the box labeled "includes ambient term" for more accurate results. 
            </p>
            <Checkbox 
                id="ambient" 
                description="includes ambient term" 
                state={settings.ambient.isChecked} 
                setState={() => setSettings({...settings, ambient: {...settings.ambient, isChecked: !settings.ambient.isChecked}})}
            />
            <Checkbox 
                id="diffuse" 
                description="includes diffuse term" 
                state={settings.ambient.isChecked} 
                setState={() => setSettings({...settings, diffuse: {...settings.diffuse, isChecked: !settings.diffuse.isChecked}})}
            />
            <Checkbox 
                id="specular" 
                description="includes specular term" 
                state={settings.specular.isChecked} 
                setState={() => setSettings({...settings, specular: {...settings.specular, isChecked: !settings.specular.isChecked}})}
            />
            <Checkbox 
                id="shadows" 
                description="includes shadows" 
                state={settings.shadows.isChecked} 
                setState={() => setSettings({...settings, shadows: {...settings.shadows, isChecked: !settings.shadows.isChecked}})}
            />
            <Checkbox 
                id="distance_attenuation" 
                description="includes distance attenuation" 
                state={settings.distance_attenuation.isChecked} 
                setState={() => setSettings({...settings, distance_attenuation: {...settings.distance_attenuation, isChecked: !settings.distance_attenuation.isChecked}})}
            />
        </div>
    )
}


export default Settings;
