import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../model/Product';
import { UserService } from '../_services/user.service';
import { LoggerService } from '../_services/logger.services';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent implements OnInit {
  purchaseForm: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<PurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public purchaseItem: Product ,
    private fb: FormBuilder,
    private userService: UserService,
    private logger: LoggerService
  ) {     }
  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      productName: [this.purchaseItem.productName, Validators.required],
      qty: [this.purchaseItem.qty],  
      card_number: [this.purchaseItem.card_number], 
      cvv: [this.purchaseItem.cvv]  

    });
  }

  buy(): void {


    if (this.purchaseForm.valid) {
      var purchaseData: Product = {
        ...this.purchaseItem,
        ...this.purchaseForm.value
      };

      this.userService.purchaseProducts(purchaseData).subscribe(
        () => {
          alert('Product bought successfully!');
          this.dialogRef.close(true);
          this.logger.log('Bought Product:', this.purchaseItem.productName);          
        },
        (error) => {
          console.error('Error purchasing product:', error);          
        }
      );
    } else {
      alert('Please enter a valid quantity.');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
