'use client';

import Logo from "./Logo";
import UserMenu from "./UserMenu";


const NavBar = () => {

  return (
    <nav className="relative container mx-auto p-6"> 
        <div className="flex justify-between items-center">
            <Logo />
            <UserMenu />
        </div>
    </nav>
  )
}

export default NavBar