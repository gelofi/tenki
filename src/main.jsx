import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import Nav from './dom/navBar/Nav.jsx';
import Welcome from './dom/welcome/Welcome.jsx';
import City from './dom/output/City.jsx';

function Page() {
  // sharing the params for all JSX files
  const [city, setCity] = useState("");
  const [settings, setSettings] = useState({ temp: 'C', pressure: 'kPa' });

  return (
    <>
      {/* passing settings params */}
      <Nav settings={settings} setSettings={setSettings} />
      
      {!city ? (
        <Welcome onSearch={setCity} />
      ) : (
        /* passing city params */
        <City city={city} settings={settings} onBack={() => setCity("")} />
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
