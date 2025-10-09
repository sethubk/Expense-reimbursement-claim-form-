import { Routes } from '@angular/router';
import { ClaimformComponent } from './Components/claimform/claimform.component';
import { ExpenseComponent } from './Components/expense/expense.component';
import { ExpensereviewComponent } from './Components/expensereview/expensereview.component';
import { InternationalComponent } from './Components/international page/international/international.component';
import { InternationalreviewComponent } from './Components/international page/internationalreview/internationalreview.component';
import { InternationalCalculationComponent } from './Components/international page/international-calculation/international-calculation.component';
import { DomesticComponent } from './Components/Domestic/domestic/domestic.component';
import { downloadIconName } from '@cds/core/icon';
import { DomesticExpenseComponent } from './Components/Domestic/domestic-expense/domestic-expense.component';
import { DomesticreviewComponent } from './Components/Domestic/domesticreview/domesticreview.component';

export const routes: Routes = [
    {path:'',component:ClaimformComponent},
    {path:'expense',component:ExpenseComponent},
    {path:'expensereview',component:ExpensereviewComponent},
{path:'international',component:InternationalComponent    },
{path:'internationalreview',component:InternationalreviewComponent},
{path:'internationalcal',component:InternationalCalculationComponent},
{path:'domestic',component:DomesticComponent},
{path:'domesticexpense',component:DomesticExpenseComponent},
{path:'domesticreview',component:DomesticreviewComponent}
    
];
