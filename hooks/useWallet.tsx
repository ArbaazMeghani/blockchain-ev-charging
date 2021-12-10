import React, { useEffect, useState } from "react";

const useWallet = () => {
  const [account, setAccount] = useState();
  useEffect(() => {
    if (window && window.ethereum) {
      console.log(window.ethereum);
      setAccount(window.ethereum);
    }
  }, []);

  return account;
};

export default useWallet;
