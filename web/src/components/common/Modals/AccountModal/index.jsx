import React from 'react'
import { Formik, Form } from 'formik'
import { SelectField } from '@common/InputField'

import { Row, Group, Button } from '../styles'
import { AccountModalValidation } from '../Schemas'
import { accountTypes, currencies } from './data'

export const AccountModal = () => {
  return (
    <Formik
      initialValues={{ accountType: '', currency: '' }}
      validateOnChange
      validationSchema={AccountModalValidation}
      onSubmit={async (res, { setSubmitting, resetForm }) => {
        console.log(res)
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <Row>
            <Group>
              <SelectField
                id="accountType"
                name="accountType"
                label="Select Account Type"
                error={touched.accountType && errors.accountType ? 1 : 0}
              >
                <option value="" disabled>
                  Please select account type
                </option>
                {accountTypes.map(accType => (
                  <option value={accType.name} key={accType.id}>
                    {accType.name}
                  </option>
                ))}
              </SelectField>
            </Group>
          </Row>
          <Row>
            <Group>
              <SelectField
                id="currency"
                name="currency"
                label="Select Currency"
                error={touched.currency && errors.currency ? 1 : 0}
              >
                <option value="" disabled>
                  Please select currency
                </option>
                {currencies.map(curr => (
                  <option value={curr.name} key={curr.id}>
                    {curr.name}
                  </option>
                ))}
              </SelectField>
            </Group>
          </Row>

          <Button type="submit" disabled={errors.length || isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  )
}
