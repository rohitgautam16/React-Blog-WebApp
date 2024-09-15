import React, {useState, useEffect}from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({children, authentication = true}) => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const authstatus = useSelector( state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

         if(authentication && authstatus !== authentication){
                navigate('/login')
         } else if (!authentication && authstatus !== authentication){
                navigate('/')
         }
         setLoading(false)
    },[authstatus, navigate, authentication])
  return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout