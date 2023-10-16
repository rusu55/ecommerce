"use client"
import {useState} from 'react'
import { Check, ChevronsUpDown, PlusCircle, CalendarCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useParams, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';


const Switcher = ({ className, items = [] }) => {

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false)  
 
 const formatedYears = items.map((item) => ({
                    label: item.years,
                    id: items.id
                  })) 
    
  
  const selectedYear = formatedYears.find((item) => item.label === params.clientsYear)  
  const handleYearChange = (currentYear) =>{
    setOpen(false);
    
    router.push(`/${currentYear}/overview`);
    
  }
  return (
   <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <Button variant="outline"
              size="sm"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a store"
              className={cn("w-[200px] justify-between", className)}>
                  {selectedYear?.label}
          </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
          <Command>
              <CommandList>
                  <CommandInput placeholder="Select Year..."/>
                  <CommandEmpty>No Year Found</CommandEmpty>
                  <CommandGroup heading="Years">
                        {formatedYears.map((item)=>(
                          <CommandItem
                              key={item.label}
                              className="text-sm"
                              onSelect={() => handleYearChange(item.label)}
                          >
                            <CalendarCheck2 className="mr-2 h-4 w-4" />
                            {item.label}
                            <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedYear?.label === item.label
                                  ? "opacity-100"
                                  : "opacity-0"
                                )}
                              />
                          </CommandItem>
                        ))}
                  </CommandGroup>
              </CommandList>
              <CommandSeparator/>
              
          </Command>
      </PopoverContent>
   </Popover>
  )
}

export default Switcher