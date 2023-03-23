import { useState } from "react";
import server from "./server";
import { signSync } from "ethereum-cryptography/secp256k1"
import { sha256 } from "ethereum-cryptography/sha256"
import Select from "react-select"
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, accounts }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  const setSelectValue = (setter) => (evt) => setter(evt.value);


  async function transfer(evt) {
    evt.preventDefault();
    const privateKey = localStorage.getItem(address)
    const amount = parseInt(sendAmount)
    const signature = toHex(signSync(sha256(utf8ToBytes(recipient + amount)), hexToBytes(privateKey)))

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount,
        recipient,
        signature
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <Select options={accounts} value={{ label: recipient, value: recipient }} onChange={setSelectValue(setRecipient)}></Select>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
