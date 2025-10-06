import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { TravelEntryService } from '../../../services/travel-entry.service';

@Component({
  selector: 'app-international',
  standalone: true,
  imports: [CommonModule,ClarityModule,FormsModule],
  templateUrl: './international.component.html',
  styleUrl: './international.component.css'
})
export class InternationalComponent {

selectedCurrency: string = '';
  currencyModalOpen: boolean = false;

  entry: any = {
    type: 'Card',
    inrRate: null,
    totalLoaded: null,
    loadedDate: ''
  };

  editIndex: number | null = null;
  editType: 'Card' | 'Cash' | null = null;

  constructor(private travelService:TravelEntryService) {}

  ngOnInit() {}

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
      loadedDate: ''
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

calculateDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return parseFloat(diffDays.toFixed(2));
}
}
