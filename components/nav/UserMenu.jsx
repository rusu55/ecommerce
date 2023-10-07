'use client';
import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useSession, signOut } from 'next-auth/react';


import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import  useStoreModal  from "@/hooks/use-store-modal";
import MenuItem from "@/components/nav/MenuItem";
import Avatar from "@/components/elements/Avatar";


const UserMenu = () => {
  const { data: session, status } = useSession();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const storeModal = useStoreModal();
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleOpen = useCallback(() =>{
    setIsOpen((value) => !value)
  }, []);

   return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div className="hidden text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition md:block">
            Admin Menu
            </div>
            <div onClick={toggleOpen} className='flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition p-4 border-[1px] border-neutral-200 md:py-1 md:px-2'>
                 <AiOutlineMenu />
                 <div className="hidden md:block">
                   <Avatar src="" />
                 </div>
            </div>
        </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] bg-white overflow-hidden right-0 top-12 text-sm md:w-3/4">
                    <div className="flex flex-col cursor-pointer">                       
                          { session?.user ? (
                               <>
                               {/* Menu Items */}
                               <MenuItem label="My trips"  onClick={storeModal.onOpen} />                    
                               <MenuItem label="Sign Out" onClick={() => signOut()}/>
                               </>
                          ) : (
                              <>
                             <MenuItem label="Sign In" onClick={loginModal.onOpen}/>
                             <MenuItem label="Sign Up" onClick={registerModal.onOpen}/>
                             </> 
                          )}              
                                                 
                    </div>
                </div>
            )}
    </div>
  );
}

export default UserMenu