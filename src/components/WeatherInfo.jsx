import styles from "./WeatherInfo.module.css";

import WeatherDetails from "./WeatherDetails";
import DailyForecast from "./DailyForecast/DailyForecast";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { useWeatherContext } from "../contexts/WeatherContext";
import { weatherIcon } from "./weatherIcon";

function WeatherInfo() {
  const {
    country,
    city,
    currentTemp,
    apparentTemp,
    humidity,
    wind,
    precipitation,
    hourlyData,
    dailyData,
    weather,
  } = useWeatherContext();
  return (
    <div className={styles.weatherInfoContainer}>
      <div className={styles.weatherInfo}>
        <div className={styles.countryInfo}>
          <div className={styles.country}>
            <h2>
              {city}, {country}
            </h2>
            <p>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          {currentTemp.length < 0 && (
            <div className={`${styles.temp} ${styles.loading}`}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span>Loading</span>
            </div>
          )}
          <div className={styles.temp}>
            <span>
              <img src={weatherIcon(weather)} alt="weatherType" />
            </span>
            <p>{Math.floor(currentTemp)}&deg;</p>
          </div>
        </div>

        <div className={styles.weatherDetailsContainer}>
          <WeatherDetails detail="Feels like" value={apparentTemp} />
          <WeatherDetails detail="Humidity" value={humidity} />
          <WeatherDetails detail="Wind" value={wind} />
          <WeatherDetails detail="Precipitation" value={precipitation} />
        </div>

        <DailyForecast dailyData={dailyData} />
      </div>

      <HourlyForecast hourlyData={hourlyData} />
    </div>
  );
}

export default WeatherInfo;
