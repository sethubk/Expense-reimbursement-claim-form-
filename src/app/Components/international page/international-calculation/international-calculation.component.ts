import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelEntryService } from '../../../services/travel-entry.service';
import { PersonalDataService } from '../../../services/personal-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-international-calculation',
  standalone: true,
  imports: [ClarityModule,FormsModule,CommonModule],
  templateUrl: './international-calculation.component.html',
  styleUrl: './international-calculation.component.css'
})
export class InternationalCalculationComponent implements OnInit{
isEdit: boolean = false;

  constructor(private travelService:TravelEntryService ,private router:Router ,private service:PersonalDataService) {}

ngOnInit(): void {
 
const allowance = this.travelService.getAllowance();
  console.log("calculation", allowance);
this.entries.push({
  paymentMode:'Cash',
  particulars:'Allowance',
  amount:allowance || 0
 })
}


formopen: boolean = false;
 entries: any[] = [];
 index1:number=this.entries.length
  editIndex: number | null = null;
  editType: 'Card' | 'Cash' | null = null;

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
      this.router.navigate(['internationalreview'])
    }
}
