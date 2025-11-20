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
    weatherCode,
    pos,
    windSpeedUnit,
    precipitationUnit,
  } = useWeatherContext();

  if (pos.lat === "" || pos.lng === "") return;
  return (
    <div className={styles.weatherInfoContainer}>
      <div className={styles.weatherInfo}>
        <div
          className={`${styles.countryInfo} ${
            currentTemp.length !== 0 && styles.countryInfoActive
          } `}
        >
          {currentTemp.length < 1 && (
            <div className={` ${styles.loading}`}>
              <div className={styles.dots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <span>Loading</span>
            </div>
          )}

          {currentTemp.length !== 0 && (
            <>
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

              <div className={styles.temp}>
                <span>
                  <img src={weatherIcon(weatherCode)} alt="weatherType" />
                </span>
                <p>{Math.floor(currentTemp)}&deg;</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.weatherDetailsContainer}>
          <WeatherDetails
            detail="Feels like"
            value={Math.floor(apparentTemp)}
            unit={"°"}
          />
          <WeatherDetails detail="Humidity" value={humidity} unit={"%"} />

          <WeatherDetails
            detail="Wind"
            value={Math.floor(wind)}
            unit={` ${windSpeedUnit}`}
          />
          <WeatherDetails
            detail="Precipitation"
            value={precipitation}
            unit={` ${precipitationUnit}`}
          />
        </div>

        <DailyForecast dailyData={dailyData} />
      </div>

      <HourlyForecast hourlyData={hourlyData} />
    </div>
  );
}

export default WeatherInfo;
