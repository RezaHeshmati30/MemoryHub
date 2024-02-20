import React from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import HomePageButtons from '../components/HomePageButtons'

function Home() {
  return (
    <>
      <LoginForm />
      <SignUpForm />
      <HomePageButtons />
    </>
  )
}

export default Home
