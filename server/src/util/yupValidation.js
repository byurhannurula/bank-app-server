const yup = require('yup')

const name = yup
  .string()
  .min(3, 'Name must be at least 3 caracters!')
  .max(255)
  .required('Name is required!')

const email = yup
  .string()
  .email('Please enter valid email!')
  .required('Email is required!')

const password = yup
  .string()
  .min(8, 'Password must be at least 8 caracters!')
  .max(255)
  .required('Password is required!')
  .matches(
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/,
    'Password must be at lest 8 characters, one lowercase, one uppercase and one digit!',
  )

const ssn = yup
  .string()
  .min(10, 'SSN number must be 10 caracters!')
  .max(10, 'SSN number can be maximum of 10 caracters!')
  .required('SSN number is required!')

exports.registerSchema = yup.object().shape({
  firstName: name,
  lastName: name,
  ssn,
  email,
  password,
})

exports.loginSchema = yup.object().shape({
  email,
  password,
})
