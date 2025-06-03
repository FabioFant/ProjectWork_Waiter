import Product from "./Product";

export default interface Order {
    product:Product;
    orderId:number;
    qty:number;
    orderDate:Date;
    completionDate:Date | null;
}