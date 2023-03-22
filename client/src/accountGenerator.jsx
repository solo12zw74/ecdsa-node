const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')

const generateNewAccount = function () {
    const privateKey = secp.utils.randomPrivateKey()
    const publicKey = secp.getPublicKey(privateKey)
    localStorage.setItem(publicKey, privateKey);
    return publicKey
}

export default generateNewAccount