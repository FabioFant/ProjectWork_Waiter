import Order from "./Order";

export default interface Table{
    tableId:number;
    occupants:number;
    occupied:boolean;
    orders:Order[];
    occupancyDate:Date;
    tableKey:string;
    totalBill:number;
}