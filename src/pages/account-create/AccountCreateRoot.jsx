import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import defaultAvatar from "images/defaultAvatar.png"
import EthCrypto from "eth-crypto"

// Sub-pages
import AccountCreateIntro from "./pages/AccountCreateIntro"
import MnemonicShow from "./pages/MnemonicShow"
import MnemonicCheck from "./pages/MnemonicCheck"
import ChooseUsername from "./pages/ChooseUsername"
import ChoosePassword from "./pages/ChoosePassword"
import ChooseAvatar from "./pages/ChooseAvatar"
import CreatingAccount from "./pages/CreatingAccount"
import { createNextState } from "@reduxjs/toolkit";

// Ids
const accountCreateIntroId = "accountCreateIntroId"
const mnemonicShowId = "mnemonicShowId"
const mnemonicCheckId = "mnemonicCheckId"
const chooseUsernameId = "chooseUsernameId"
const chooseAvatarId = "chooseAvatarId"
const choosePasswordId = "choosePasswordId"
const creatingAccountId = "creatingAccountId"

export function AccountCreateRoot() {

    const fds = window.fds
    const dispatch = useDispatch()

    const [stage, setStage] = useState(accountCreateIntroId)
    const history = useHistory()
    // Mnemonic for debugging
    //const [mnemonic, setMnemonic] = useState(["scissors", "system", "judge", "reveal", "slogan", "rice", "option", "body", "bronze", "insane", "evolve", "matter"])
    const [mnemonic, setMnemonic] = useState([])
    const [wallet, setWallet] = useState()
    const [collection, setCollection] = useState()
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState()

    const [accountCreateDone, setAccountCreateDone] = useState(false)
    const [item0, setItem0] = useState(false)
    const [item1, setItem1] = useState(false)
    const [item2, setItem2] = useState(false)
    const [item3, setItem3] = useState(false)

    // Create account function 
    const createAccount = async () => {
        setStage(creatingAccountId)
        const wallet0 = wallet.derivePath("m/44'/60'/0'/0/0")
        const wallet1 = wallet.derivePath("m/44'/60'/0'/0/1")
        const wallet2 = wallet.derivePath("m/44'/60'/0'/0/2")

        setItem0(true)
        const hash = await fds.Account.SwarmStore.SF.set(
            wallet.address,
            'userdata',
            wallet.privateKey,
            {
                username: username,
                useravatar: avatar,
                publicKey: wallet.publicKey,
                address: wallet.address,
                addresses: [wallet0.address, wallet1.address],
                keyPairNonce: 2
            })
        setItem1(true)
        const tempFolderId = new Date().toISOString()
        const tempFolderFeed = await fds.Account.SwarmStore.SF.set(
            wallet1.address,
            'fairdrive-temp',
            wallet1.privateKey,
            {
                keyIndex: 1,
                name: "Temporary",
                ownerAddress: wallet1.address,
                content: {}
            })
        const dappFolderFeed = await fds.Account.SwarmStore.SF.set(
            wallet2.address,
            'fairdrive-dappdata',
            wallet2.privateKey,
            {
                keyIndex: 2,
                name: "DappData",
                ownerAddress: wallet2.address,
                content: {}
            })
        const hash2 = await fds.Account.SwarmStore.SF.set(
            wallet.address,
            'fairdrive',
            wallet.privateKey,
            {
                "Temporary": {
                    name: 'Temporary',
                    address: wallet1.address
                },
                "DappData": {
                    name: 'DappData',
                    address: wallet2.address
                }
            })
        setItem2(true)
        // encrypt mnemonic
        const mnemonicJoined = mnemonic.join(" ")

        const encryptedPrivateKey = await window.myWeb3.eth.accounts.encrypt(wallet.privateKey, password);

        // encrypt wallet0
        const userObject = {
            status: 'accountSet',
            username: username,
            avatar: avatar,
            address: wallet.address,
            publicKey: wallet.publicKey,
            mnemonic: mnemonicJoined,
            privateKey: encryptedPrivateKey,
            keypairNonce: 2
        }

        dispatch({ type: "SET_ACCOUNT", data: userObject })
        setItem3(true)
    }

    // Router
    switch (stage) {
        case accountCreateIntroId:
            return (
                <AccountCreateIntro
                    createStage={() => setStage(mnemonicShowId)}
                    restoreStage={() => setStage()}
                    exitStage={() => history.goBack()}
                />
            )

        case mnemonicShowId:
            return (
                <MnemonicShow
                    nextStage={() => setStage(mnemonicCheckId)}
                    exitStage={() => setStage(accountCreateIntroId)}
                    setMnemonic={setMnemonic}
                    mnemonic={mnemonic}
                    setWallet={setWallet}
                    setCollection={setCollection}
                />
            )
        case mnemonicCheckId:
            return (
                <MnemonicCheck
                    nextStage={() => setStage(chooseUsernameId)}
                    prevStage={() => setStage(mnemonicShowId)}
                    exitStage={() => setStage(accountCreateIntroId)}
                    mnemonic={mnemonic}
                />
            )
        case chooseUsernameId:
            return (
                <ChooseUsername
                    avatar={avatar}
                    setUsername={setUsername}
                    username={username}
                    nextStage={() => setStage(choosePasswordId)}
                    exitStage={() => setStage(accountCreateIntroId)}
                    avatarStage={() => setStage(chooseAvatarId)}>
                </ChooseUsername>
            );
        case chooseAvatarId:
            return (
                <ChooseAvatar
                    avatar={defaultAvatar}
                    exitStage={() => setStage(chooseUsernameId)}
                    setAvatar={setAvatar}>
                </ChooseAvatar>
            );
        case choosePasswordId:
            return (
                <ChoosePassword
                    createAccount={createAccount}
                    exitStage={() => setStage(accountCreateIntroId)}
                    setPassword={setPassword}
                    password={password}
                />
            );
        case creatingAccountId:
            return (
                <CreatingAccount
                    accountCreateDone={accountCreateDone}
                    item0={item0}
                    item1={item1}
                    item2={item2}
                    item3={item3}
                />
            );
        default:
            return <h1>Oops...</h1>
    }
}

export default AccountCreateRoot