import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { TravelEntryService } from '../../../services/travel-entry.service';
import { PersonalDataService } from '../../../services/personal-data.service';
import { EntryModel, FormDataModel } from '../../../Models/formsData';

@Component({
  selector: 'app-international',
  standalone: true,
  imports: [CommonModule, ClarityModule, FormsModule],
  templateUrl: './international.component.html',
  styleUrl: './international.component.css'
})
export class InternationalComponent implements OnInit {
  travelStart: string = '';
  travelEnd: string = '';
  totaldays: number = 0;

  entries: FormDataModel[] = [];
  editIndex: number | null = null;
  editType: 'Card' | 'Cash' | null = null;
  maxDate: string = ''
  personalData: any;
  selectedCurrency: string = '';
  currencyModalOpen: boolean = false;
  formopen: boolean = false;

  entry: EntryModel = {
    type: 'Card',
    inrRate: null,
    totalLoaded: null,
    loadedDate: '',
    currerncy: ''
  };
  username: string = '';

  isEdit: boolean = false;
  formData: FormDataModel = {
    date: '',
    supportingNo: '',
    particulars: '',
    paymentMode: 'Cash',
    amount: null,
    remarks: '',
    screenshot: ''
  };

  constructor(private fb: FormBuilder,private travelService: TravelEntryService, private router: Router, private service: PersonalDataService) { }

  ngOnInit(): void {

    this.travelStart = this.travelService.getTravelStart();
    this.travelEnd = this.travelService.getTravelEnd();

    const today = new Date();
    this.maxDate = today.toISOString().slice(0, 16); // 'yyyy-MM-ddTHH:mm'

    //this.personalData = this.service.getDetails();
    console.log('perso', this.personalData)

    
  }
  isInvalidDate: boolean = false;
  validateDate() {
    debugger
    if (this.travelStart && this.maxDate) {
      this.isInvalidDate = new Date(this.travelStart) > new Date(this.maxDate);
      this.isInvalidDate = true
    } else {
      this.isInvalidDate = false;
    }
  }

  maxDateValidator(): boolean {
    if (!this.travelStart) return true;
    return new Date(this.travelStart) <= new Date(this.maxDate);
  }


  openmodel() {
    this.router.navigate(['/internationalcal']);
  }


  get travelEndDateOnly(): string {
    return this.travelEnd ? this.travelEnd.split('T')[0] : '';
  }

  get cardEntries() {
    return this.travelService.getCardEntries();
  }

  get cashEntries() {
    return this.travelService.getCashEntries();
  }

  get totalEnteries() {
    let allow = 0;
    let total;
    // const cardvalue=this.travelService.getCardEntries();
    // const cashvalue=this.travelService.getCashEntries();
    this.travelService.getCardEntries().forEach(x => {
      allow += x['totalInr']
    })

    this.travelService.getCashEntries().forEach(x => {
      allow += x['totalInr']
    })
    return allow
  }

  openCurrencyModal() {
    this.entry = {
      type: 'Card',
      inrRate: null,
      totalLoaded: null,
      loadedDate: '',
      currerncy: this.selectedCurrency
    };
    this.editIndex = null;
    this.editType = null;
    this.currencyModalOpen = true;
  }

  saveEntry(form: NgForm) {
    if (form.valid) {
      if (this.editIndex !== null && this.editType) {
        this.travelService.updateEntry(this.editIndex, this.entry, this.editType);
      } else {
        this.entry.currerncy = this.selectedCurrency;
        console.log("cureency", this.entry)
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

  calculateAllowance() {




    // const allowance = this.totaldays * 100;

    // this.allowanceAmount = this.travelService.getallowance() * allowance// ✅ Assign the result to the class property

    // this.travelService.setAllowance(this.allowanceAmount);
    this.allowanceAmount = this.travelService.setAllowance(this.totalEnteries);

    return this.allowanceAmount;
  }


  gotoreview() {

    this.travelService.setTravelDates(this.travelStart, this.travelEnd ,this.selectedCurrency);
    const allowance = this.calculateAllowance()
    this.router.navigate(['internationalcal'])

    console.log("cal", this.allowanceAmount)
  }

  backbtn() {
    this.router.navigate([''])
  }
}
