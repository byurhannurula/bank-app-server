import React from 'react'
import { Formik, Form } from 'formik'
import { useQuery } from '@apollo/react-hooks'
import { getAccounts } from '@requests'
import { formatMoney } from '@util'
import { Loader } from '@common'

import { InputField, SelectField } from '@common/InputField'
import { PaymentModalValidation } from '../Schemas'
import { Row, Group, Button } from '../styles'

export const PaymentModal = () => {
  const { loading, data } = useQuery(getAccounts)

  if (loading) {
    return <Loader />
  }

  const accounts = data && data.me.accounts

  return (
    <Formik
      validateOnChange
      validationSchema={PaymentModalValidation}
      initialValues={{ senderAccount: '', iban: '', reason: '', amount: 0 }}
      onSubmit={async (res, { setSubmitting, resetForm }) => {
        console.log(res)
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <Row>
            <Group>
              <SelectField
                id="senderAccount"
                name="senderAccount"
                label="Select Account"
                error={touched.senderAccount && errors.senderAccount ? 1 : 0}
              >
                <option value="" disabled>
                  Please select account
                </option>
                {accounts?.map(acc => (
                  <option value={acc.IBAN} key={acc.id}>
                    {acc.accountType}, {formatMoney(acc.balance)} {acc.currency}
                  </option>
                ))}
              </SelectField>
            </Group>
          </Row>
          <Row>
            <Group>
              <InputField
                type="text"
                id="iban"
                name="iban"
                label="Beneficiary IBAN"
                placeholder="IBAN number of beneficiary"
                error={touched.iban && errors.iban ? 1 : 0}
              />
            </Group>
          </Row>
          <Row>
            <Group>
              <InputField
                type="text"
                id="reason"
                name="reason"
                label="Transfer Reason"
                placeholder="Transfer reason..."
                error={touched.reason && errors.reason ? 1 : 0}
              />
            </Group>
          </Row>
          <Row>
            <Group>
              <InputField
                type="number"
                id="amount"
                name="amount"
                label="Amount"
                placeholder="Amount"
                error={touched.amount && errors.amount ? 1 : 0}
              />
            </Group>
          </Row>

          <Button type="submit" disabled={errors.length || isSubmitting}>
            Send
          </Button>

          <div>
            <pre>{JSON.stringify(touched, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </div>
        </Form>
      )}
    </Formik>
  )
}
