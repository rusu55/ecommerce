'use client';
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SideNav = () => {
    let isTableMid = useMediaQuery({query: "(max-width: 768px)"});

    const [isOpen, setIsOpen] = useState(isTableMid ? false : true);
    const sideBarRef = useRef();

    useEffect(()=>{
            if(isTableMid){
                setIsOpen(false)
            }else{
                setIsOpen(true)
            }
         }, [isTableMid]);

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
                open:{

                },
                closed: {

                },
             }; 

  return (
    <div>
        <motion.div
            ref={sideBarRef}
            variants={navAnimation}
            initial={{x: isTableMid ? _250 : 0}}
            animate={open ? "open" : "closed"}
            className=""
            >                
        </motion.div>
    </div>
  )
}

export default SideNav