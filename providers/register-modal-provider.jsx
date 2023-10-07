'use client';
import RegisterModal from '@/components/modals/register-modal';
import  {useState, useEffect} from 'react';

const RegisterModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  }, [])

  if(!isMounted){
    return null;
  }

  return (
    <>
     <RegisterModal />
    </>
  )
}

export default RegisterModalProvider