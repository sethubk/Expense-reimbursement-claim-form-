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
  let avg = 0;
  this.cardEntries.forEach(x=>{
   InrRate +=  x['totalLoaded'];
   totalInr += x['totalInr'];

  })

  this.cashEntries.forEach(x=>{
   InrRate +=  x['totalLoaded'];
   totalInr += x['inrRate'];

  })
  avg = totalInr/InrRate

  return avg ;
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

  setAllowance(amount: number) : number {
    this.allowanceAmount = amount;
    return this.allowanceAmount;
  }

  getAllowance(): number {
    return this.allowanceAmount;
  }


clearCardEntries(): void {
  this.cardEntries = [];
  this.cashEntries=[];
   this.travelStart = '';
    this.travelEnd = '';
    this.allowanceAmount=0
    this.entries=[];
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


