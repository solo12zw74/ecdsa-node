import { useEffect, useState } from "react";
import { registerAccount, getBalance, getAccounts } from "./server";
import Select from 'react-select'

function Wallet({ address, setAddress, balance, setBalance, accounts, setAccounts }) {
  async function onChange(evt) {
    const address = evt.value;
    setAddress(address);
    setBalance(await getBalance(address))
  }
  async function createAccount() {
    await registerAccount('random')
    const accs = await getAccounts()
    setAccounts(accs)
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <Select options={accounts} value={{ label: address, value: address }} onChange={onChange}></Select>
      </label>

      <div className="balance">Balance: {balance}</div>
      <button className="button" onClick={createAccount}>Create account</button>
    </div>
  );
}

export default Wallet;
