import styles from "./Header.module.css";

import logo from "../assets/images/logo.svg";
import dropdopIcon from "../assets/images/icon-dropdown.svg";
import unitsIcon from "../assets/images/icon-units.svg";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <button className={styles.unitBtn}>
        <img src={unitsIcon} alt="units" />
        Units
        <img src={dropdopIcon} alt="dropdown" />
      </button>

      {false && (
        <div className={styles.unitDropdown}>
          <button className={styles.toggle}>Switch to Imperial</button>
          <div className={styles.tempUnit}>
            <span>Temperature</span>
            <button>Celsius (&deg;C)</button>
            <button>Fahrenheit (&deg;F)</button>
          </div>

          <div className={styles.speedUnit}>
            <span>Wind Speed</span>
            <button>km/h</button>
            <button>mph</button>
          </div>

          <div className={styles.precipitationUnit}>
            <span>Precipitation</span>
            <button> Millimeters (mm)</button>
            <button> Inches (in)</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
