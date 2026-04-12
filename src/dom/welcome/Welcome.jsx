import "./Welcome.css";
import { setSearchedCity } from "../../auxFuncs/Util";
import { useRef } from "react";

function Welcome({ onSearch, settings }) {
    const input = useRef(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (!input.current || !input.current.value) {
            alert(settings.language === "ja" ? "都市名を入力してください。" : "Please enter a city name.");
            return;
        }
        const cityName = input.current.value;
        setSearchedCity(cityName);
        onSearch(cityName);
    };

    return (
        <>
            <h1 className="cityName">
                {settings.language === "ja" ? "テンキへ\nようこそ" : "Welcome to Tenki"}
            </h1>
            <p className="description">
                {settings.language === "ja" ? "場所の天気情報を検索" : "Look up weather information for a location."}
            </p>
            <div className="search-container">
                <div className="search-card">
                    <form onSubmit={handleSearch}>
                        <input
                            ref={input}
                            type="text"
                            placeholder={settings.language === "ja" ? "都市名を入力" : "Enter city name"}
                        />
                        <button type="submit">
                            {settings.language === "ja" ? "検索" : "Search"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Welcome;