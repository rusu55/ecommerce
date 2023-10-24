'use client';
import {format} from 'date-fns'
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { usePathname} from "next/navigation";
import { motion } from "framer-motion";
import {ArrowUpSquare, LayoutGrid, UserSquare2} from 'lucide-react';


import MenuItem from "../elements/MenuItem";


const SideNav = () => {
    let isTableMid = useMediaQuery({query: "(max-width: 768px)"});
    const pathName = usePathname();

    const [isOpen, setIsOpen] = useState(isTableMid ? false : true);
    const sideBarRef = useRef();

    useEffect(()=>{
            if(isTableMid){
                setIsOpen(false)
            }else{
                setIsOpen(true)
            }
         }, [isTableMid]);

     useEffect(()=>{
            
            isTableMid && setIsOpen(false);
          }, [pathName])

     const navAnimation =  isTableMid ? {
                open:{
                    x: 0,
                    width: "16rem",
                    transition: {
                        damping: 40,                        
                    },
                },
                closed:{
                    x: -250,
                },
             } :{
                open: {
                    width: "16rem",
                    transition: {
                      damping: 40,
                    },
                  },
                  closed: {
                    width: "4rem",
                    transition: {
                      damping: 40,
                    },
                  },
                };

  return (
    <div>
        <div onClick={() => setIsOpen(false)} className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          isOpen ? "block" : "hidden"
         } `}>
        </div>
        <motion.div
            ref={sideBarRef}
            variants={navAnimation}
            initial={{x: isTableMid ? -250 : 0}}
            animate={isOpen ? "open" : "closed"}
            className="bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] overflow-hidden md:relative fixed h-screen"
            >
             <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
                <img src="https://img.icons8.com/color/512/firebase.png" width={45} alt=""/>
            <span className="text-xl whitespace-pre">Red Barn</span>
        </div>
        <div className="flex flex-col  h-full">
            <div className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
               <MenuItem  label="Home" icon={LayoutGrid}  href="/"/>
               <MenuItem  label="Clients" icon={UserSquare2}  href={`/${format(new Date(), 'yyyy')}/overview`}/>
            </div>
        </div>                
        </motion.div>
    </div>
  )
}

export default SideNav