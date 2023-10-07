'use client';

import Link from 'next/link';
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

const MainNav = ({className, ...props}) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/employees/${params.employeeId}/overview`,
      label: 'Overview',
      active: pathName === `/${params.employeeId}/overview`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathName === `/${params.storeId}/billboards`,
    }, 
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
            )} >
              {route.label}
            </Link>
        ))}
    </nav>
  )
}

export default MainNav