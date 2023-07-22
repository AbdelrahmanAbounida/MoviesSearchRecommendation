import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Logout = () => {

  const {currentUser,logout} = useAuth()
  const router = useRouter()


  useEffect(()=>{
    if(!currentUser){
      router.push("/")
    }
    else{
      logout()
      router.push("/")
    }
  },[currentUser])



  return (
    <div>Logginig out</div>
  )
}

export default Logout