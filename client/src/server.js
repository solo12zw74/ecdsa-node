import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3042",
});

export async function getBalance(address) {
  if (address) {
    const {
      data: { balance },
    } = await server.get(`balance/${address}`);
    return balance;
  } else {
    return 0;
  }
}

export async function getAccounts() {
  const {
    data,
  } = await server.get("accounts")
  return data.map(x => ({ label: x.substring(0,10), value: x }))
}
export async function registerAccount(publicKey){
  const res = await server.post(`/register/${publicKey}`)
  console.log(res)
}

export default server
