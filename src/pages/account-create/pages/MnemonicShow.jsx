import React, { useEffect } from "react"
import main from "styles.module.css"
import accountstyles from "../account-create.module.css"
import ethers from "ethers"

async function createMnemonicArray() {
    let wallet = await ethers.Wallet.createRandom()
    let randomMnemonic = wallet.mnemonic.phrase.toString()
    let array = randomMnemonic.split(" ")
    console.log(array)
    return array
}

export function MnemonicShow({ nextStage, exitStage, setMnemonic, mnemonic }) {

    useEffect(() => {
        createMnemonicArray().then(array => setMnemonic(array))
    }, [setMnemonic])

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