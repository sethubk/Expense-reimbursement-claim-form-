import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelEntryService } from '../../../services/travel-entry.service';
import { PersonalDataService } from '../../../services/personal-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domestic-expense',
  standalone: true,
  imports: [ClarityModule,CommonModule,FormsModule],
  templateUrl: './domestic-expense.component.html',
  styleUrl: './domestic-expense.component.css'
})
export class DomesticExpenseComponent implements OnInit {

isEdit: boolean = false;
formopen: boolean = false;
 entries: any[] = [];
 index1:number=this.entries.length
  editIndex: number | null = null;
  editType: 'Card' | 'Cash' | null = null;

  constructor(private travelService:TravelEntryService ,private router:Router ,private service:PersonalDataService) {}

 personalData: any;
allowance:number=0
  ngOnInit(): void {
    this.personalData=this.service.getDetails()
  this.allowance=this.travelService.getallowance()
  this.entries.push({
    date: '',
      supportingNo: '', 
  particulars:'Allowance',
  amount:this.allowance,
  paymentMode:'Cash',
  remarks: '',
 })
}

  formData: any = {
    date: '',
    supportingNo: '',
    particulars: '',
    paymentMode: 'Cash',
    amount: null,
    remarks: '',
    screenshot: ''
  };

  openmodel() {
    debugger
    this.formopen=true
    this.formData = {
      date: '',
      supportingNo: '',
      particulars: '',
      paymentMode: 'Cash',
      amount: null,
      remarks: '',
      screenshot: ''
    };
  }
    addEntry(form: NgForm) {
      debugger
  
      if (form.valid) {
        if (this.editIndex != null && this.isEdit) {
  
          // Update existing entry
          this.entries[this.editIndex] = this.formData;
          this.editIndex = null;
          this.isEdit = false
  
        }
        else {
          this.entries.push({ ...this.formData });
  
  
        }
  
        this.formopen = false
      }
       this.travelService.setentries(this.entries)
    }
  
      Editentry(entry: any, index: number) {
      debugger
      this.formData = ({ ...entry })
      this.editIndex = index;
      this.formopen = true
      this.isEdit = true;
      console.log("forms", this.formData);
  
  
    }
    removeentry(index: number) {
      const of = confirm("are you sure")
      if (of) {
        this.entries.splice(index, 1)
      }
  
    }
     gotoreview() {
      this.router.navigate(['domesticreview'])
    }
}
