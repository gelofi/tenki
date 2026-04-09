import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import Nav from './dom/navBar/Nav.jsx';
import Welcome from './dom/welcome/Welcome.jsx';
import City from './dom/output/City.jsx';

function Page() {
  const [city, setCity] = useState("");
  return (
    <>
      {!city ? (
        <Welcome onSearch={setCity} />
      ) : (
        <City city={city} onBack={() => setCity("")} />
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <Page />
  </StrictMode>
);
