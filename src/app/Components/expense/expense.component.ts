

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { PersonaldataService } from '../../services/personaldata.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { PersonalDataService } from '../../services/personal-data.service';
import { FormDataModel } from '../../Models/formsData';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, ClarityModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit {
  username: string = '';
  editIndex: number | null = null;
  isEdit: boolean = false;
  formopen: boolean = true;
  personal_open:boolean=false;
  formData:FormDataModel = {
    date: '',
    supportingNo: '',
    particulars: '',
    paymentMode: 'Cash',
    amount: null,
    remarks: '',
    screenshot: ''
  };
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
  //expenseForm: FormGroup;
  maxDate: string = '';

  entries: FormDataModel[] = [];
  constructor(private router: Router, private Service: PersonalDataService, private fb: FormBuilder) {
    //  this.expenseForm = this.fb.group({
    //     date: ['', Validators.required],
    //     supportingNo: ['', Validators.required],
    //     particulars: ['', Validators.required],
    //     paymentMode: ['', Validators.required],
    //     amount: ['', [Validators.required, Validators.min(1)]],
    //     remarks: ['']
    //   });
  }
  personalData: any;
  ngOnInit() {
const today = new Date();
  this.maxDate = today.toISOString().split('T')[0]; // Format: yyyy-MM-dd
 

    this.personalData = this.Service.getDetails();

  }

  // onFileChange(event: any) {
  //     const file = event.target.files[0];
  //     if (file) {
  //       this.formData.screenshot = file.name; // You can store base64 if needed
  //     }
  //   }

  addEntry(form: NgForm) {
    debugger

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
  this.Service.setentries(this.entries);
}
    // this.Service.setentries({
    //         date: this.formData.Date,
    //         supportingNo: this.formData.supportingNo,
    //         particulars: this.formData.particulars,
    //         paymentMode: 'Cash',
    //         amount: this.formData.amount,
    //         remarks: this.formData.remarks,
    // })

  }
  removeentry(index: number) {
    const of = confirm("are you sure")
    if (of) {
      this.entries.splice(index, 1)
    }

  }
  
  openmodel() {
    debugger
    this.formopen = true;
    this.isEdit = false;
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

  Editentry(entry: any, index: number) {
    debugger
    this.formData = ({ ...entry })
    this.editIndex = index;
    this.formopen = true
    this.isEdit = true;
    console.log("forms", this.formData);


  }
  gotoreview() {
    this.router.navigate(['expensereview'])
  }
}
