import styles from "./Header.module.css";

import logo from "../assets/images/logo.svg";
import dropdopIcon from "../assets/images/icon-dropdown.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import checkIcon from "../assets/images/icon-checkmark.svg";

import { useDropdown } from "../assets/hooks/useDropdown";
import { useWeatherContext } from "../contexts/WeatherContext";

function Header() {
  const { open, setOpen, ref } = useDropdown();

  const {
    measurementUnit,
    dispatch,
    tempUnit,
    windSpeedUnit,
    precipitationUnit,
  } = useWeatherContext();

  function changeUnit() {
    dispatch({ type: "measurementUnit/change" });
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <button
        onClick={() => setOpen((active) => !active)}
        className={styles.unitBtn}
      >
        <img src={unitsIcon} alt="units" />
        Units
        <img src={dropdopIcon} alt="dropdown" />
      </button>

      {open && (
        <div className={styles.unitDropdown} ref={ref}>
          <button className={styles.toggle} onClick={changeUnit}>
            {measurementUnit === "metric"
              ? "Switch to Imperial"
              : "Switch to Metric"}
          </button>

          <div className={styles.tempUnit}>
            <span>Temperature</span>

            <button
              onClick={() => dispatch({ type: "tempUnit/change" })}
              className={`${styles.btnUp} ${
                tempUnit === "C" ? styles.activeBtn : ""
              }`}
            >
              Celsius (&deg;C)
              {tempUnit === "C" && <img src={checkIcon} alt="checkmark" />}
            </button>

            <button
              onClick={() =>
                dispatch({ type: "tempUnit/change", payload: "F" })
              }
              className={`${tempUnit === "F" ? styles.activeBtn : ""}  ${
                styles.btnDown
              } `}
            >
              Fahrenheit (&deg;F)
              {tempUnit === "F" && <img src={checkIcon} alt="checkmark" />}
            </button>
          </div>

          <hr />

          <div className={styles.speedUnit}>
            <span>Wind Speed</span>
            <button
              onClick={() => dispatch({ type: "windSpeedUnit/change" })}
              className={`${windSpeedUnit === "km/h" ? styles.activeBtn : ""} ${
                styles.btnUp
              }`}
            >
              km/h
              {windSpeedUnit === "km/h" && (
                <img src={checkIcon} alt="checkmark" />
              )}
            </button>

            <button
              onClick={() => dispatch({ type: "windSpeedUnit/change" })}
              className={`${windSpeedUnit === "mph" ? styles.activeBtn : ""}  ${
                styles.btnDown
              } `}
            >
              mph
              {windSpeedUnit === "mph" && (
                <img src={checkIcon} alt="checkmark" />
              )}
            </button>
          </div>

          <hr />

          <div className={styles.precipitationUnit}>
            <span>Precipitation</span>
            <button
              onClick={() => dispatch({ type: "precipitationUnit/change" })}
              className={`${
                precipitationUnit === "mm" ? styles.activeBtn : ""
              } ${styles.btnUp}`}
            >
              Millimeters (mm)
              {precipitationUnit === "mm" && (
                <img src={checkIcon} alt="checkmark" />
              )}
            </button>

            <button
              onClick={() => dispatch({ type: "precipitationUnit/change" })}
              className={`${
                precipitationUnit === "in" ? styles.activeBtn : ""
              }  ${styles.btnDown} `}
            >
              Inches (in)
              {precipitationUnit === "in" && (
                <img src={checkIcon} alt="checkmark" />
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
