import Product from "./Product";

export default interface Order {
    product:Product;
    orderId:number;
    orderDate:Date;
    completionDate:Date | null;
    total:number
}