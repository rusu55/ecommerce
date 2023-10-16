import { connectToDB } from "@/utils/database";
import Client from "@/models/client";

export const GetSalesCount = async (year) =>{
    
    await connectToDB();
    const sales = await Client.find({weddingDate: {$gte: `${year}-01-01`, $lte: `${year}-12-30`}}).select('value weddingDate');
    const contracts = await Client.count({weddingDate: {$gte: `${year}-01-01`, $lte: `${year}-12-30`}});
   
    // Revenue
    const totalRevenue = sales.reduce((total, sale) =>
    {
        return total + parseInt(sale.value)
    }, 0);

    // Chart Data\
    const montlyRevenue = {};
    const chartData = [
        { name: "Jan", 2023: 0, 2022: 2999 },
        { name: "Feb", 2023: 0, 2022: 0 },
        { name: "Mar", 2023: 0, 2022: 0 },
        { name: "Apr", 2023: 0, 2022: 1999 },
        { name: "May", 2023: 0, 2022: 0 },
        { name: "Jun", 2023: 0, 2022: 3999 },
        { name: "Jul", 2023: 0, 2022: 0 },
        { name: "Aug", 2023: 0, 2022: 1699 },
        { name: "Sep", 2023: 0, 2022: 3299 },
        { name: "Oct", 2023: 0, 2022: 1999 },
        { name: "Nov", 2023: 0, 2022: 0},
        { name: "Dec", 2023: 0, 2022: 1999 },
    ]

    for ( const sale of sales){
        const month = sale.weddingDate.getMonth();
        montlyRevenue[month] = (montlyRevenue[month] || 0) + parseInt(sale.value);
    }
    
    for(const month in montlyRevenue){
        chartData[parseInt(month)].total = montlyRevenue[parseInt(month)];
    }
   
    const returnObject = {
        revenue: totalRevenue,
        contracts: contracts,
        chartData: chartData,
    }
    return returnObject;
}