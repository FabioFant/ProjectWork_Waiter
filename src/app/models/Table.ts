import Order from "./Order";

export default interface Table{
    id:number;
    occupants:number;
    occupied:boolean;
    orders:Order[];
    occupancyDate:Date;
    tableKey:string;
}