import React, { useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import {SiGoogleearth,SiGithub} from 'react-icons/si'
import { useRouter } from 'next/router';
import { useForm , SubmitHandler} from "react-hook-form";
import Link from 'next/link';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { useState } from 'react';
import {BiShow,BiHide} from 'react-icons/bi'
import { GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { Button } from '@/components/ui/button';

const validationSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
      }),
    password: z.string().min(4,{message:"Password must contain at least 4 characters"}).max(20),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const Signin = () => {

  const [showpass, setshowpass] = useState(false)
  const [showconfpass, setshowconfpass] = useState(false)
  const {currentUser,signup,signInWithGoogle} = useAuth()
  const [error,seterror] = useState<string>('')
  const [loading, setloading] = useState<boolean>(false)
  const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
      });

    

// handle Register *****************************************
  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const {email,password} = data
    console.log("data",data)
    try{
        setloading(true)
        await signup(email,password)
        router.push("/")
    }
    catch (e:any){
        setloading(false)
        seterror(e.code?.split("auth/")[1])
        toast({
          variant: "default",
          title: "Failed to signup",
          description:e.code?.split("auth/")[1],
          action: <ToastAction className='' altText="Try again"><Button className='bg-red-500 hover:bg-red-600 text-white'>Try again</Button> </ToastAction>,
        })
        // toast.error(e.code?.split("auth/")[1])
    }
    
    }
    
// handle Google Register *****************************************
const handleGoogleRegister = async()=>{
    setloading(true)
    await signInWithGoogle().then((result: UserCredential) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      console.log(user)
      console.log(currentUser)
      setloading(false)
      router.push("/")

    }).catch((error: FirebaseError) => {
      const errorCode = error.code;
      console.log(errorCode)
      const credential = GoogleAuthProvider.credentialFromError(error);
      seterror(error.code?.split("auth/")[1])
      // toast.success("Account created")
    });
}


  return (
    <div className="flex flex-col min-h-screen overflow-hidden " >

          <section className="  ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div  className="flex items-center mb-6 text-2xl font-semibold text-white">
                <Link href="/" className="flex space-x-2">
                      <SiGoogleearth className="sm:w-9  w-7  text-teal-600 "/>
                      <h1 className="sm:text-4xl text-5xl font-bold ml-2 tracking-tight text-black">
                          Movie <span className="text-teal-600">Recommendation</span>App
                      </h1>
                  </Link> 
                </div>

                <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-[#111111] border-[#303030]">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 justify-items-center flex-auto">
                      
                      {/* sign in with Google */}
                        <button onClick={()=>handleGoogleRegister()} className="bg-white hover:bg-gray-100 text-gray-700 border inline-flex items-center font-medium rounded-lg text-md px-5 py-2.5 text-center w-full border-gray-300">
                          <div className='flex m-auto'>
                          <FcGoogle size={22} />
                          Signup With Google
                          </div>
                        </button>

                        <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">Your email</label>
                                <input {...register("email")}  type="email" name="email" id="email" className={`border  sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 bg-[#111111] border-[#525151] placeholder-gray-600 text-white   ${errors.email && "border-red-500"}`} placeholder="name@company.com" required />
                                {errors.email && (
                                        <p className="text-xs italic text-red-500 mt-2">
                                            {errors.email?.message}
                                        </p>
                                        )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">Password</label>
                                    <div className='relative'>
                                      <input {...register("password")}  type={showpass?"text":"password"} name="password" id="password" placeholder="••••••••" className={`border   sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 bg-[#111111] border-[#525151] placeholder-gray-600 text-white  ${errors.password && "border-red-500"}`} required />
                                      <span className='absolute inset-y-3 right-2'>
                                                <button onClick={(e)=>{e.preventDefault();setshowpass(!showpass)}} className=' rounded-md px-1 text-slate-500'>{showpass? <BiShow size={20}/> : <BiHide size={20}/>}</button>
                                      </span>
                                    </div>


                                {errors.password && (
                                            <p className="text-xs italic text-red-500 mt-2">
                                                {errors.password?.message}
                                            </p>
                                            )}
                            </div>
                            <div>
                                <label htmlFor="Confirm password" className="block mb-2 text-sm font-medium  text-white">Confirm Password</label>
                                  <div className='relative'>
                                      <input {...register("confirmPassword")}  type={showconfpass?"text":"password"} id="confirm_password" placeholder="••••••••" className={`border  sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 bg-[#111111] border-[#525151] placeholder-gray-600 text-white  ${errors.confirmPassword && "border-red-500"}`}  />
                                      <span className='absolute inset-y-3 right-2'>
                                          <button onClick={(e)=>{e.preventDefault();setshowconfpass(!showconfpass)}} className=' rounded-md px-1 text-slate-500'>{showconfpass? <BiShow size={20}/> : <BiHide size={20}/>}</button>
                                      </span>
                                  </div>
                                
                                    {errors.confirmPassword && (
                                        <p className="text-xs italic text-red-500 mt-2">
                                        {errors.confirmPassword?.message}
                                        </p>
                                    )}
                            </div>

                            {loading ? 
                              <div role="status" className='mx-auto w-10'>
                                <svg aria-hidden="true" className="w-8 h-8 mr-2  animate-spin text-gray-600 fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                              </div>
                              :
                            <button type="submit" className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center   focus:ring-teal-800">Signup</button>
                            }
                  
                            <p className="text-sm font-light text-gray-500 ">
                              Already have an account? <Link href="/auth/login" className="font-medium  hover:underline text-teal-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
          </section>
  </div>
  )
}
export default Signin
