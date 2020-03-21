import * as yup from 'yup'

const firstName = yup
  .string()
  .min(3)
  .max(255)
  .label('First Name')
  .required('First Name is required!')

const lastName = yup
  .string()
  .min(3)
  .max(255)
  .label('Last Name')
  .required('Last Name is required!')

const email = yup
  .string()
  .email('Please enter valid email!')
  .required('Email is required!')
  .label('Email')

const password = yup
  .string()
  .min(8)
  .max(255)
  .required('Password is required!')
  .label('Password')
  .matches(
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/,
    'Password must contain at least one lowercase, one uppercase and one digit!',
  )

const ssn = yup
  .string()
  .min(10, 'SSN number must be 10 caracters!')
  .max(10, 'SSN number can be maximum of 10 caracters!')
  .required('SSN number is required!')
  .label('SSN')

export const registerSchema = yup.object().shape({
  firstName,
  lastName,
  ssn,
  email,
  password,
})

export const loginSchema = yup.object().shape({
  email,
  password,
})

export const accountSchema = yup.object().shape({
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

export const paymentSchema = yup.object().shape({
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
