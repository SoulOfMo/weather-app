import { useEffect, useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import WeatherInfo from "./components/WeatherInfo";

import styles from "./App.module.css";
// import { useGeolocation } from "./assets/hooks/useGeolocation";

function App() {
  // const { position, getPosition } = useGeolocation();
  const [pos, setPos] = useState(null);

  useEffect(() => {
    async function geee() {
      try {
        const res = await fetch(
          "https://geocode.xyz/abuja?json=1&auth=670365574180521789439x29494"
        );
        const data = await res.json();
        console.log(data.latt, data.longt, data);
        setPos({ lat: data.latt, lng: data.longt });
      } catch (error) {
        console.log(error);
      }
    }
    geee();
  }, []);

  useEffect(
    function () {
      if (!pos) return;
      async function Apicall() {
        try {
          const today = new Date().toISOString().split("T")[0];
          let endDate = new Date();
          endDate.setDate(new Date().getDate() + 7);
          endDate = endDate.toISOString().split("T")[0];
          console.log(endDate, today);

          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${pos.lat}&longitude=${pos.lng}&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,wind_speed_10m,precipitation,relative_humidity_2m,apparent_temperature&start_date=${today}&end_date=${endDate}`
          );
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      Apicall();
    },
    [pos]
  );

  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Search />
        <WeatherInfo />
      </main>
    </div>
  );
}

export default App;
