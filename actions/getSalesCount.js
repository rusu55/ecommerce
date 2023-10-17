import {format} from 'date-fns'
import { connectToDB } from "@/utils/database";
import Client from "@/models/client";


export const GetSalesCount = async (year) =>{

       
    await connectToDB();
    const sales = (await Client.find({weddingDate: {$gte: `${parseInt(year-1)}-01-01`, $lte: `${year}-12-30`}}).select('value weddingDate').populate('value'));
    const contracts = await Client.count({weddingDate: {$gte: `${year}-01-01`, $lte: `${year}-12-30`}});
   
    // Revenue

        // Chart Data\
        
        const chartData = [
            { name: "Jan", now: 0, prev: 0 },
            { name: "Feb", now: 0, prev: 0 },
            { name: "Mar", now: 0, prev: 0 },
            { name: "Apr", now: 0, prev: 0 },
            { name: "May", now: 0, prev: 0 },
            { name: "Jun", now: 0, prev: 0 },
            { name: "Jul", now: 0, prev: 0 },
            { name: "Aug", now: 0, prev: 0 },
            { name: "Sep", now: 0, prev: 0 },
            { name: "Oct", now: 0, prev: 0 },
            { name: "Nov", now: 0, prev: 0 },
            { name: "Dec", now: 0, prev: 0 },
        ]

    const getTotalRevenue = (data) => {
        const revenue = data.reduce((total, sale) =>{
            return total + parseInt(sale.value.contractValue)
        }, 0)
        return revenue
    }

    const pushSalesInArray = (data, year = null) =>{
        const montlyRevenue = {};
        

        for (const sale of data){
            const month = sale.weddingDate.getMonth();
            montlyRevenue[month] = (montlyRevenue[month] || 0) + parseInt(sale.value.contractValue);
        }
        
        if(year != null){
            for(const month in montlyRevenue){
                chartData[parseInt(month)].now = montlyRevenue[parseInt(month)];
            }
        }
        else{
            for(const month in montlyRevenue){
                chartData[parseInt(month)].prev = montlyRevenue[parseInt(month)];
            }
            }
        }
        

    const currentYearSales =  sales.filter(object => new Date(object.weddingDate).getFullYear() === parseInt(year))
    const prevYearSales = sales.filter(object => new Date(object.weddingDate).getFullYear() !== parseInt(year))
    
    const currentYearRevenue = getTotalRevenue(currentYearSales);
    pushSalesInArray(currentYearSales, parseInt(year))
    
    const prevYearRevenue = getTotalRevenue(prevYearSales);
    
    pushSalesInArray(prevYearSales)
 
    
    const returnObject = {
        currentRevenue: currentYearRevenue,
        prevRevenue: prevYearRevenue,
        contracts: contracts,
        chartData: chartData,
    }
    return returnObject;
}