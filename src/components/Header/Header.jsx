import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'



const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  console.log("Auth Status:", authStatus);


  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Sign In",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='flex items-center  bg-white border-b'>
      <Container>
       <nav className='flex items-center justify-between py-4 px-6'>
         <div className='mr-4'>
            <Link to='/'>
              <Logo  width='text-2xl font-bold'/>
            </Link>
         </div>
         <ul className='flex items-center space-x-4'>
          {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <Button
                onClick={() => navigate(item.slug)}
                className='flex flex-wrap justify-evenly px-6 py-2 duration-200 rounded-3xl'
                size='default'
                >{item.name}</Button>
              </li> 
            ) : null )}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
         </ul>
       </nav> 
      </Container>
    </header>
  )
}

export default Header