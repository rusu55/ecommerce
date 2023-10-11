'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {signIn} from 'next-auth/react';
import { Form, FormField, FormItem, FormLabel, FormControl,  FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

import useLoginModal from '@/hooks/use-login-modal';
import Modal from "@/components/ui/modal";

import { format } from 'date-fns';

const LoginModal = () => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl) ?? `/${format(new Date(), 'yyyy')}/overview`
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
      email: z.string().nonempty('Field is required').email({ message: 'Must be a valid email' }),
      password: z.string().nonempty('Password required')
    });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
          email: "",
          password: ""
      },
    });

   const onSubmit = async (data) =>{
        setLoading(true);

        signIn('credentials', {
          ...data,
          redirect: false,
        })
        .then((callback) =>{
          setLoading(false);

          if(callback?.error){
            
            toast.error(callback.error);
            return null
          }
          if(callback?.ok){
            toast.success('Logged in');
            router.push(callbackUrl);
            loginModal.onClose();      
          }     
        })
    }

  return (
    <Modal
        title="Login"
        description="Enter to you account"
        isOpen={loginModal.isOpen} 
        onClose={loginModal.onClose}>      
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
                    <Button variant="outline" onClick={loginModal.onClose}>Cancel</Button>
                    <Button type="submit">Next</Button>
                  </div>
              </form>
            </Form>
          </div>
        </div>
    </Modal>
  )
}

export default LoginModal