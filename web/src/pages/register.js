import React, { useState } from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'

import { registerMutation } from '../requests'

const Register = () => {
  const [state, setState] = useState({
    firstName: 'Byurhan',
    lastName: 'Nurula',
    ssn: '1020304050',
    email: 'a@a.com',
    password: 'secretPass1',
  })

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const [register] = useMutation(registerMutation)

  return (
    <>
      <h2>Register to TNT Bank!</h2>
      <hr />
      <form
        onSubmit={async e => {
          e.preventDefault()
          await register({ variables: state })
          await Router.push('/')
          location.replace('/')
        }}
      >
        <input
          type="text"
          name="firstName"
          value={state.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="ssn"
          value={state.ssn}
          placeholder="Social Security Number"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={state.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={state.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </>
  )
}

export default Register
