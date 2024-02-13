import React from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <>
      <NavBar />
      <LoginForm />
      <SignUpForm />
    </>
  )
}

export default Home