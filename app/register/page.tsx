"use client"
import { registerUser , type RegisterState } from "../actions/users"
import { useActionState } from "react"

const RegisterPage = () => {
 
  const initialState: RegisterState = { 
    errors: {},
    values: { username: "",
      password : "" , 
      name : "" , 
      confirmpassword : "" } 
  }
  
const [state , formAction ] = useActionState(registerUser , initialState)

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" defaultValue={state.values.username} required />
          </label>
          {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values.name} required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" defaultValue={state.values.password} required />
          </label>
        </div>

        <div>
          <label>
           Confirm Password
            <input type="password" name="confirmpassword" defaultValue={state.values.confirmpassword} required />
          </label>

          {state.errors?.confirmpassword && <p style={{ color: "red" }}>{state.errors?.confirmpassword}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage