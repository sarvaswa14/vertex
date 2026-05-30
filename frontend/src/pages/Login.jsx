import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
     async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        }catch(error){
            console.log(error.response.data.message)
        }
    }
    
    return (
        <div>
            <h1>
                Login
            </h1>
            <form onSubmit = {handleSubmit}>
                <input 
                    type="email"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder = "Email"/>
                <input 
                    type="password"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder = "Password"/>
            <button type ="submit">Login</button>
            </form>
        </div>
    )
}
export default Login