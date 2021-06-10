import styles from "@components/Metamask.module.scss";

import * as React from "react";

import Button from "@components/Button";

declare global {
  interface Window {
    ethereum: any;
  }
}

const META_TASK_STATE_GRAPH = {
  idle: { confirmMetamask: "metamaskExist" },
  metamaskExist: { signin: "signingIn" },
  signingIn: { success: "signedIn", error: "error" },
  signedIn: { diconnect: "idle" },
  error: { signin: "signingIn" },
};

const reducer = (state, event) => {
  const nextState = META_TASK_STATE_GRAPH[state][event];
  return nextState !== undefined ? nextState : state;
};

const Metamask = () => {
  const [currentState, dispatch] = React.useReducer(reducer, "idle");
  const [account, setAccount] = React.useState();

  if (process.browser && !window.ethereum) {
    return <div className={styles.wrapper}>Metamask Disabled</div>;
  }

  useDetectMetaMask({ onDetection: () => dispatch("confirmMetamask") });

  let currentAccount = null;
  const handleLogin = async () => {
    if (currentState === "idle") {
      alert("ERROR, You need to install Metamask wallet on your computer");
      return;
    }

    dispatch("signin");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      handleAccountsChange(accounts);

      dispatch("success");
    } catch (e) {
      dispatch("error");
    }
  };

  const handleAccountsChange = (accounts) => {
    console.log(accounts);
    if (accounts.length === 0) {
      alert("ERROR, Please connect to Metamask wallet on your computer");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
    }
    setAccount(currentAccount);

    console.log("selected account", window.ethereum.selectedAccount);
  };

  if (typeof window !== "undefined") {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChange);
    }
  }

  return (
    <div className={styles.wrapper}>
      {currentState === "signedIn" ? (
        <span>Connected: {account}</span>
      ) : (
        <span className={styles.item} onClick={handleLogin}>
          Connect{currentState === "signingIn" && "ing"} To Metamask
          {currentState === "signingIn" && "loading"}
        </span>
      )}
    </div>
  );
};

const useDetectMetaMask = ({ onDetection }) => {
  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      const response = onDetection();
      console.log("detection response", response);
    }
  }, []);
};

export default Metamask;
