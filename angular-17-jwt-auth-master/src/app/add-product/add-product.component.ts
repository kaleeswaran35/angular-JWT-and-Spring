import { Component, Inject } from '@angular/core';
import { Product } from '../model/Product';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoggerService } from '../_services/logger.services'



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product [] | any;

  insertform: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public insertItem: Product,
    private fb: FormBuilder,
    private userService: UserService,
    private logger:LoggerService 
  ) {}

  ngOnInit(): void {
    // Initialize the form with the data passed from the dialog
    this.insertform = this.fb.group({
      productName: [this.insertItem.productName, Validators.required],
      qty: [this.insertItem.qty],
      price: [this.insertItem.price, [Validators.required, Validators.min(0)]],
      startDate: [new Date().toISOString().split('T')[0]], // Default to today's date
      endDate: [new Date().toISOString().split('T')[0]]

    });
  }

  addProduct(): void {
    
      const insertProduct: Product = {
        ...this.insertItem,
        ...this.insertform.value
      }
        this.userService.insertItem(insertProduct).subscribe(() => {
          this.dialogRef.close(true); // Close dialog and indicate success
          this.logger.log('Product added Name:',insertProduct.productName); 
          next: () => {
            console.log(insertProduct);
            
            console.log('Product added successfully:');            
           // Added logger to write in file        
            // Optionally, reset form or navigate to another page
          }},        
        (error) => {
          console.error('Error adding item', error);
        });    
  }

  cancel(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
