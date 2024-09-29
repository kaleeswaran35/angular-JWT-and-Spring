export interface Product {
        id: number,
        filteredData: string,
        productName: string,
        qty: any,
        price: number,
        [key: string]: any,
        addControl: any,
        displayedColumns: any,
        startDate: Date,
        endDate: Date,
        page:any,
        size:any;
        card_number:any;
        cvv:any;
}