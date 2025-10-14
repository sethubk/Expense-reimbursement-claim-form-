import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDataService } from '../../../services/personal-data.service';
import { ImplicitReceiver } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule,NgForm } from '@angular/forms';
import { TravelEntryService } from '../../../services/travel-entry.service';
import { EntryModel, FormDataModel } from '../../../Models/formsData';

@Component({
  selector: 'app-domestic',
  standalone: true,
  imports: [CommonModule,ClarityModule,FormsModule],
  templateUrl: './domestic.component.html',
  styleUrl: './domestic.component.css'
})
export class DomesticComponent implements OnInit{

  travelStart: string = '';
  travelEnd: string = '';
  totaldays: number = 0;
  maxDate: string = ''
  personalData: any;
  selectedCurrency: string = 'INR';
  currencyModalOpen: boolean = false;
formopen: boolean = false;
 entries: any[] = [];
  editIndex: number | null = null;
  editType: 'Card' | 'Cash' | null = null;

  

  constructor(private router: Router, private Service: PersonalDataService, private travelService:TravelEntryService) { }
ngOnInit(): void {
    
const today = new Date();
this.maxDate = today.toISOString().slice(0, 16); // 'yyyy-MM-ddTHH:mm'
this.personalData=this.Service.getDetails()
}
 
 entry: EntryModel = {
  type: 'Card',
  inrRate: null,
  totalLoaded: null,
  loadedDate: '',
  currerncy: ''
};

   username: string = '';

  isEdit: boolean = false;
  
  
  formData:FormDataModel = {
    date: '',
    supportingNo: '',
    particulars: '',
    paymentMode: 'Cash',
    amount: null,
    remarks: '',
    screenshot: ''
  };

  get travelEndDateOnly(): string {
  return this.travelEnd ? this.travelEnd.split('T')[0] : '';
}
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
  get cardEntries() {
    return this.travelService.getCardEntries();
  }

  get cashEntries() {
    return this.travelService.getCashEntries();
  }

  openCurrencyModal() {
    this.entry = {
      type: 'Card',
      inrRate: 1,
      totalLoaded: null,
      loadedDate: '',
 currerncy:this.selectedCurrency
    };
    this.editIndex = null;
    this.editType = null;
    this.currencyModalOpen = true;
  }

 saveEntry(form:NgForm) {
   if (form.valid) {
if (this.editIndex !== null && this.editType) {
      this.travelService.updateEntry(this.editIndex, this.entry, this.editType);
    } else {
      this.entry.currerncy = this.selectedCurrency;
      this.travelService.addEntry(this.entry);
    }

    this.currencyModalOpen = false;
    this.editIndex = null;
    this.editType = null;
  }

   }
    

  editEntry(index: number, type: 'Card' | 'Cash') {
    const source = type === 'Card' ? this.cardEntries : this.cashEntries;
    this.entry = { ...source[index] };
    this.selectedCurrency = this.entry.currerncy;
    this.editIndex = index;
    this.editType = type;
    this.currencyModalOpen = true;
  }

  deleteEntry(index: number, type: 'Card' | 'Cash') {
    this.travelService.deleteEntry(index, type);
  }
  gotoreview() {
     debugger
   
    this.router.navigate(['domesticexpense'])
   
  }
}
