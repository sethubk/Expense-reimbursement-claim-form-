import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDataService } from '../../../services/personal-data.service';
import { TravelEntryService } from '../../../services/travel-entry.service';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Entry {
  date: string;
  supportingNo: string;
  particulars: string;
  paymentMode: string;
  amount: number;
  remarks: string;
}
@Component({
  selector: 'app-domesticreview',
  standalone: true,
  imports: [ClarityModule,FormsModule,CommonModule],
  templateUrl: './domesticreview.component.html',
  styleUrl: './domesticreview.component.css'
})
export class DomesticreviewComponent implements OnInit {
constructor(private router:Router,private service:PersonalDataService,private TravelService:TravelEntryService){}
entries:any[]=[];
personalData: any;
advance:number=130000;

ngOnInit(): void {
  this.entries=this.TravelService.getentries();
    this.personalData = this.service.getDetails();
    this.advance=this.TravelService.getallowance();
    this.advance = isNaN(this.advance) ? 0 : this.advance;
this.calculateTotal()
}
getTotalsByPaymentMode(): { mode: string; total: number }[] {
  const totals: { [key: string]: number } = {};

  this.entries.forEach(entry => {
    const mode = entry.paymentMode;
    const amount = Number(entry.amount);

    if (!totals[mode]) {
      totals[mode] = 0;
    }

    totals[mode] += amount;
  });

  return Object.keys(totals).map(mode => ({
    mode,
    total: totals[mode]
  }));


}
totalAmount: number = 0;

calculateTotal() {
  this.totalAmount = this.entries.reduce((sum, entry: Entry) => sum + entry.amount, 0);
console.log(this.totalAmount)
return  this.totalAmount

}
getGrandTotal(): number {
  return this.entries.reduce((sum, entry) => sum + Number(entry.amount), 0);
}
printPage() {
  window.print();
}
getTotalByMode(mode: string): number {
  const totals = this.getTotalsByPaymentMode();
  const found = totals.find(t => t.mode === mode);
  return found ? found.total : 0;
}

get totalAmounts(): number {
  return this.entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

}
submitExpense() {
  const expenseData = {
    type: 'Domestic travel',
    createdDate: new Date().toISOString(),
    purposePlace: this.personalData?.purposePlace || '',
    totalAmount: this.getGrandTotal(),
    entries: this.entries,
    status:'Pending'
  };

  this.service.setExpense(expenseData);
  alert('Expense saved locally!');
this.router.navigate([''])

}


getSettlementDetails(): { message: string, amount: number, type: 'recover' | 'pay' | 'none' } {
  const cashPaid = this.getTotalByMode('Cash');
  const difference =  cashPaid -this.advance ;

  if (difference < 0) {
    return { message: 'Amount Recover from Employee', amount: Math.abs(difference), type: 'recover' };
  } else if (difference > 0) {
    return { message: 'Amount Payable to Employee', amount: Math.abs(difference), type: 'pay' };
  } else {
    return { message: '', amount: 0, type: 'none' };
  }
}

}
