'use client';
import ClientModal from '@/components/modals/client-modal';
import  {useState, useEffect} from 'react';

const ClientModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  }, [])

  if(!isMounted){
    return null;
  }

  return (
    <>
     <ClientModal />
    </>
  )
}

export default ClientModalProvider