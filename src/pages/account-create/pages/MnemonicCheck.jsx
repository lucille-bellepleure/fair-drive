import React, { useRef } from "react";
import { Form, FormProvider } from 'react-advanced-form'
import { Input } from 'react-advanced-form-addons'
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";

export function MnemonicCheck({
  nextStage,
  exitStage,
  mnemonic
}) {

  let refForm = useRef(null)

  const validationRules = {
    name: {
      word3: ({ value }) => value === mnemonic[2],
      word5: ({ value }) => value === mnemonic[4],
      word9: ({ value }) => value === mnemonic[8],
      word11: ({ value }) => value === mnemonic[10],
    }
  }

  const handleSubmit = () => {
    nextStage()
  }

  const triggerSubmit = () => {
    refForm.submit().then((x) => {
      console.log(x)
    })
  }

  return (
    <div className={accountstyles.formcontainer}>
      <FormProvider>

        <Form rules={validationRules} ref={form => refForm = form} action={handleSubmit}>

          <div className={accountstyles.closeButton} onClick={exitStage}>
            <div className={styles.closeicon} />
          </div>
          <div className={accountstyles.title}>
            Check your writing:
    </div>
          <div className={accountstyles.mnemoniccheck}>

            <div className={accountstyles.textField}>
              <Input
                name="word3"
                placeholder="Word 3"
                required
              ></Input>
            </div>
            <div className={accountstyles.textField}>
              <Input
                name="word5"
                placeholder="Word 5"
                required

              ></Input>
            </div>
            <div className={accountstyles.textField}>
              <Input
                name="word9"
                placeholder="Word 9"

                required
              ></Input>
            </div>
            <div className={accountstyles.textField}>
              <Input
                name="word11"
                placeholder="Word 11"
                required
              ></Input>
            </div>


          </div>

        </Form>
      </FormProvider>

    </div >
  );
};

export default MnemonicCheck;
