"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl,  FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from "@/components/ui/modal";
import useClientModal from '@/hooks/use-client-modal';

import { services } from '@/utils/constants';

const ClientModal = () => {
  const clientModal = useClientModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);



  const formSchema = z.object({
        email: z.string().nonempty('Field is required').email({ message: 'Must be a valid email' }),
        firstName: z.string().nonempty('Name required'),
        lastName: z.string().nonempty('Name required'),
        address: z.string(),
        phone: z.string(),
        weddingDate: z.date(),        
        value: z.string(),
        services: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        firstName: "",
        lastName:"",
        address: "",
        email: "",
        phone: "",
        weddingDate: "",
        services: [],
        value: "",
    },
  })

  const onSubmit = async (data) =>{
      setLoading(true);
      console.log(data)
      
      axios.post('/api/clients', data)
           .then(()=>{
            clientModal.onClose();
            toast.success('Client succesufully added')
            //window.location.assign('/clients')
            router.refresh();
           })
           .catch((error) =>{
            toast.error(error.response.data)
           })
           .finally(()=>{
            setLoading(false);
           })
        
  }

  return (
    <Modal
      title="Add Client"
     
      isOpen={clientModal.isOpen} 
      onClose={clientModal.onClose}> 
        <div>
                <div className='space-y-4 py-2 pb-4'>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex justify-between'>
                            <FormField control={form.control} name="lastName" render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                        <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField control={form.control} name="firstName" render={({field}) =>(
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        
                        <FormField control={form.control} name="email" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input placeholder="Email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                <Input placeholder="Phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="weddingDate" render={({field}) =>(
                            <FormItem className="flex flex-col mt-3">
                                <FormLabel>Wedding Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) :(
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="services" render={() =>(
                            <FormItem className="mt-3">
                                <div className="mb-4">
                                    <FormLabel className="text-base">Services</FormLabel>                                    
                                </div>
                                {services.map((service) => (
                                    <FormField
                                        key={service.id}
                                        control={form.control}
                                        name='services'
                                        render={({ field }) => {
                                            return(
                                                <FormItem
                                                    key={service.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(service.id)}
                                                        onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, service.id])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                (value) => value !== service.id
                                                                )
                                                            )
                                                        }}
                                                    />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {service.label}
                                                        </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                 <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="value" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                <Input placeholder="value" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button variant="outline" onClick={clientModal.onClose}>Cancel</Button>
                            <Button type="submit">Save Client</Button>
                        </div>
                    </form>
                  </Form>
                </div>
        </div>
    </Modal>
  )
}

export default ClientModal