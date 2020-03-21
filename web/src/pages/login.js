import React from 'react'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'

import { InputField, loginSchema } from '@common'
import { loginMutation } from '@requests'

const Login = () => {
  const router = useRouter()

  const [login, { error }] = useMutation(loginMutation)

  return (
    <div className="login-page">
      <h2>Login to TNT Bank!</h2>
      <hr />
      <div className="form">
        <Formik
          initialValues={{
            email: 'b@b.com',
            password: 'secretPass1',
          }}
          validateOnChange
          validationSchema={loginSchema}
          onSubmit={async (res, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            await login({ variables: res })
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
        <p className="small-text">
          Don&rsquo;t have an account?{' '}
          <Link href="/register">
            <a>Create one</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
