import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { InputField, registerSchema } from '@common'
import { registerMutation } from '@requests'

const Register = () => {
  const router = useRouter()

  const [register, { error }] = useMutation(registerMutation)

  return (
    <div className="register-page">
      <h2>Register to TNT Bank!</h2>
      <hr />
      <div className="form">
        <Formik
          initialValues={{
            firstName: '',
            lastName: 'Nurula',
            ssn: '1020304050',
            email: 'a@a.com',
            password: 'secretPass1',
          }}
          validationSchema={registerSchema}
          onSubmit={async (res, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            await register({ variables: res })
            await router.push('/')
            setSubmitting(false)
            resetForm()
          }}
        >
          {({ touched, errors, isValid, isSubmitting }) => (
            <Form>
              <div className="row">
                <div className="group">
                  <InputField
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    error={touched.firstName && errors.firstName ? 1 : 0}
                  />
                  <InputField
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    error={touched.lastName && errors.lastName ? 1 : 0}
                  />
                  <InputField
                    type="text"
                    id="ssn"
                    name="ssn"
                    label="SSN"
                    error={touched.ssn && errors.ssn ? 1 : 0}
                  />
                  <InputField
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    error={touched.email && errors.email ? 1 : 0}
                  />
                  <InputField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    error={touched.password && errors.password ? 1 : 0}
                  />
                </div>
              </div>

              <div className="error">
                {error && error.graphQLErrors[0].message}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid || isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <p className="small-text">
        Already have an account?{' '}
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </div>
  )
}

export default Register
