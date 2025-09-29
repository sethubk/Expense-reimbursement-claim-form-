import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { PersonalDataService } from '../../services/personal-data.service';


export interface Expense {
  type: 'International' | 'Domestic' | '' | string;
  createdDate?: Date | null;
  purposePlace?: string;
  amount?: number | null;
  status: 'In progress' | 'Approved' | 'Rejected' | string;
  expense?: string;
}


@Component({
  selector: 'app-claimform',
  standalone: true,
  imports: [ClarityModule,CommonModule,FormsModule],
  templateUrl: './claimform.component.html',
  styleUrl: './claimform.component.css'
})
export class ClaimformComponent {
  
showPersonalModal = false;

personl:any={
today:  '',
  username:  '',
  employeeCode:  '',
  purposePlace:  '',
  companyPlant : '',
  costCenter:  '',
  vendorCode:  '',
  
}
  
ngOnInit() {
    const now = new Date();
    this.personl.today = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }


constructor(private router:Router,private service:PersonalDataService){}
selectedCategory: string | null = null;

goToPersonalDetails(category: string){
  // localStorage.setItem('selectedCategory', category);
  // this.router.navigate(['/personal'])
  
this.selectedCategory = category;
    this.showPersonalModal = true;

}

onPersonalNext(form:NgForm) {
  //store the dates in 
    if (form.valid) {
this.service.setDetails({
      employeeCode: this.personl.employeeCode,
      purposePlace: this.personl.purposePlace,
      companyPlant: this.personl.companyPlant,
      costCenter: this.personl.costCenter,
      vendorCode: this.personl.vendorCode,
      username: this.personl.username
})
  this.showPersonalModal = false;
  if(this.selectedCategory === 'Expense') {
    this.router.navigate(['/expense'])
  } 
   if(this.selectedCategory === 'InternationalTravels') {
    this.router.navigate(['/international'])}
     if(this.selectedCategory === 'DomesticTravels') {
    this.router.navigate(['/domestic'])}


}

}
//displayedColumns: string[] = ['type', 'createdDate', 'purposePlace', 'amount', 'status', 'expense'];

dataSource = [
  {
    type: 'Travel',
    createdDate: '2025-09-25',
    purposePlace: 'Client Visit - Chennai',
    amount: 1500,
    status: 'Approved',
    expense: 'Taxi'
  },]
}