import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Product } from '../model/Product';
import { LoggerService } from '../_services/logger.services'

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  editform: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingItem: Product,
    private fb: FormBuilder,
    private userService: UserService,
    private logger:LoggerService    
  ) {}

  ngOnInit(): void {
    // Initialize the form with the data passed from the dialog
    this.editform = this.fb.group({
      productName: [this.editingItem.productName, Validators.required],
      qty: [this.editingItem.qty],
      price: [this.editingItem.price, [Validators.required, Validators.min(0)]],
      //startDate: [new Date().toISOString().split('T')[0]], // Default to today's date
      endDate: [new Date().toISOString().split('T')[0]]

    });
  }

  save(): void {
    if (this.editform.valid) {
      var updatedProduct: Product = {
        ...this.editingItem,
        ...this.editform.value
      };
      console.log('im inside the save', this.editingItem);
      this.userService.updateItem(updatedProduct).subscribe(() => {
        alert('Product Updated');
        this.dialogRef.close(true);
        console.log(updatedProduct);
        this.logger.log('Updated Product Name:',updatedProduct.productName); // Added logger to write in file
           // Close dialog and indicate success
        next: () => {
          console.log(updatedProduct);
          this.logger.log('Updated Product Name:',updatedProduct.productName); // Added logger to write in file
          // Optionally, reset form or navigate to another page
        }},        
      (error) => {
        console.error('Error updating item', error);
      });
    }   
  }

  cancel(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
