import styles from "./Search.module.css";
import searchIcon from "../assets/images/icon-search.svg";

function Search() {
  return (
    <div className={styles.search}>
      <h1>How’s the sky looking today?</h1>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <img src={searchIcon} alt="searchIcon" />
          </span>
          <input type="search" placeholder="Search for a place..."></input>
        </div>
        <button>Search</button>
      </div>

      {false && (
        <div className={styles.searchDropdown}>
          <span className={`${styles.city} ${styles.active}`}>City Name</span>
          <span className={styles.city}>City Name</span>
          <span className={styles.city}>City Name</span>
          <span className={styles.city}>City Name</span>
        </div>
      )}
    </div>
  );
}

export default Search;
