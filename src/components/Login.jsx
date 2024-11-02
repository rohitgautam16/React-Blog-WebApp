import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import { Input } from './index'
import { useDispatch } from 'react-redux'
import authService  from '../appwrite/auth'
import { set, useForm } from 'react-hook-form'
import loginImg from '../assets/login-img.png'


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
                navigate("/all-posts")
            }
          }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
      <div className="w-full min-h-[600px] lg:flex lg:min-h-screen pt-4 bg-cream">
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="mx-auto flex w-full max-w-md h-auto gap-6 py-10 px-8 border border-black/10 rounded-xl shadow-zinc-900 shadow-lg">
            <div className="w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Sign in to your account</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your email below to login to your account
                </p>
                {error && <p className='text-red-600 mt-4'>{error}</p>}
              </div>
              <form onSubmit={handleSubmit(login)}>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type='email'
                      placeholder='Enter your email'
                      {...register('email', {
                        required: true,
                        validate: {
                          matchPattern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        },
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type='password'
                      placeholder='Enter your password'
                      {...register('password', {
                        required: true,
                        minLength: 6,
                      })}
                    />
                    <Link
                      href=""
                      className="ml-auto text-sm underline mt-2 block"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Button type='submit' className='w-full'>
                    Sign In
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign In with Google
                  </Button>
                </div>
              </form>
              <div className="mt-8 text-center">
                <p className="text-base text-black/60">
                  Don&apos;t have an account?&nbsp;
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
        </div>
        <div className="hidden lg:flex lg:w-1/2 ">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    );
    
}

export default Login