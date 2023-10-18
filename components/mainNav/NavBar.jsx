import { redirect } from 'next/navigation';

import MainNav from './MainNav';
import Switcher from './Switcher';

import { connectToDB } from '@/utils/database';
import DateRange from '@/models/dateRange';

const NavBar = async () => {
  await connectToDB();
  const yearsRange = await DateRange.find({})
   

 return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Switcher items={yearsRange}/>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          sssssssssssssssssssssssssssss
        </div>
      </div>
    </div>
  );
}

export default NavBar