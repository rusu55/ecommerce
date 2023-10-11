"use client";

import { useParams, useRouter } from "next/navigation";
import  Heading  from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {DataTable} from "@/components/ui/data-table";
import { columns } from "./columns";

import useClientModal from "@/hooks/use-client-modal";

const BillboardClient = ({data}) => {
    const params = useParams();
    const router = useRouter();
    const clientModal = useClientModal();
  return (
    <>
        <div className="flex items-center justify-between">
              <Heading title="test" description="Manage Data" />
              <Button onClick={clientModal.onOpen}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />        
    </>
  )
}

export default BillboardClient