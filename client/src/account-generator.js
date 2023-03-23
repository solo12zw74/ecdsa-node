import { utils, getPublicKey } from 'ethereum-cryptography/secp256k1'
import { toHex } from 'ethereum-cryptography/utils'

function generateNewAccount() {
    const privateKey = toHex(utils.randomPrivateKey())
    const publicKey = toHex(getPublicKey(privateKey))
    return { publicKey, privateKey }
}

export default generateNewAccount