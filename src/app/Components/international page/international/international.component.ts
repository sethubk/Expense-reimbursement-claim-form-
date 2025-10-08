import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { TravelEntryService } from '../../../services/travel-entry.service';
import { PersonalDataService } from '../../../services/personal-data.service';

@Component({
  selector: 'app-international',
  standalone: true,
  imports: [CommonModule,ClarityModule,FormsModule],
  templateUrl: './international.component.html',
  styleUrl: './international.component.css'
})
export class InternationalComponent implements OnInit{

  constructor(private travelService:TravelEntryService ,private router:Router ,private service:PersonalDataService) {}
maxDate:string=''
    personalData: any;
ngOnInit(): void {
  //  debugger
  // const today = new Date();
  // this.maxDate = today.toISOString().split('T')[0]; // Format: yyyy-MM-dd
 
  //  this.personalData = this.service.getDetails();
  //  console.log('perso',this.personalData)
}

selectedCurrency: string = '';
  currencyModalOpen: boolean = false;
formopen: boolean = false;
  
entry: any = {
    type: 'Card',
    inrRate: null,
    totalLoaded: null,
    loadedDate: '',
    currerncy:''
  };
   username: string = '';

  isEdit: boolean = false;
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
    this.router.navigate(['/internationalcal'])
  }

 entries: any[] = [];
  editIndex: number | null = null;
  editType: 'Card' | 'Cash' | null = null;


  

  get cardEntries() {
    return this.travelService.getCardEntries();
  }

  get cashEntries() {
    return this.travelService.getCashEntries();
  }

  openCurrencyModal() {
    this.entry = {
      type: 'Card',
      inrRate: null,
      totalLoaded: null,
      loadedDate: '',
 currerncy:this.selectedCurrency
    };
    this.editIndex = null;
    this.editType = null;
    this.currencyModalOpen = true;
  }

  saveEntry() {
    if (this.editIndex !== null && this.editType) {
      this.travelService.updateEntry(this.editIndex, this.entry, this.editType);
    } else {
      this.entry.currency = this.selectedCurrency;
      this.travelService.addEntry(this.entry);
    }

    this.currencyModalOpen = false;
    this.editIndex = null;
    this.editType = null;
  }

  editEntry(index: number, type: 'Card' | 'Cash') {
    const source = type === 'Card' ? this.cardEntries : this.cashEntries;
    this.entry = { ...source[index] };
    this.selectedCurrency = this.entry.currency;
    this.editIndex = index;
    this.editType = type;
    this.currencyModalOpen = true;
  }

  deleteEntry(index: number, type: 'Card' | 'Cash') {
    this.travelService.deleteEntry(index, type);
  }
travelStart: string = '';
travelEnd: string = '';
totaldays: number =0;

calculateDays(start: string, end: string): number {
  if (!start || !end) return 0;

  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const roundedDays = parseFloat(diffDays.toFixed(2));
 
  this.totaldays = roundedDays; // Assigning to totaldays as a string
  return roundedDays;
}
allowanceAmount: number = 0;

calculateAllowance(): number {
  const allowance = this.totaldays * 100;
  this.travelService.setAllowance(allowance)
  return this.allowanceAmount;
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
    this.calculateAllowance()
  }
}
