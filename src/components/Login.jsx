import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import { Input } from './index'
import { useDispatch } from 'react-redux'
import authService  from '../appwrite/auth'
import { set, useForm } from 'react-hook-form'
import loginImg from '../assets/login-img.jpg'


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        setError('')
        try {
          const session = await authService.login(data)
          if (session) {
            const userData = await authService.getCurrentUser()
            if (userData) {
                dispatch(authLogin({userData}))
                navigate('/')
            }
          }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
        <div className="flex items-center justify-center ">
          <div className="mx-auto grid w-[550px] gap-6 py-10 px-16 border border-black/10 rounded-xl shadow-zinc-900 shadow-lg">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign in to your account</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
              {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            </div>
            <form onSubmit={handleSubmit(login)} className='mt-8'>
              <div className="grid gap-4">
                  <div className="grid gap-2">
                  <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                  </div> 
                  <Input
                      type = 'email'
                      placeholder = 'Enter your email'
                      {...register('email', {
                          required: true,
                          validate: {
                              matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                              .test(value) ||
                              "Email address must be a valid address",
                          }
                      })}
                  />
                  </div>
                  <div className="grid gap-2">
                  <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                  </div>
                      <Input
                          type = 'password'
                          placeholder = 'Enter your password'
                          {...register('password', {
                              required: true,
                              minLength: 6
                          })}
                      />
                      <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                          >
                          Forgot your password?
                      </Link>
                  </div>
                  <Button
                  type = 'submit'
                  className='w-full'
                  >
                  Sign In
                  </Button>
                  <Button 
                  variant="outline" 
                  className="w-full">
                  Sign In with Google
                  </Button>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm">
              <p className="mt-2 text-center text-base text-black/60">
                      Don&apos;t have any account?&nbsp;
                      <Link
                          to="/signup"
                          className="font-medium text-primary transition-all duration-200 hover:underline"
                      >
                          Sign Up
                      </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src={loginImg}
            alt="Image"
            width="1920"
            height="1080"
            className="w-full  h-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
}

export default Login