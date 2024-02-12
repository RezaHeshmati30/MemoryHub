import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function LogoutForm() {
    const {logoutHandler} = useContext(AuthContext);
  return (
    <form onSubmit={logoutHandler}>
            <button type='submit'>Logout</button>
          </form>
  )
}

export default LogoutForm