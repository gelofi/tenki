import { useState, useEffect, useRef } from 'react';
import './Nav.css';

function Nav({ settings, setSettings }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  // settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const updateSetting = (key, value) => {
        // This now updates the PARENT state
        setSettings(prev => ({ ...prev, [key]: value }));
    };
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSettingsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section>
      <nav className='navBar'>
        <div id="tenki">
          <img src="https://img.icons8.com/pulsar-line/144/FFFFFF/partly-cloudy-day.png" alt="Tenki" />
          <h1>Tenki</h1>
        </div>

        <ul id='navBtns' ref={dropdownRef}>
          {!isMobile && (
            <>
              <li><button className='navBtn'>Home</button></li>
              <li><button className='navBtn'>About</button></li>
              <li style={{ position: 'relative' }}>
                <button className='navBtn' onClick={() => setSettingsOpen(!settingsOpen)}>Settings</button>
                {/* SETTINGS DROPDOWN */}
                {settingsOpen && (
                  <div className="settings-menu">
                    <div>
                      <label>Temp: </label>
                      <select value={settings.temp} onChange={(e) => updateSetting('temp', e.target.value)}>
                        <option value="C">°C</option>
                        <option value="F">°F</option>
                      </select>
                    </div>
                    <div>
                      <label>Pressure: </label>
                      <select value={settings.pressure} onChange={(e) => updateSetting('pressure', e.target.value)}>
                        <option value="kPa">kPa</option>
                        <option value="mmHg">mmHg</option>
                      </select>
                    </div>
                  </div>
                )}
              </li>
            </>
          )}

          {isMobile && (
            <img 
              className='menu' 
              id='hamburger' 
              src="/src/assets/menu.svg" 
              alt="menu" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ display: 'block' }}
            />
          )}

          {isMobile && isOpen && (
            <div className="mobileMenuDropdown">
              <li><button className='navBtn mobileNavBtn'>Home</button></li>
              <li><button className='navBtn mobileNavBtn'>About</button></li>
              <li>
                <button className='navBtn mobileNavBtn' onClick={() => setSettingsOpen(!settingsOpen)}>Settings</button>
                {settingsOpen && (
                  <div className="mobile-settings-options">
                     <select value={settings.temp} onChange={(e) => updateSetting('temp', e.target.value)}>
                        <option value="C">°C</option>
                        <option value="F">°F</option>
                      </select>
                      <select value={settings.pressure} onChange={(e) => updateSetting('pressure', e.target.value)}>
                        <option value="kPa">kPa</option>
                        <option value="mmHg">mmHg</option>
                      </select>
                  </div>
                )}
              </li>
            </div>
          )}
        </ul>
      </nav>
    </section>
  );
}

export default Nav;
