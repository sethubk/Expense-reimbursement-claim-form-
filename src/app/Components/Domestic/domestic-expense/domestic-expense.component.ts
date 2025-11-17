import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelEntryService } from '../../../services/travel-entry.service';
import { PersonalDataService } from '../../../services/personal-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { FormDataModel } from '../../../Models/formsData';

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
maxDate:string='';
 personalData: any;
allowance:number=0;
startDate: string = '';
  endDate: string = '';
 showMax: boolean = false;
  ngOnInit(): void {

//     const today = new Date();
//   this.maxDate = today.toISOString().split('T')[0];
//     this.personalData=this.service.getDetails()
//   this.allowance=this.travelService.getallowance()
//   this.entries.push({
//     date: '',
//       supportingNo: '', 
//   particulars:'Allowance',
//   amount:this.allowance || 0,
//   paymentMode:'Cash',
//   remarks: '',
//  })

// new updated codes 
  const fullStart = this.travelService.getTravelStart(); // e.g., "2025-10-30T09:00"
  const fullEnd = this.travelService.getTravelEnd();     // e.g., "2025-11-05T18:00"

  this.startDate = fullStart.split('T')[0]; // "2025-10-30"
  this.endDate = fullEnd.split('T')[0];

  const today = new Date();
  this.maxDate = today.toISOString().split('T')[0];

  this.personalData = this.service.getDetails();

  // Check if entries already exist
  const existingEntries = this.service.getentries();
  if (existingEntries && existingEntries.length > 0) { 

    let allowanceEntry = existingEntries.find((x: { particulars: string; }) => x.particulars == "Allowance");
    
    let allowance = this.travelService.getAllowance();

    if(allowanceEntry)
    {
    allowanceEntry.amount = allowance;
    }
  this.service.setentries(existingEntries);

    // Load all entries (including allowance and user-added)
    this.entries = existingEntries;
    
  } else {
    // First time: only push allowance
    const allowance = this.travelService.getAllowance();
    console.log("calculation", allowance);

    this.entries = [{
      paymentMode:'cash',
      particulars: 'Allowance',
      amount: allowance || 0
    }];

    
  }
  // Save to service
    this.service.setentries(this.entries);
}

  formData:FormDataModel = {
    date: '',
    supportingNo: '',
    particulars: '',
    paymentMode: 'Cash',
    amount: null,
    remarks: '',
    screenshot: ''
  };

  openmodel() {
     
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
  
preview:any;
 onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
 
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

    addEntry(form: NgForm) {
     

    if (form.valid) {
  const entry = {
    ...this.formData,
    preview: this.preview // include the image preview here
  };

  if (this.editIndex != null && this.isEdit) {
    // Update existing entry
    this.entries[this.editIndex] = entry;
    this.editIndex = null;
    this.isEdit = false;
  } else {
    // Add new entry
    this.entries.push(entry);
  }

  this.formopen = false;

  // Save entries using the service
  this.travelService.setentries(this.entries);
}}
      Editentry(entry: any, index: number) {
       
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
    backbtn(){
      this.router.navigate(['domestic'])
    }
}
