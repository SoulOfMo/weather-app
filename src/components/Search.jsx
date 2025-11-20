import styles from "./Search.module.css";

import searchIcon from "../assets/images/icon-search.svg";
import searchLoading from "../assets/images/icon-loading.svg";

import { useWeatherContext } from "../contexts/WeatherContext";
import { useEffect, useState } from "react";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { dispatch } = useWeatherContext();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // async function searchCity(searchInp) {
  //   console.log("about to run");
  //   if (searchInp.length < 3) {
  //     setResults([]);
  //     return;
  //   }

  //   const controller = new AbortController();
  //   const timeout = setTimeout(() => {
  //     console.log("timer is done");
  //     controller.abort();
  //   }, 10000);

  //   try {
  //     const res = await fetch(
  //       `https://geocoding-api.open-meteo.com/v1/search?name=${searchInp}&count=5`,
  //       { signal: controller.signal }
  //     );

  //     clearTimeout(timeout);
  //     console.log(res);
  //     if (!res.ok) throw new Error("Implement the other screen");

  //     const data = await res.json();

  //     if (data && data.results) {
  //       setResults(data.results);
  //     } else {
  //       return [];
  //     }
  //   } catch (err) {
  //     console.log(err.message);

  //     dispatch({ type: "error", payload: "City can't be found" });
  //     setResults([]);
  //   }
  // }

  async function searchCity(searchInp) {
    if (searchInp.length < 3) {
      setResults([]);
      return;
    }
    setError(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchInp}&count=5`
      );

      if (!res.ok) throw new Error("Implement the other screen");

      const data = await res.json();

      if (data && data.results) {
        setResults(data.results);
        setError(null);
      } else {
        setError("No results found");
        setResults([]);
      }
    } catch (err) {
      console.log(err.message);

      dispatch({ type: "error", payload: "City can't be found" });
      setResults([]);
    }
  }

  useEffect(() => {
    searchCity(searchInput);
  }, [searchInput]);

  function handleButtonClick() {
    searchCity(searchInput);
  }

  return (
    <div className={styles.search}>
      <h1>How’s the sky looking today?</h1>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <img src={searchIcon} alt="searchIcon" />
          </span>

          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a place..."
          ></input>
          {searchInput.length >= 1 && results.length === 0 && (
            <div className={`${styles.searchDropdown} ${styles.searchLoading}`}>
              <img src={searchLoading} alt="loading" />
              <span>Search in progress</span>
            </div>
          )}
          {error && (
            <div className={styles.searchDropdown}>
              <span className={styles.error}>{error}</span>
            </div>
          )}
          {results.length > 0 && (
            <div className={styles.searchDropdown}>
              {results.map((result) => (
                <span
                  key={result.id}
                  onClick={() => {
                    dispatch({
                      type: "pos/update",
                      payload: result,
                    });
                    setSearchInput("");
                    setResults([]);
                  }}
                  className={styles.city}
                >
                  {result.name}, {result.country}
                </span>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleButtonClick}>Search</button>
      </div>
    </div>
  );
}

export default Search;
