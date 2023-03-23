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

export default server;
