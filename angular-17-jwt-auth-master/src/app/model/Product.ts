export interface  Product
{
        id:number;
        filteredData: string;
        productName: string ,
        qty: number  ,
        price: number ,
        [key: string]: any;
        addControl: any;
        displayedColumns: any;
}