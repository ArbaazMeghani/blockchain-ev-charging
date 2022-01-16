import React, { useState } from "react";
import { getMatchingAddresses } from "../api/mapbox-api";

const SearchBar = ({ setLocation, searchText = "" }) => {
  const [text, onChangeText] = useState(searchText);
  const [focus, setFocus] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const updateText = (value) => {
    onChangeText(value);
    if (timerId !== null) {
      clearTimeout(timerId);
      setTimerId(null);
    }

    if (value.length <= 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchResults(await getMatchingAddresses(value));
      setTimerId(null);
    }, 500);

    setTimerId(timer);
  };

  const selectAddress = (address) => {
    setLocation(address);
    onChangeText(address.address);
    setFocus(false);
  };

  const unfocus = () => {
    setFocus(false);
    onChangeText(searchText);
  };

  return (
    <>
      {focus && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-transparent z-10"
          onClick={unfocus}
        />
      )}
      <div className="w-4/5 relative z-20 bg-inherit">
        <input
          autoComplete="off"
          type="text"
          id="search"
          placeholder="Search..."
          onChange={(e) => updateText(e.target.value)}
          value={text}
          required
          className={
            (searchResults.length > 0 && focus
              ? "rounded-t-3xl border-t-2 border-l-2 border-r-2"
              : "rounded-3xl border-2") +
            " bg-violet-600 text-white pt-2 pb-2 pl-8 pr-8 outline-none w-full border-gray-300"
          }
          onFocus={() => setFocus(true)}
        />
        {searchResults.length > 0 && focus && (
          <div className="absolute bg-violet-600 w-full rounded-b-3xl shadow-2xl shadow-black transition-all border-gray-300 border-l-2 border-r-2 border-b-2">
            <hr className="ml-8 mr-8 pt-2" />
            {searchResults.map((result) => (
              <div
                key={result.address}
                className="pt-2 pb-2 pl-8 pr-8 overflow-hidden overflow-ellipsis hover:cursor-pointer hover:bg-violet-500 text-white transition-colors duration-300"
                onClick={() => selectAddress(result)}
              >
                {result.address}
              </div>
            ))}
            <div className="pt-2 pb-2" />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
