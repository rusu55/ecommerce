"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl,  FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from "@/components/ui/modal";
import useClientModal from '@/hooks/use-client-modal';

const ClientModal = () => {
  const clientModal = useClientModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
        email: z.string().nonempty('Field is required').email({ message: 'Must be a valid email' }),
        name: z.string().nonempty('Name required'),
        address: z.string(),
        phone: z.string(),
        weddingDate: z.string(),
        services: z.string(),
        value: z.string(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        address: "",
        email: "",
        phone: "",
        weddingDate: "",
        services: "",
        value: "",
    },
  })

  const onSubmit = async (data) =>{
      setLoading(true);
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
      title="Register"
      description="Register to new account"
      isOpen={clientModal.isOpen} 
      onClose={clientModal.onClose}> 
        <div>
                <div className='space-y-4 py-2 pb-4'>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="name" render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
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
                            <FormItem className="mt-3">
                                <FormLabel>Wedding Date</FormLabel>
                                <FormControl>
                                <Input placeholder="Wedding Date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="services" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Services</FormLabel>
                                <FormControl>
                                <Input placeholder="Services" {...field} />
                                </FormControl>
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