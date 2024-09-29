// app.component.ts
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../model/Product';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component'
import { isEmpty, Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LoggerService } from '../_services/logger.services';
import { EChartsOption } from 'echarts';
import { axisRight } from 'd3';
import { PurchaseDialogComponent } from '../purchase-dialog/purchase-dialog.component';
//import { index } from 'angular-17-jwt-auth-master/src/index.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable({
  providedIn: 'root',
})


export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'qty', 'price', 'actions', 'Delete','buy'];
  dataSource = new MatTableDataSource<Product>([]);
  searchQuery: string | any;

  editform: FormGroup | any;
  editingItem: Product[] | any;
  id: Product[] | any;
  insertItem: any;
  insertform: any;
  purchaseform: any;

  startDate: Date | null = null;
  endDate: Date | null = null;

  pageSize = 10; // Default page size
  length = 0;  // Total number of items (should be fetched from the server)
  data$: Observable<any> | undefined;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isSearchDisabled: boolean | undefined;  
  selectedItem = new FormControl('');
  FilteredItems: any;
  response: any;
  uniqueItems: { term: unknown; }[] | undefined; 
  chart:  any; 
  public chartOption: EChartsOption | any;
  value: any;
  totalPages: any;
  qty: number | any;
  product: any;
  purchaseItem: any;
  



  constructor(private userService: UserService, private fb: FormBuilder, public dialog: MatDialog,private logger:LoggerService) {

    


    this.editform = this.fb.group({
      productName: ['', Validators.required],
      qty: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      endDate: [new Date().toISOString().split('T')[0]]
    });

    this.insertform = this.fb.group({
      productName: ['', Validators.required],
      qty: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      startDate: [new Date().toISOString().split('T')[0]], // Default to today's date
      endDate: [new Date().toISOString().split('T')[0]]
    });

    this.purchaseform = this.fb.group({     
      productName: ['', Validators.required],
      qty: ['', [Validators.required, Validators.min(1)]],
           
    });

    // Default to one month later   

  }


  ngOnInit(): void {
    // Initial data fetch

    
    this.getServerData({
      pageIndex: 0, pageSize: this.pageSize,
      length: 0

          
    });

    this.loadPieChartData();
    

    
  }
  
  loadPieChartData(): void {
    this.userService.getPieChartData(this.pageIndex, this.pageSize).subscribe(
      data => {
        // Update chart data
        this.chartOption = {
          title: {
            text: 'Product Quantities',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Product',
              type: 'pie',
              radius: ['50%', '70%'], // Adjusted radius for a more typical pie chart
              data: data.content.map((item: any) => ({
                value: item.qty, // Set the value to the quantity
                name: item.productName // Set the name to the product name
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        
        // Update pagination info if provided
        this.totalPages = data.totalPages;
      },
      error => {        
        console.error('Error fetching chart data', error);
      }
    );
  }

  // Method to load the next page
  loadNextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.loadPieChartData();
    }
  }

  // Method to load the previous page
  loadPreviousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.loadPieChartData();
    }
  }
    

  onDateChange() {
    this.checkSearchButtonState();
  }

  checkSearchButtonState() {
    this.isSearchDisabled = !this.startDate || !this.endDate;
  }

  getServerData(event: PageEvent): void {
    // Fetch data from the server based on the pagination event
    this.data$ = this.userService.getPublicContent(event);
  
    // Subscribe to the observable
    this.data$.subscribe(
      (response) => {
        // Debug: Log the entire response
        this.logger.log('Fetched response:', JSON.stringify(response));
  
        // Ensure the response has the expected structure
        if (response && Array.isArray(response.content)) {
          // Debug: Log content before sorting
          this.logger.log('Content before sorting:', JSON.stringify(response.content));
  
          // Update length dynamically based on the response
          this.length = response.totalElements;
  
          // Sort the content by productName in a case-insensitive manner
          const sortedData = response.content.sort((a: { productName: string }, b: { productName: string }) => {
            const nameA = (a.productName || '').toLowerCase();
            const nameB = (b.productName || '').toLowerCase();
            return nameA.localeCompare(nameB);
          });
  
          // Debug: Log the sorted content
          this.logger.log('Content after sorting:', JSON.stringify(sortedData));
  
          // Update the dataSource with sorted data
          this.dataSource.data = sortedData;
        } else {
          console.error('Response does not contain expected data structure.');
        }
      },
      (error) => {
        // Log error if data fetching fails       
       
        this.dataSource.data = [];
        console.error('Error fetching data:', error);
      }
    );
  }
  
  editItem(item: Product): void {
    this.editingItem = { ...item };    
  }

  saveEdit(): void {
    if (this.editform.valid && this.editingItem) {
      const updatedProduct: Product = {
        ...this.editingItem,
        ...this.editform.value
      };

      this.userService.updateItem(updatedProduct).subscribe(
        () => {
          //
          this.editingItem = null;
          this.editform.reset();          
          this.ngOnInit();
        },
        (error) => {
          console.error('Error updating item', error);
        }
      );
    }
  }

  search(): void {
    if (this.searchQuery.trim()) {
      this.userService.getsearchContent(this.searchQuery).subscribe(
        (response: Product[]) => {
          this.logger.log(' Searched Product Name:', JSON.stringify(this.searchQuery));
          this.dataSource.data = response;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    } else {
      this.ngOnInit(); // Reset to full data if search query is empty
    }
  }

  clear(): void {
    this.searchQuery = '';
    this.startDate = null;
    this.endDate = null;
    this.uniqueItems = [];
    this.ngOnInit(); // Reset search
  }

  cancelEdit(): void {
    this.editform.reset;
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: product
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle result if needed
        this.ngOnInit(); // Refresh data or perform necessary actions
      }
    });
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.logger.log(id, "id");
      this.userService.deleteItem(id).subscribe({
        next: () => {
          // Handle successful deletion, e.g., refresh the table data
          this.ngOnInit();
        },
        error: (err: any) => {
          // Handle error response
          console.error('Error deleting item', err);
          alert('Failed to delete item.');
        }
      });
    }
  }

  openAddProductDialog(): void {

    const insertProduct: Product = {
      ...this.insertItem,
      ...this.insertform.value
    }


    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '250px',
      data: insertProduct
    });
    dialogRef.afterClosed().subscribe(
      result => {

        if (result) {
          alert('Product added');
          this.ngOnInit(); // Reload products after dialog closes
        }
      });
  }

  
  searchByDate(event?: PageEvent) {
    // If event is undefined, assume we are doing an initial load or reset    
    const pageIndex = event ? event.pageIndex : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;
    if (this.startDate && this.endDate) {
      this.userService.searchEvents(
        this.startDate.toISOString().split('T')[0], // Format to yyyy-MM-dd
        this.endDate.toISOString().split('T')[0],
        pageIndex,
        pageSize
      ).subscribe(
        response => {
          this.length = response.totalElements;
          this.dataSource.data = response.content.sort((a: { productName: string }, b: { productName: string }) => a.productName.localeCompare(b.productName));
          this.logger.log('searched Product', JSON.stringify(response.content));
        });
      }else {
        // Reset or fetch full data if search criteria is empty
        this.userService.searchEvents(
          '', // Or a default date range
          '',
          pageIndex,
          pageSize
        ).subscribe(
          response => {
            this.length = response.totalElements;
            this.dataSource.data = response.content.sort((a: { productName: string }, b: { productName: string }) => a.productName.localeCompare(b.productName));
            this.logger.log('searched Product', JSON.stringify(response.content));
          });}              
    }  
    
    loadRecentSearchResults(event: any): void {
      this.userService.getRecentSearchResults(event).subscribe(
        (data) => {
          this.response = data;
          this.FilteredItems = data; 
          this.uniqueItems = Array.from(new Set(this.FilteredItems.map((item: { term: any; }) => item.term)))
                              .map(term => ({ term }));       
        },
        (error) => {
          console.error('Error fetching recent search results', error);
        }
      );
    }

    addsearchTerm(term: string): void
    {      
      this.userService.addSearchTerm(term.trim()).subscribe(
        (data) => {
          this.addsearchTerm = data; 
                          
        },
        (error) => {
          console.error('Error fetching recent search results', error);
        }
      );
    }


    openPurchaseDialog(product: Product): void {      
      
      
      const dialogRef = this.dialog.open(PurchaseDialogComponent, {
        width: '300px',
        data: product // Ensure 'product' is defined here
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {          
          this.ngOnInit();
          console.log('Purchase dialog closed with confirmation');
        }
      });
    }
    

    
  }







