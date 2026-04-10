import { useState, useEffect, useRef } from 'react';
import './Nav.css';

function Nav({ settings, setSettings }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  // settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const updateSetting = (key, value) => {
        // passing the settings KEYS into the params in main.jsx
        setSettings(prev => ({ ...prev, [key]: value }));
    };
  // about
  const [aboutOpen, setAboutOpen] = useState(false); // no need to pass these params to main.jsx. they're not needed

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

  // desktop parts
  const aboutHero = (port) => {
    return (
      <div className={port}>
        <p>Developed by Angelo ♡ in Vite-React</p>
        <p>
          A weather app created in fulfillment of the final project
          requirement of Web Systems and Technologies.
        </p>
      </div>
    );
  }

  const settingsHero = (port) => {
    return(
      <div className={port}>
        <div>
          <label>Temp: </label>
          <select
            value={settings.temp}
            onChange={(e) => updateSetting("temp", e.target.value)}
          >
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
        </div>
        <div>
          <label>Pressure: </label>
          <select
            value={settings.pressure}
            onChange={(e) => updateSetting("pressure", e.target.value)}
          >
            <option value="kPa">kPa</option>
            <option value="mmHg">mmHg</option>
          </select>
        </div>
      </div>
    )
  }

  return (
    <section>
      <nav className='navBar'>
        <div id="tenki">
          <img src="https://img.icons8.com/pulsar-line/144/FFFFFF/partly-cloudy-day.png" alt="Tenki" />
          <h1>Tenki</h1>
        </div>

        <ul id='navBtns' ref={dropdownRef}>
          {!isMobile && ( /* desktop mode. */
            <>
              <li><button className='navBtn'>Home</button></li>
              <li><button className='navBtn' onClick={() => setAboutOpen(!aboutOpen)}>About</button>
              { aboutOpen && aboutHero("about-menu") }
              </li>
              <li style={{ position: 'relative' }}>
                <button className='navBtn' onClick={() => setSettingsOpen(!settingsOpen)}>Settings</button>
                { settingsOpen && settingsHero("settings-menu") }
              </li>
            </>
          )}

          {isMobile && ( /* mobile version (hamburger dropdown) */
            <img 
              className='menu' 
              id='hamburger' 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgZmlsbC1ydWxlPSJub256ZXJvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDUuMTIsNS4xMikiPjxwYXRoIGQ9Ik0wLDcuNXY1aDUwdi01ek0wLDIyLjV2NWg1MHYtNXpNMCwzNy41djVoNTB2LTV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" 
              alt="menu" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ display: 'block' }}
            />
          )}

          {isMobile && isOpen && (
            <div className="mobileMenuDropdown">
              <li><button className='navBtn mobileNavBtn'>Home</button></li>
              <li><button className='navBtn mobileNavBtn' onClick={() => setAboutOpen(!aboutOpen)}>About</button>
              { aboutOpen && aboutHero("mobile-about-menu") }
              </li>
              <li>
                <button className='navBtn mobileNavBtn' onClick={() => setSettingsOpen(!settingsOpen)}>Settings</button>
                {settingsOpen && settingsHero("mobile-settings-menu") }
              </li>
            </div>
          )}
        </ul>
      </nav>
    </section>
  );
}

export default Nav;
