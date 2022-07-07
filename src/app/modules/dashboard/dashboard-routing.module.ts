import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EmployelistComponent } from './employelist/employelist.component';

const routes: Routes = [
  {
    path: 'dashboard/:id',
    pathMatch: 'full',
    component: EmployelistComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
