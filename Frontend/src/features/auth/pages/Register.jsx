import React, { useState } from 'react'
import '../style/register.scss'
import Formgroup from '../components/Formgroup'
import {Link} from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

  const [username,setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const {loading,handleRegister} = useAuth();

  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try {
      await handleRegister({email,password,username})
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          <Formgroup
          value={username}
          onChange={(e)=> {setusername(e.target.value)}}
          label="name" placeholder="Enter your username: " />

          <Formgroup
          value={email}
          onChange={(e)=> {setemail(e.target.value)}}
          label="email" placeholder="Enter your email: " />
          
          <Formgroup
          value={password}
          onChange={(e)=> {setpassword(e.target.value)}}
          label="password" placeholder="Enter your password: " />


          <button className='button' type="submit" disabled={loading}>Register</button>

          <p>Already have an account? <Link to="/login">Login here</Link></p>

        </form>
      </div>
    </main>
  )
}

export default Register