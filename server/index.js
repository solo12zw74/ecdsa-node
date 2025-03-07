const { verify } = require('ethereum-cryptography/secp256k1')
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "genesis": 1000
};

app.get("/accounts", (req, res) => {
  res.send(Object.keys(balances));
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!verifySignature(signature, recipient + amount, sender)) {
    res.status(400).send({ message: "Invalid signature!" });
    return;
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.post("/register/:account", (req, res) => {
  const { account } = req.params;

  if (!balances[account]) {
    balances[account] = 1000
  }

  res.send({ balance: balances[account] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function verifySignature(signature, data, publicKey) {
  return verify(signature, sha256(utf8ToBytes(data)), publicKey)
}
