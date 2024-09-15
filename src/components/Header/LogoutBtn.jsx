import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Button } from '../ui/button'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
    }


  return (
    <Button
    className='flex flex-wrap gap-10 justify-evenly px-6 py-2 duration-200 rounded-full'
    onClick={logoutHandler}
    variant='default'
    >Log Out</Button>
  )
}

export default LogoutBtn