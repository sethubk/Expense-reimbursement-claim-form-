import { Component, OnInit } from '@angular/core';
import { PersonalDataService } from '../../services/personal-data.service';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TravelEntryService } from '../../services/travel-entry.service';

interface Entry {
  date: string;
  supportingNo: string;
  particulars: string;
  paymentMode: string;
  amount: number;
  remarks: string;
}

@Component({
  selector: 'app-expensereview',
  standalone: true,
  imports: [CommonModule,ClarityModule,FormsModule],
  templateUrl: './expensereview.component.html',
  styleUrl: './expensereview.component.css'
})
export class ExpensereviewComponent implements OnInit {
 constructor(private service:PersonalDataService , private router:Router,private TravelService:TravelEntryService){

 }
 entries:Entry[]=[];
  personalData: any;
  ngOnInit(): void {
 
    this.entries=this.service.getentries();
    this.personalData = this.service.getDetails();
    console.log(this.entries)
   
   
//  this.entries = [
//     {
//       date: '2025-09-01',
//       supportingNo: 'SUP001',
//       particulars: 'Office Supplies',
//       paymentMode: 'Cash',
//       amount: 1500,
//       remarks: 'Stationery purchase'
//     },
//     {
//       date: '2025-09-05',
//       supportingNo: 'SUP002',
//       particulars: 'Travel Reimbursement',
//       paymentMode: 'Cash',
//       amount: 3200,
//       remarks: 'Client visit'
//     }
//   ]
    
    this.calculateTotal();
  
  }
 totalAmount: number = 0;

calculateTotal() {
  this.totalAmount = this.entries.reduce((sum, entry: Entry) => sum + entry.amount, 0);
console.log(this.totalAmount)
}

printPage() {
  window.print();
}


submitExpense() {
  const expenseData = {
    type: 'Expense',
    createdDate: new Date().toISOString(),
    purposePlace: this.personalData?.purposePlace || '',
    totalAmount: '₹'+this.totalAmount,
    entries: this.entries,
    status:'Pending'
  };

  this.service.setExpense(expenseData);
  alert('Expense saved locally!');


this.router.navigate(['']);
}


showClaimSummary() {
  const summary = `
    Type: Expense
    Created Date: ${new Date().toLocaleDateString()}
    Purpose & Place: ${this.personalData?.purposePlace}
    Total Amount: ₹{this.totalAmount}
  `;
  alert(summary);
}
backbtn(){
  this.router.navigate(['expense'])
}

}
