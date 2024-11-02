import React , {useState}from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Input } from './index'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import loginImg from '../assets/login-img.png'


const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const signup = async (data) => {
        setError('')
        try {
            const userData= await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
      <div className="w-full min-h-[600px] lg:flex lg:min-h-screen pt-4">
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="mx-auto flex w-full max-w-md h-auto gap-6 py-10 px-8 border border-black/10 rounded-xl shadow-zinc-900 shadow-lg">
            <div className="w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Sign up to create your account</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your details below to Create your account
                </p>
                {error && <p className='text-red-600 mt-4'>{error}</p>}
              </div>
              <form onSubmit={handleSubmit(signup)}>
                <div className="flex flex-col gap-4">
                  <div>
                  <Label htmlFor="full name">Full Name</Label>
                  <Input
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                   />
                  </div>
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
                  </div>
                  <Button type='submit' className='w-full'>
                    Sign Up
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign Up with Google
                  </Button>
                </div>
              </form>
              <div className="mt-8 text-center">
                <p className="text-base text-black/60">
                  Already have an account?&nbsp;
                  <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                  >
                    Sign In
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

export default Signup