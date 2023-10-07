'use client';

import {useState, useEffect} from 'react'
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import Modal from "@/components/ui/modal";
import  useStoreModal  from "@/hooks/use-store-modal";
import { useForm } from 'react-hook-form';
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';



const formSchema = z.object({
  name: z.string().min(1),
})

const StoreModal = () => {
    const storeModal = useStoreModal();

    

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues:{
        name: "",
      }
    });

    const onSubmit = async (values) =>{
      //TODO Create Store
      console.log(values)
    }

  return (
    <Modal
         title="Create Store"
         description="Description" 
         isOpen={storeModal.isOpen} 
         onClose={storeModal.onClose}>
          <div>
            <div className='space-y-4 py-2 pb-4'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField control={form.control} name="name" render={({field}) =>(
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E-Comerce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                    <Button type="submit">Next</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
    </Modal>
  )
}

export default StoreModal