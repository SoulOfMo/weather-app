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
    isLoading,
  } = useWeatherContext();

  if (pos.lat === "" || pos.lng === "") return;
  return (
    <div className={styles.weatherInfoContainer}>
      <div className={styles.weatherInfo}>
        <div
          className={`${styles.countryInfo} ${
            !isLoading && styles.countryInfoActive
          } `}
        >
          {isLoading && (
            <div className={` ${styles.loading}`}>
              <div className={styles.dots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <span>Loading</span>
            </div>
          )}

          {!isLoading && (
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
            isLoading={isLoading}
          />
          <WeatherDetails
            detail="Humidity"
            value={humidity}
            unit={"%"}
            isLoading={isLoading}
          />

          <WeatherDetails
            detail="Wind"
            value={Math.floor(wind)}
            unit={` ${windSpeedUnit}`}
            isLoading={isLoading}
          />
          <WeatherDetails
            detail="Precipitation"
            value={Math.round(precipitation * 100) / 100}
            unit={` ${precipitationUnit}`}
            isLoading={isLoading}
          />
        </div>

        <DailyForecast dailyData={dailyData} isLoading={isLoading} />
      </div>

      <HourlyForecast hourlyData={hourlyData} isLoading={isLoading} />
    </div>
  );
}

export default WeatherInfo;
