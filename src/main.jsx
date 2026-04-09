import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import Nav from './dom/navBar/Nav.jsx';
import Welcome from './dom/welcome/Welcome.jsx';
import City from './dom/output/City.jsx';

function Page() {
  const [city, setCity] = useState("");
  
  // 1. Define settings state here so it can be shared
  const [settings, setSettings] = useState({ temp: 'C', pressure: 'kPa' });

  return (
    <>
      {/* 2. Pass settings AND the setter to Nav */}
      <Nav settings={settings} setSettings={setSettings} />
      
      {!city ? (
        <Welcome onSearch={setCity} />
      ) : (
        /* 3. Pass settings to City so it can convert the units */
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
