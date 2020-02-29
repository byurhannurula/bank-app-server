import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useQuery } from '@apollo/react-hooks'
import { getAccounts } from '@requests'
import { formatMoney } from '@util'
import { Loader } from '@common'

import { InputField } from '../input'
import { Row, Group, SelectInput, Button } from '../styles'

export const PaymentModal = () => {
  const { loading, data } = useQuery(getAccounts)

  if (loading) {
    return <Loader />
  }

  const accounts = data && data.me.accounts

  return (
    <Formik
      initialValues={{
        iban: '',
        reason: '',
        amount: null,
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        iban: Yup.string()
          .required("Beneficiary's IBAN is required!")
          .label('IBAN'),
        reason: Yup.string()
          .required('Reason is required!')
          .label('Reason'),
        amount: Yup.number()
          .positive()
          .required('Amount is required!')
          .label('Amount'),
      })}
      onSubmit={async (res, { setSubmitting, resetForm }) => {
        console.log(res)
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <Row>
            <Group>
              <label htmlFor="senderAccount">Select Account</label>
              <SelectInput name="senderAccount" id="senderAccount">
                {accounts?.map(acc => (
                  <option value={acc.IBAN} key={acc.id}>
                    {acc.accountType}, {formatMoney(acc.balance)} {acc.currency}
                  </option>
                ))}
              </SelectInput>
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

          <Button type="submit" disabled={isSubmitting}>
            Send
          </Button>
        </Form>
      )}
    </Formik>
  )
}
