'use client';

import {format} from 'date-fns';

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import NavLink from "./NavLink";



const NavBar = () => {

  return (
    <nav className="relative container mx-auto p-6"> 
        <div className="flex justify-between items-center">
            <Logo /> 
            <div className="flex">
              <ul className="flex item-center gap-[2vw]">                
                  <NavLink href={`/${format(new Date(), 'yyyy')}/overview`} label="Clients" />
                  <NavLink href='/employees' label="Employees" />
                  <NavLink href='/contracts' label="Contracts" />
                  <NavLink href='/tasks' label="Tasks" />
              </ul>
            </div>            
            <UserMenu />
        </div>
    </nav>
  )
}

export default NavBar