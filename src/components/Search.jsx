import styles from "./Search.module.css";

import searchIcon from "../assets/images/icon-search.svg";
import searchLoading from "../assets/images/icon-loading.svg";

import { useWeatherContext } from "../contexts/WeatherContext";
import { useEffect, useState } from "react";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { dispatch } = useWeatherContext();
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function searchCity(searchInp) {
      if (searchInp.length < 3) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchInp}&count=5`
        );
        const data = await res.json();

        if (data && data.results) {
          setResults(data.results);
          console.log(results);
        } else {
          return []; // return empty array if no results
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: "City can't be found" });
        setResults([]);
      }
    }
    searchCity(searchInput);
  }, [searchInput]);

  //show gpt my current code and ask it to guide me not do it on how to implement a searchCity when i click on it
  // function onSearch(searchInp) {

  // }

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
                    console.log(result.latitude, result.country);
                  }}
                  className={styles.city}
                >
                  {result.name}, {result.country}
                </span>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => dispatch({})}>Search</button>
      </div>
    </div>
  );
}

export default Search;
