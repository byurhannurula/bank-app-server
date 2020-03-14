import * as yup from 'yup'

export const AccountModalValidation = yup.object().shape({
  accountType: yup
    .string()
    .oneOf(['Basic', 'Savings', 'Credit', 'ISIC'])
    .required('Account type is required!')
    .label('Account type'),
  currency: yup
    .string()
    .oneOf(['BGN', 'EUR', 'USD'])
    .required('Currency is required!')
    .label('Currency'),
})

export const PaymentModalValidation = yup.object().shape({
  senderAccount: yup
    .string()
    .required('Sender Account IBAN is required!')
    .label('Sender Account'),
  iban: yup
    .string()
    .required("Beneficiary's IBAN is required!")
    .label('IBAN'),
  reason: yup
    .string()
    .required('Reason is required!')
    .label('Reason'),
  amount: yup
    .number()
    .positive()
    .required('Amount is required!')
    .label('Amount'),
})
