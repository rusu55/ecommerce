'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl,  FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Modal from "@/components/ui/modal";
import useRegisterModal from '@/hooks/use-register-modal';
import useLoginModal from '@/hooks/use-login-modal';

const RegisterModal= () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        email: z.string().nonempty('Field is required').email({ message: 'Must be a valid email' }),
        name: z.string().nonempty('Name required'),
        password: z.string().nonempty('Password required'),
      });

      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name:"",
            password: ""
        },
      });


      const onSubmit =  async (data) =>  {
        setLoading(true);
        axios.post('/api/register', data)
             .then(()=>{
                registerModal.onClose();
                loginModal.onOpen();
             }
             )
             .catch((error) =>{
                toast.error(error.response.data);
             })
             .finally(() =>{
                setLoading(false);
             }               
             )
      }

  return (
    <Modal
            title="Register"
            description="Register to new account"
            isOpen={registerModal.isOpen} 
            onClose={registerModal.onClose}>        
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="email" render={({field}) =>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input placeholder="Email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="name" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button variant="outline" onClick={registerModal.onClose}>Cancel</Button>
                            <Button type="submit">Next</Button>
                        </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
  )
}

export default RegisterModal