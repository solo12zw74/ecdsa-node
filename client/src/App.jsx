import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { getBalance } from './server';
import { useEffect, useState } from "react";

function App() {
  const [address, setAddress] = useState('genesis');
  const [balance, setBalance] = useState(0);

  useEffect(() => async function() {
    setBalance(await getBalance(address))
  }, [balance])

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
