import React from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import LogoutForm from '../components/LogoutForm'

function Home() {
  return (
    <>
        <LoginForm />
        <SignUpForm />
        <LogoutForm />
    </>
  )
}

export default Home