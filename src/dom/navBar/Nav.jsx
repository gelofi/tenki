import { useState, useEffect, useRef } from 'react';
import './Nav.css';

function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);
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
          {/* DESKTOP BUTTONS: Only show if NOT mobile */}
          {!isMobile && (
            <>
              <li><button className='navBtn'>Home</button></li>
              <li><button className='navBtn'>About</button></li>
              <li><button className='navBtn'>Settings</button></li>
            </>
          )}

          {/* MOBILE HAMBURGER: Show if IS mobile */}
          {isMobile && (
            <img 
              className='menu' 
              id='hamburger' 
              src="src/assets/menu.svg" 
              alt="menu" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ display: 'block' }} // Overrides the "display: none" in your CSS
            />
          )}

          {/* MOBILE DROPDOWN: Show if mobile AND isOpen is true */}
          {isMobile && isOpen && (
            <div className="mobileMenuDropdown">
              <li><button className='navBtn mobileNavBtn'>Home</button></li>
              <li><button className='navBtn mobileNavBtn'>About</button></li>
              <li><button className='navBtn mobileNavBtn'>Settings</button></li>
            </div>
          )}
        </ul>
      </nav>
    </section>
  );
}

export default Nav;