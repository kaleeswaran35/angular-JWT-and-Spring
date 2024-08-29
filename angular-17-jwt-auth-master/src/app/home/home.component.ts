// app.component.ts
import { Component, Injectable, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../model/Product';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'qty', 'price', 'actions', 'Delete'];
  dataSource = new MatTableDataSource<Product>([]);
  searchQuery: string | any;

  editform: FormGroup | any;
  editingItem: Product[] | any;
  id: Product[] | any;
  insertItem: any;
  insertform: any;

  constructor(private userService: UserService, private fb: FormBuilder, public dialog: MatDialog) {

    this.editform = this.fb.group({
      productName: ['', Validators.required],
      qty: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });

    this.insertform = this.fb.group({
      productName: ['', Validators.required],
      qty: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });



  }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      (response: Product[]) => {
        this.dataSource.data = response.sort((a, b) => a.productName.localeCompare(b.productName));
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }




  editItem(item: Product): void {
    this.editingItem = { ...item };
    // this.userService.updateItem(this.editingItem);
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
      console.log(id, "id");
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


    const dialogRef = this.dialog.open(AddProductComponent,{
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

  
}




