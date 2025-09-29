

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { PersonaldataService } from '../../services/personaldata.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { PersonalDataService } from '../../services/personal-data.service';

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
  isEdit:boolean=false;
  formData: any = {
    date: '',
    supportingNo: '',
    particulars: '',
    paymentMode: 'Cash',
    amount: null,
    remarks: '',
    screenshot: ''
  };

  //expenseForm: FormGroup;

  entries: any[] = [];
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
      if (this.editIndex != null &&this.isEdit) {

        // Update existing entry
        this.entries[this.editIndex] = this.formData;
        this.editIndex = null;
        this.isEdit=false

      }
else{
  this.entries.push({ ...this.formData });
      
     
    }
     
      this.formopen = false
}
this.Service.setentries(this.entries)
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
    const of=confirm("are you sure")
    if(of){
this.entries.splice(index, 1)
    }
    
  }
  formopen: boolean = false;
  openmodel() {
    debugger
    this.formopen = true;
    this.isEdit=false;
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

  Editentry( entry: any,index: number) {
    debugger
    this.formData = ({ ...entry })
    this.editIndex = index;
    this.formopen = true
    this.isEdit=true;
   console.log("forms",this.formData);
    

  }
  gotoreview(){
    this.router.navigate(['expensereview'])
  }
}
