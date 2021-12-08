import React, { useState } from "react";

const SearchBar = ({ setLocation }) => {
  const [text, onChangeText] = useState(null);
  return (
    <form onSubmit={() => setLocation(text)}>
      <input
        type="text"
        id="search"
        placeholder="Search..."
        onChange={(e) => onChangeText(e.target.value)}
        value={text}
        className="border-2 border-gray-300 rounded-3xl focus:border-gray-500 p-2 w-72"
      />
    </form>
  );
};

export default SearchBar;