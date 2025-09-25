import styles from "./WeatherInfo.module.css";

import sunIcon from "../assets/images/icon-sunny.webp";
import WeatherDetails from "./WeatherDetails";
import DailyForecast from "./DailyForecast/DailyForecast";
import HourlyForecast from "./HourlyForecast/HourlyForecast";

function WeatherInfo() {
  return (
    <div className={styles.weatherInfoContainer}>
      <div className={styles.weatherInfo}>
        <div className={styles.countryInfo}>
          <div className={styles.country}>
            <h2>Berlin, Germany</h2>
            <p>Tuesday, April 4, 2025</p>
          </div>

          <div className={styles.temp}>
            <span>
              <img src={sunIcon} alt="weatherType" />
            </span>
            <p>20&deg;</p>
          </div>
        </div>

        <div className={styles.weatherDetailsContainer}>
          {Array.from({ length: 4 }, (_, i) => (
            <WeatherDetails key={i} />
          ))}
        </div>

        <DailyForecast />
      </div>

      <HourlyForecast />
    </div>
  );
}

export default WeatherInfo;
