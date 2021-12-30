import React, { useState } from "react";
import { getMatchingAddresses } from "../api/mapbox-api";

const SearchBar = ({ setLocation }) => {
  const [text, onChangeText] = useState("");
  const [focus, setFocus] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [searchResults, setSearchResults] = useState([
    {
      address: "123 w something ave, City, State 1234, United States",
    },
  ]);

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

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-transparent"
        onClick={() => setFocus(false)}
      />
      <div className="w-4/5 relative">
        <input
          autoComplete="off"
          type="text"
          id="search"
          placeholder="Search..."
          onChange={(e) => updateText(e.target.value)}
          value={text}
          className={
            (searchResults.length > 0 && focus
              ? "rounded-t-3xl"
              : "rounded-3xl") +
            " bg-violet-500 text-white pt-2 pb-2 pl-8 pr-8 outline-none w-full"
          }
          onClick={() => setFocus(true)}
        />
        {searchResults.length > 0 && focus && (
          <div className="absolute bg-violet-500 w-full rounded-b-3xl">
            <hr className="ml-8 mr-8 pt-2" />
            {searchResults.map((result) => (
              <div
                className="pt-2 pb-2 pl-8 pr-8 overflow-hidden overflow-ellipsis hover:cursor-pointer hover:bg-violet-400 text-white transition-colors duration-300"
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
