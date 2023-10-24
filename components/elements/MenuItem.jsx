'use client';
import qs from 'query-string';
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Link from 'next/link';


const MenuItem = ({icon: Icon, label, href}) => {
const path = usePathname()
let selected = false;
if(path === href){
    selected = true
}
  return (
   <Link
    href= {href}
     className={`p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium  hover:text-neutral-400 transition
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
     `}>
        <Icon size={23} />{label}
   </Link>
  )
}

export default MenuItem