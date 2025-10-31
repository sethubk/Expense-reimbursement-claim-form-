import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TravelEntryService {
  private cardEntries: any[] = [];
  private cashEntries: any[] = [];
private entries:any=[];
  getCardEntries() {
    return this.cardEntries;
  }

  getCashEntries() {
    return this.cashEntries;
  }

getallowance() : number{
  let InrRate = 0;
  let totalInr = 0;
  let allowance = 0;
  this.cardEntries.forEach(x=>{
   InrRate +=  x['inrRate'];
   totalInr += x['totalInr'];

  })

  this.cashEntries.forEach(x=>{
   InrRate +=  x['inrRate'];
   totalInr += x['inrRate'];

  })
  allowance = totalInr/InrRate

  return allowance ;
}

  addEntry(entry: any) {
    const totalInr = entry.inrRate * entry.totalLoaded;
    const newEntry = { ...entry, totalInr };

    if (entry.type === 'Card') {
      this.cardEntries.push(newEntry);
    } else {
      this.cashEntries.push(newEntry);
    }
  }

  updateEntry(index: number, entry: any, type: 'Card' | 'Cash') {
    const totalInr = entry.inrRate * entry.totalLoaded;
    const updatedEntry = { ...entry, totalInr };

    if (type === 'Card') {
      this.cardEntries[index] = updatedEntry;
    } else {
      this.cashEntries[index] = updatedEntry;
    }
  }

  deleteEntry(index: number, type: 'Card' | 'Cash') {
    if (type === 'Card') {
      this.cardEntries.splice(index, 1);
    } else {
      this.cashEntries.splice(index, 1);
    }
  }

  setentries(entries:any){
this.entries=entries
}
getentries(){
  return this.entries
}

private allowanceAmount: number = 0;

  setAllowance(amount: number): void {
    this.allowanceAmount = amount;
  }

  getAllowance(): number {
    return this.allowanceAmount;
  }


clearCardEntries(): void {
  this.cardEntries = [];
  this.cashEntries=[];
   this.travelStart = '';
    this.travelEnd = '';
}

  private travelStart: string = '';
  private travelEnd: string = '';

  setTravelDates(start: string, end: string) {
    this.travelStart = start;
    this.travelEnd = end;
  }


  getTravelStart(): string {
    return this.travelStart;
  }

  getTravelEnd(): string {
    return this.travelEnd;
  }
}


