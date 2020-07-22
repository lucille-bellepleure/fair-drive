import EthCrypto from "eth-crypto"
import ethers from "ethers"
import { toHex, hexToByteArray, byteArrayToHex, numbersToByteArray, stringToUint8Array } from 'helpers/conversion';
import SwarmFeed from "./swarmFeed"

export default async function createFairDriveFolder(folderName, privateKey, keyPairNonce, publicKey, mnemonic) {
    // returns encrypted keypair of new folder
    const sf = new SwarmFeed

    console.log('Create Folder: ', folderName, privateKey, keyPairNonce, publicKey)
    //let wallet = await new ethers.Wallet(privateKey)
    let wallet = await ethers.utils.HDNode.fromMnemonic(mnemonic)

    console.log(wallet)

    const folderWallet = wallet.derivePath("m/44'/60'/" + keyPairNonce + "'/0/0")
    console.log(folderWallet)
    const newNonce = keyPairNonce + 1
    const newFolderFeed = await sf.setFeed(
        folderWallet.address,
        folderName,
        folderWallet.privateKey,
        {
            keyIndex: newNonce,
            name: folderName,
            ownerAddress: folderWallet.address,
            content: {}
        })

    const prevFairdrive = await sf.getFeed(wallet.address, 'fairdrive')

    const folderId = new Date().toISOString()

    prevFairdrive[folderId] = {
        name: folderName,
        address: folderWallet.address
    }

    const hash2 = await sf.setFeed(
        wallet.address,
        'fairdrive',
        wallet.privateKey,
        prevFairdrive)

    const PUBLIC_KEY_BYTES_LENGTH = 33

    const returnObject = { pk: folderWallet.privateKey, username: "Michelle" }

    const publicKeyArray = hexToByteArray(publicKey, PUBLIC_KEY_BYTES_LENGTH)
    const encrypted = await EthCrypto.encryptWithPublicKey(
        publicKeyArray, // publicKey
        JSON.stringify(returnObject) // message
    );

    return encrypted
}

