import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Overview from "@/components/elements/Chart";

import Heading from "@/components/ui/heading";
import { getGraphData } from "@/actions/getGraphData";
import Chart from "@/components/elements/Chart";

const Dashboard = async ({params}) => {
  const graphData = getGraphData();
  return (
   <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading title="Dashboard"  description="Overview of your store" />
          <Separator />
          <div className="grid gap-4 grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2500</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+28</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30</div>
                </CardContent>
              </Card>
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart data={graphData} />
            </CardContent>
          </Card>
      </div>
   </div>
  )
}

export default Dashboard