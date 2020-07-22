import React, { useEffect } from "react"
import main from "styles.module.css"
import accountstyles from "../account-create.module.css"
import ethers from "ethers"

async function createMnemonicArray() {
    window.ethers = ethers
    let bytes = ethers.utils.randomBytes(16);
    let language = ethers.wordlists.en;
    let randomMnemonic = await ethers.utils.entropyToMnemonic(bytes, language)
    let mnemonic = randomMnemonic
    let wallet = await ethers.utils.HDNode.fromMnemonic(randomMnemonic)
    let array = randomMnemonic.split(" ")

    window.wallet = wallet
    return { array, wallet }
}

export function MnemonicShow({ nextStage, exitStage, setMnemonic, mnemonic, setWallet, setCollection }) {

    useEffect(() => {
        createMnemonicArray().then(({ array, wallet }) => {
            setWallet(wallet)
            setMnemonic(array)
        })
    }, [setMnemonic, setWallet])

    return (
        <div className={accountstyles.container}>
            <div className={accountstyles.closeButton} onClick={exitStage}>
                <div className={main.closeicon} />
            </div>
            <div className={accountstyles.title}>Write down this seed phrase</div>
            <div className={accountstyles.subtitle}>
                With it, you will always be able to restore your account.
            </div>

            <div className={accountstyles.mnemonic}>
                {mnemonic.map((word, index) => (
                    <div key={index}>
                        {index + 1 + ". " + word}
                    </div>
                ))}
            </div>
            {mnemonic.length >= 1 ?
                <div tabIndex="2" className={main.button} onClick={nextStage}>
                    <div>
                        <div className={main.buttontext}>continue</div>
                    </div>
                </div>
                : ""}


        </div>
    )
}

export default MnemonicShow