import "./Welcome.css";
import { setSearchedCity, getSearchedCity } from "../../auxFuncs/Util";
import { useRef } from "react";

const fetchWeather = async () => {
    // Your fetch logic
}

function Welcome({ onSearch }){
    const input = useRef(null);

    const search = () => {
        if(input.current.value == null) {
            alert("Please enter a city name.");
            return;
        }
        if (input.current && input.current.value) {
            const cityName = input.current.value;
            
            setSearchedCity(cityName); 
            onSearch(cityName); 
        }
    }

    return(
        <>
        <h1 className="cityName">Welcome to Tenki</h1>
        <p className="description">Look up weather information for a location.</p>
        <div className="grid">
            <div className="search-card">
                <input ref={input} type="text" placeholder="Enter city name" />
                <button onClick={search}>Search</button>
            </div>
        </div>
        </>
    )
}

export default Welcome;
