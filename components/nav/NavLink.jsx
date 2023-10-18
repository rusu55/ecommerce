'use client';

import Link from "next/link";

const NavLink = ({href, label}) => {
  return (
    <li>
        <Link href={href} className='flex justify-center items-center transition duration-100 hover:text-gray-500'>{label}</Link>
     </li>
  )
}

export default NavLink