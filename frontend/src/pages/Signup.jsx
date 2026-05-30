import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signup(){
    const[name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
     async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            navigate('/login')
        }catch(error){
            console.log(error.response.data.message)
        }
    }
    
    return (
        <div>
            <h1>
                Signup
            </h1>
            <form onSubmit = {handleSubmit}>
                <input
                    type = "text"
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                    placeholder = "Name"/>
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
            <button type ="submit">Register</button>
            </form>
        </div>
    )
}
export default Signup