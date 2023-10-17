import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Heading from "@/components/ui/heading";

import { GetSalesCount } from "@/actions/getSalesCount";
import Chart from "@/components/elements/Chart";

const Statistics = async  ({params}) => {
  const sales = await GetSalesCount(params.clientsYear);
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard"  description={`Overview of ${params.clientsYear}`} />
        <Separator/>
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                        Total Revenue                        
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sales.revenue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">{sales.contracts}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart data={sales.chartData} year={params.clientsYear}/>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}

export default Statistics