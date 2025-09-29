import { Routes } from '@angular/router';
import { ClaimformComponent } from './Components/claimform/claimform.component';
import { ExpenseComponent } from './Components/expense/expense.component';
import { ExpensereviewComponent } from './Components/expensereview/expensereview.component';

export const routes: Routes = [
    {path:'',component:ClaimformComponent},
    {path:'expense',component:ExpenseComponent},
    {path:'expensereview',component:ExpensereviewComponent}
    
];
