import { redirect } from 'next/navigation';

import MainNav from './MainNav';
import Switcher from './Switcher';

const NavBar = async () => {

 return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Switcher/>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          
        </div>
      </div>
    </div>
  );
}

export default NavBar