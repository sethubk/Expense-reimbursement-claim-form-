export interface FormDataModel {
  date: string;
  supportingNo: string;
  particulars: string;
  paymentMode: 'Cash' | 'Card' | 'Online' | string;
  amount: number | null;
  remarks: string;
  screenshot: string;
   preview?: string;
   fileName?:string
}

export interface EntryModel {
  type: 'Card' | 'Cash' | 'Online' | string;
  inrRate: number | null;
  totalLoaded: number | null;
  loadedDate: string;
  currerncy: string;
}