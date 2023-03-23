import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { getAccounts, getBalance } from './server';
import { useEffect, useState } from "react";

function App() {
  const [address, setAddress] = useState('genesis');
  const [balance, setBalance] = useState(0);
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const accs = await getAccounts()
      setAccounts(accs)
      const data = await getBalance(address)
      setBalance(data)
    }
    fetchData();
  }, [])

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        accounts={accounts}
        setAccounts={setAccounts}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
