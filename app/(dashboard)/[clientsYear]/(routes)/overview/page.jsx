import { format } from "date-fns";
import BillboardClient from "./components/client";
import { connectToDB } from "@/utils/database";
import Client from "@/models/client";

const Clients = async ({params}) => {
  
  await connectToDB();
  const clients = await Client.find({weddingDate: {$gte: `${params.clientsYear}-01-01`, $lte: `${params.clientsYear}-12-30`}});
 
const formatedData = clients.map((client) =>({
  id : client.id,
  weddingDate: format(client.weddingDate, 'MM/dd/yyyy'),
  firstName : client.firstName,
  lastName: client.lastName,
  email: client.email,
  phone: client.phone,
  services: client.services,
}))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formatedData} /> 
        </div>
    </div>
  )
}

export default Clients