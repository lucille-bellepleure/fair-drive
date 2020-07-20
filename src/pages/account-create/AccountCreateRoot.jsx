import React, { useState } from "react"
import { useHistory } from "react-router-dom"

// Sub-pages
import AccountCreateIntro from "./pages/AccountCreateIntro"
import MnemonicShow from "./pages/MnemonicShow"
import MnemonicCheck from "./pages/MnemonicCheck"

// Ids
const accountCreateIntroId = "accountCreateIntroId"
const mnemonicShowId = "mnemonicShowId"
const mnemonicCheckId = "mnemonicCheckId"

export function AccountCreateRoot() {

    const [stage, setStage] = useState(accountCreateIntroId)
    const history = useHistory()

    // Mnemonic for debugging
    //const [mnemonic, setMnemonic] = useState(["scissors", "system", "judge", "reveal", "slogan", "rice", "option", "body", "bronze", "insane", "evolve", "matter"])
    const [mnemonic, setMnemonic] = useState([])

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
                />
            )
        case mnemonicCheckId:
            return (
                <MnemonicCheck
                    nextStage={() => setStage()}
                    exitStage={() => setStage(accountCreateIntroId)}
                    mnemonic={mnemonic}
                />
            )
        default:
            return <h1>Oops...</h1>
    }
}

export default AccountCreateRoot