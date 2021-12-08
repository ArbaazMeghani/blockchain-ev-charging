import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Wallet from "./Wallet";

const Header = ({ location, setLocation }) => {
  return (
    <div className="flex flex-row justify-between items-center p-4">
      <Logo />
      <SearchBar location={location} setLocation={setLocation} />
      <Wallet />
    </div>
  );
};

export default Header;
