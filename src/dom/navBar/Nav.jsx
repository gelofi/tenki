import { useState, useEffect, useRef } from "react";
import "./Nav.css";

function Nav({ settings, setSettings }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [apiOpen, setAPIOpen] = useState(false);

  const isJP = settings.language === "jp"; // Helper variable for cleaner code

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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
        setAboutOpen(false);
        setAPIOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const aboutHero = (port) => {
    return (
      <div className={port}>
        <p>{isJP ? "♡ 開発者：アンヘロ" : "Developed by Angelo ♡ in Vite-React"}</p>
        <p>
          {isJP 
            ? "Web Systems and Technologiesの最終プロジェクト要件を満たすために作成された天気情報の検索アプリです。" 
            : "A weather app created in fulfillment of the final project requirement of Web Systems and Technologies."}
        </p>
      </div>
    );
  };

  const apiHero = (port) => {
    return (
      <div className={port}>
        <p>
          {isJP ? "使用API: " : "Uses "}
          <a href="https://open-meteo.com/en/about">Open-Meteo Weather API</a>.
        </p>
        <p>
          {isJP 
            ? "Open-Meteoはオープンソースの気象APIであり、非商用利用には無料アクセスを提供しています。APIキーは不要です。" 
            : "Open-Meteo is an open-source weather API and offers free access for non-commercial use. No API key is required."}
        </p>
      </div>
    );
  };

  const settingsHero = (port) => {
    return (
      <div className={port}>
        <div>
          <label>{isJP ? "温度: " : "Temp: "}</label>
          <select value={settings.temp} onChange={(e) => updateSetting("temp", e.target.value)}>
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
        </div>
        <div>
          <label>{isJP ? "気圧: " : "Pressure: "}</label>
          <select value={settings.pressure} onChange={(e) => updateSetting("pressure", e.target.value)}>
            <option value="kPa">kPa</option>
            <option value="mmHg">mmHg</option>
          </select>
        </div>
        <div>
          <label>{isJP ? "言語: " : "Language: "}</label>
          <select value={settings.language} onChange={(e) => updateSetting("language", e.target.value)}>
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <section>
      <nav className="navBar">
        <div id="tenki">
          <img src="https://img.icons8.com/pulsar-line/144/FFFFFF/partly-cloudy-day.png" alt="Tenki" />
          <h1>{isJP ? "天気" : "Tenki"}</h1>
        </div>

        <ul id="navBtns" ref={dropdownRef}>
          {!isMobile && (
            <>
              <li>
                <button className="navBtn" onClick={() => setAPIOpen(!apiOpen)}>API</button>
                {apiOpen && apiHero("about-menu")}
              </li>
              <li>
                <button className="navBtn" onClick={() => setAboutOpen(!aboutOpen)}>
                  {isJP ? "アプリについて" : "About"}
                </button>
                {aboutOpen && aboutHero("about-menu")}
              </li>
              <li style={{ position: "relative" }}>
                <button className="navBtn" onClick={() => setSettingsOpen(!settingsOpen)}>
                  {isJP ? "設定" : "Settings"}
                </button>
                {settingsOpen && settingsHero("settings-menu")}
              </li>
            </>
          )}

          {isMobile && (
            <img
              className="menu"
              id="hamburger"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgZmlsbC1ydWxlPSJub256ZXJvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDUuMTIsNS4xMikiPjxwYXRoIGQ9Ik0wLDcuNXY1aDUwdi01ek0wLDIyLjV2NWg1MHYtNXpNMCwzNy41djVoNTB2LTV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
              alt="menu"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}

          {isMobile && isOpen && (
            <div className="mobileMenuDropdown">
              <li>
                <button className="navBtn mobileNavBtn" onClick={() => setAPIOpen(!apiOpen)}>API</button>
                {apiOpen && apiHero("mobile-about-menu")}
              </li>
              <li>
                <button className="navBtn mobileNavBtn" onClick={() => setAboutOpen(!aboutOpen)}>
                  {isJP ? "アプリについて" : "About"}
                </button>
                {aboutOpen && aboutHero("mobile-about-menu")}
              </li>
              <li>
                <button className="navBtn mobileNavBtn" onClick={() => setSettingsOpen(!settingsOpen)}>
                  {isJP ? "設定" : "Settings"}
                </button>
                {settingsOpen && settingsHero("mobile-settings-menu")}
              </li>
            </div>
          )}
        </ul>
      </nav>
    </section>
  );
}

export default Nav;