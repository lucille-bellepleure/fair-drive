import { toHex, hexToByteArray, byteArrayToHex, numbersToByteArray, stringToUint8Array } from 'helpers/conversion';
import { createKeyPair } from '@erebos/secp256k1'
import { pubKeyToAddress } from '@erebos/keccak256'
import createConnect from "./createConnect"
import createFairdriveFolder from "./createFairdriveFolder"
import SwarmFeed from "./swarmFeed"

export default async function resolveConnect(logtime, id, givenPrivateKey, givenPassword, mnemonic) {
    if (!givenPrivateKey) throw 'no private key!'
    const sf = new SwarmFeed
    id = await createConnect()
    if (!id) throw 'no shortcode!'
    const PRIVATE_KEY_BYTES_LENGTH = 32
    const PUBLIC_KEY_BYTES_LENGTH = 33
    const ADDRESS_BYTES_LENGTH = 20
    var timeStamp = Math.round((new Date()).getTime() / 100000);
    const shortCode = id
    const seedstring = shortCode.toString().concat('-fairdrive-', timeStamp.toString())
    const privateKeyGenerated = byteArrayToHex(stringToUint8Array(seedstring), false)
    const keyPair = createKeyPair(privateKeyGenerated)
    const privateKey = toHex(hexToByteArray(keyPair.getPrivate('hex'), PRIVATE_KEY_BYTES_LENGTH))
    const publicKey = toHex(hexToByteArray(keyPair.getPublic(true, 'hex'), PUBLIC_KEY_BYTES_LENGTH))
    const address = pubKeyToAddress(keyPair.getPublic('array'))
    const result = await sf.getFeed(address, 'shortcode')

    return result

    // const decryptedPrivateKey = await window.myWeb3.eth.accounts.decrypt(givenPrivateKey, givenPassword);

    // const res = await createFairdriveFolder(result.appname, decryptedPrivateKey.privateKey, 3, result.publicKey, mnemonic)

    // const newSwarmFeed = await sf.setFeed(
    //     address,
    //     'shortcode',
    //     privateKey,
    //     {
    //         status: 200,
    //         encryptedReturnObject: res
    //     })

    // const res1 = await sf.getFeed(address, "shortcode")

    // return true
}