import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Router from 'next/router'

import { loginMutation } from '@requests'

const Login = () => {
  const [state, setState] = useState({
    email: 'b@b.com',
    password: 'secretPass1',
  })

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const [login] = useMutation(loginMutation)

  return (
    <>
      <h2>Login to TNT Bank!</h2>
      <hr />
      <form
        onSubmit={async e => {
          e.preventDefault()
          await login({ variables: state })
          await Router.push('/')
          setState({ email: '', password: '' })
        }}
      >
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

        <button type="submit">Login</button>
      </form>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </>
  )
}

export default Login
