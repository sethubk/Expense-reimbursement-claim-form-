import { Routes } from '@angular/router';
import { ClaimformComponent } from './Components/claimform/claimform.component';
import { ExpenseComponent } from './Components/expense/expense.component';

export const routes: Routes = [
    {path:'',component:ClaimformComponent},
    {path:'expense',component:ExpenseComponent},
    
];
