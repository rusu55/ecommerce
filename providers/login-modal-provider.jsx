'use client';
import LoginModal from '@/components/modals/login-modal';
import  {useState, useEffect} from 'react';

const LoginModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  }, [])

  if(!isMounted){
    return null;
  }

  return (
    <>
     <LoginModal />
    </>
  )
}

export default LoginModalProvider